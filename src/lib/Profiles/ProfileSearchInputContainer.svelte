<script lang="ts">
  import { writable, derived } from 'svelte/store';
  import supabase from '$lib/persistence/supabase';
  import Fuse from 'fuse.js';
  import ProfileSearchInput from './components/ProfileSearchInput.svelte';

  export let onProfileSearch;

  let fuse;
  const initFuseInstance = async () => {
    const data = await new Promise((resolve) => {
      supabase
        .from('profile-bca')
        .select('id, name, stationName')
        .then((response) => {
          resolve(response.body);
        });
    });
    fuse = new Fuse(data, {
      keys: [
        { name: 'name', weight: 0.8 },
        { name: 'stationName', weight: 0.2 }
      ]
    });
  };

  const searchInputStore = writable<string>(null);

  const onSearchInputChange = (value: string) => {
    searchInputStore.update(() => value);
  };

  const searchSuggestions = derived(searchInputStore, async ($store, set) => {
    if ($store && !fuse) await initFuseInstance();
    const suggestions = $store ? fuse?.search($store).slice(0, 5) : [];
    set(suggestions.map((suggestion) => suggestion.item));
  });

  const onSuggestionsSubmit = (profile) => {
    searchInputStore.update(() => null);
    onProfileSearch?.(profile);
  };
</script>

<ProfileSearchInput
  onChange={onSearchInputChange}
  suggestions={$searchSuggestions}
  {onSuggestionsSubmit}
/>
