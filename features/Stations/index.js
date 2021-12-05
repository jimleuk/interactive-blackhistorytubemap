import { peopleKeyByCode, stationsKeyByCode } from '../../datasets/index.js';
import { ofType, dispatch } from '../../actions/index.js';
import { ACTIONS as ROUTER_ACTIONS } from '../Router/index.js';
import { StationNotFoundError } from './errors.js';

const ROUTE = 'stations';

export const ACTIONS = {
  OPEN_STATION: 'OPEN_STATION',
  CLOSE_STATION: 'CLOSE_STATION',
}

ofType(ROUTER_ACTIONS.NAVIGATE_TO)
  .filter(event => event.payload.page === ROUTE)
  .subscribe(event => {
    const [code] = event.payload.params;
    const item = peopleKeyByCode[code];
    let payload = {};
    if (item) {
      const station = stationsKeyByCode[item.station_code];
      payload = {
        name: item.name,
        date_start: item.date_start,
        date_end: item.date_end,
        station_code: item.code,
        station_name: station.name,
        station_line: station.line,
        description: item.description,
        image_url: item.image_url,
        image_attribution: item.image_attribution,
        info_url: item.info_url,
        category: item.category,
      };
    }
    const error = item ? null : new StationNotFoundError(`Could not find station "${code}"`);
    dispatch({ type: ACTIONS.OPEN_STATION, payload, error });
  });

export default null;