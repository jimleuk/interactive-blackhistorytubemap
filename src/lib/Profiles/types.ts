export type Profile = {
  id: number;
  type: 'person' | 'organisation' | 'event';
  name: string | null;
  description: string | null;
  dateStart: string | null;
  dateEnd: string | null;
  imageUrl: string | null;
  imageAttribution: string | null;
  infoUrl: string | null;
  stationCode: string | null;
  stationName: string | null;
  stationLineCode: number | null;
  stationLineName: string | null;
};
