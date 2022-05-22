import { writable } from 'svelte/store';

export type TabbedPanelsStore = { [k: string]: number };

export const tabbedPanelsStore = writable<TabbedPanelsStore>({});

export const registerPanels = (data: TabbedPanelsStore) => {
  tabbedPanelsStore.set(data);
};

export const togglePanel = (name?: string) => {
  tabbedPanelsStore.update((previous) => {
    const store = { ...previous };
    Object.keys(store).forEach((key) => {
      if (name && key === name) {
        store[key] = previous[key] ? 0 : 1;
      } else {
        store[key] = 0;
      }
    });
    return store;
  });
};

export const closeAllPanels = () => {
  togglePanel();
};

export const charities = [
  {
    org: 'Black Cultural Archives',
    station: 'Brixton',
    url: 'https://blackculturalarchives.org/support'
  },
  {
    org: 'Black Pride UK',
    station: 'Kingsbury',
    url: 'https://www.ukblackpride.org.uk/donate'
  },
  {
    org: 'Exist Loudly',
    station: 'Queensbury',
    url: 'https://www.gofundme.com/f/exist-loudly-fund-to-support-queer-black-yp'
  },
  {
    org: 'Black Plaque Project',
    station: 'Burnt Oak',
    url: 'https://blackplaqueproject.com/our-mission'
  },
  {
    org: 'The Africa Centre',
    station: 'Borough',
    url: 'https://www.africacentre.org.uk/donate'
  },
  {
    org: 'Black Trans Alliance',
    station: "St. John's Wood",
    url: 'https://www.blacktransalliance.org/Appeal/donate'
  },
  {
    org: 'Black Out UK',
    station: 'Southwark',
    url: 'https://blkoutuk.com/about/support-blackout-uk'
  },
  {
    org: 'Stop Hate UK',
    url: 'https://www.stophateuk.org'
  }
].sort((a, b) => a.org.toLowerCase().localeCompare(b.org.toLowerCase()));
