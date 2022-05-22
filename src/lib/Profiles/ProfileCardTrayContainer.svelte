<script>
  import * as store from './store/index.ts';
  import ProfileCardTray from './components/ProfileCardTray.svelte';

  let data = [];
  store.currentProfileStore.subscribe((profile) => {
    if (!profile.error && profile.data) {
      const lastEntry = data[data.length - 1];
      const isRepeatOfLastEntry = lastEntry && lastEntry.id === profile.data.id;
      if (isRepeatOfLastEntry) return;
      data.push(profile.data);
      data = data;
    }
  });
</script>

<ProfileCardTray {data} />
