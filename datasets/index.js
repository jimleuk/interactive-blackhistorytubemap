import keyBy from 'https://cdn.skypack.dev/lodash.keyby';
import { csvParse } from "https://cdn.skypack.dev/d3-dsv@3";

const BASE_URL = `${window.location.origin}/datasets`;

const URL_PEOPLE = `${BASE_URL}/people.json`;
const URL_LABEL_PEOPLE = `${BASE_URL}/labels-people.csv`;
const URL_LABEL_STATIONS = `${BASE_URL}/labels-stations.csv`;
const URL_STATIONS = `${BASE_URL}/stations.csv`;
const URL_LINES = `${BASE_URL}/lines.csv`;
const URL_CONNECTIONS = `${BASE_URL}/connections.csv`;

export const fetchCSV = async (url) =>  {
  const response = await fetch(url);
  const body = await response.text()
  return csvParse(body);
}

export const [
  people,
  labelsPeople,
  labelsStation,
  stations,
  lines,
] = await Promise.all([
  fetch(URL_PEOPLE).then(async res => (await res.json()).data),
  fetchCSV(URL_LABEL_PEOPLE),
  fetchCSV(URL_LABEL_STATIONS),
  fetchCSV(URL_STATIONS),
  fetchCSV(URL_LINES),
]);

export const peopleKeyByCode = keyBy(people, 'station_code');
export const stationsKeyByCode = keyBy(stations, 'code');