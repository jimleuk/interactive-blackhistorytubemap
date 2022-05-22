import { writable, derived } from 'svelte/store';
import supabase from '$lib/persistence/supabase';
import type { Profile } from '../types';

// profile tray ================================================================

let _counter = 0;
const uniqId = () => {
  _counter = _counter + 1;
  return _counter;
};

type TopicPayload = {
  _id: number;
  idRef?: number;
};

type Topic = {
  payload: TopicPayload | null;
  action: 'add' | 'remove';
};

const topicStore = writable<Topic[]>([]);

const topicAddAction = (store: TopicPayload[], payload: TopicPayload) => {
  return [...store, payload];
};

const topicRemoveAction = (store: TopicPayload[], payload: TopicPayload) => {
  return store.filter((item) => item._id !== payload._id);
};

const topicReducer = (store, topic: Topic) => {
  switch (topic.action) {
    case 'add':
      return topicAddAction(store, topic.payload);
    case 'remove':
      return topicRemoveAction(store, topic.payload);
    default: {
      console.error('Profiles/store::topicReducer - unknown action');
    }
  }
  return store;
};

export const topicStreamStore = derived<typeof topicStore, TopicPayload[]>(topicStore, (topics) => {
  return topics.reduce(topicReducer, []);
});

export const addTopic = (data: Omit<TopicPayload, '_id'>) => {
  topicStore.update((topics) => {
    return [...topics, { action: 'add', payload: { _id: uniqId(), ...data } }];
  });
};

export const removeTopic = (payload: TopicPayload) => {
  topicStore.update((topics) => {
    return [...topics, { action: 'remove', payload }];
  });
};

// profiles ====================================================================

const cachedProfiles: Profile[] = [];

interface CurrentProfileStore {
  error: null | string;
  data: Profile;
}

export const currentProfileStore = derived<typeof topicStreamStore, CurrentProfileStore>(
  topicStreamStore,
  (store, set) => {
    const currentId = store[store.length - 1]?.idRef;
    if (!currentId) {
      set({ error: 'Unknown Id', data: null });
      return;
    }

    const cached = cachedProfiles.find((profile) => profile.id === currentId);
    if (cached) {
      set({ error: null, data: cached });
      return;
    }

    supabase
      .from('profile-bca')
      .select('*')
      .eq('id', currentId)
      .then((res) => {
        const found = res.body[0];
        if (res.error || !found)
          throw res.error ?? 'Profiles/store::currentProfileStore - profile not found';
        cachedProfiles.push(found);
        set({ error: res.error?.message ?? null, data: found });
      });
  }
);
