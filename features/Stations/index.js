import { peopleKeyByCode } from '../../datasets/index.js';
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
    const payload = peopleKeyByCode[code];
    const error = payload ? null : new StationNotFoundError(`Could not find station "${code}"`);
    dispatch({ type: ACTIONS.OPEN_STATION, payload, error });
  });

export default null;