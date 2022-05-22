import { writable, derived } from 'svelte/store';
import supabase from '$lib/persistence/supabase';
import type { MapOverlay } from '../types';

export enum mapOverlayRegister {
  default = 'map-default',
  bca = 'map-bca'
}

export const mapOverlayConfigStore = writable<{
  current: mapOverlayRegister;
}>({
  current: mapOverlayRegister.bca
});

interface MapOverlayStore {
  error: null | string;
  data: MapOverlay;
}

const mapOverlayCache: { [k: mapOverlayRegister]: object } = {};

export const mapOverlayStore = derived<typeof mapOverlayConfigStore, MapOverlayStore>(
  mapOverlayConfigStore,
  (store, set) => {
    const current = store.current;
    if (!Object.values(mapOverlayRegister).includes(current)) {
      console.error(
        `Expected one of "${Object.values(mapOverlayRegister).join(', ')}", got "${current}".`
      );
      return;
    }
    if (mapOverlayCache[current]) {
      set({
        error: null,
        data: mapOverlayCache[current]
      });
      return;
    }

    supabase
      .from(current)
      .select('code, displayName, idRef')
      .then((res) => {
        if (!res.error) {
          mapOverlayCache[current] = res.body;
        }
        set({
          error: res.error?.message ?? null,
          data: res.body
        });
      });
  },
  { error: null, data: [] }
);
