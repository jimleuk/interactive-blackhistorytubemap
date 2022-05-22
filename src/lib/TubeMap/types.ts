export type MapOverlayStation = {
  /** refers to station code */
  code: string;
  /** formatted name which is displayed on the map */
  displayName: string;
  /** a reference id used to link entities to stations */
  idRef?: number;
};

export type MapOverlay = Array<MapOverlayStation>;
