import keyBy from 'https://cdn.skypack.dev/lodash.keyby';
import { csvParse } from "https://cdn.skypack.dev/d3-dsv@3";
import { getBaseUrl } from '../features/utils/index.js';
import { dispatch } from '../actions/index.js'

export const ACTIONS = {
  DATA_READY: 'DATA_READY'
}

const BASE_URL = `${getBaseUrl()}/datasets`;

const URL_PEOPLE = `${BASE_URL}/people.json`;
const URL_LABEL_PEOPLE = `${BASE_URL}/labels-people.csv`;
const URL_LABEL_STATIONS = `${BASE_URL}/labels-stations.csv`;
const URL_STATIONS = `${BASE_URL}/stations.csv`;
const URL_LINES = `${BASE_URL}/lines.csv`;

export const fetchCSV = async (url) =>  {
  const response = await fetch(url);
  const body = await response.text()
  return csvParse(body);
}

const store = {};
export let peopleKeyByCode = {};
export let stationsKeyByCode = {}

const fetchData = async () => {
  const data = await Promise.all([
    fetch(URL_PEOPLE).then(async res => (await res.json()).data),
    fetchCSV(URL_LABEL_PEOPLE),
    fetchCSV(URL_LABEL_STATIONS),
    fetchCSV(URL_STATIONS),
    fetchCSV(URL_LINES),
  ]);

  store.people = data[0];
  store.labelsPeople = data[1];
  store.labelsStation = data[2];
  store.stations = data[3];
  store.lines = data[4];

  peopleKeyByCode = keyBy(store.people, 'station_code');
  stationsKeyByCode = keyBy(store.stations, 'code');
  dispatch({ type: ACTIONS.DATA_READY });
}

fetchData();

export const getData = (key) => store[key] || null;