import isNil from 'https://cdn.skypack.dev/lodash.isnil';
import { fromEvent, asyncScheduler } from 'https://cdn.skypack.dev/rxjs';
import { map, startWith, distinctUntilChanged, observeOn, share } from 'https://cdn.skypack.dev/rxjs/operators';
import { dispatch } from '../../actions/index.js';
import { PageNotFoundError } from './errors.js';

export const ACTIONS = {
  NAVIGATE_TO: 'NAVIGATE_TO',
}

export const ALLOW_LIST = [
  'stations'
];

/**
 * auto listen to window hash changes
 */
export const hashChangeObservable = fromEvent(window, 'hashchange')
  .pipe(
    startWith(window.location.hash),
    map(() => window.location.hash),
    distinctUntilChanged(),
    map(hash => {
      const [page, ...params] = hash.slice(1, hash.length).split('/');
      const event = { type: ACTIONS.NAVIGATE_TO, payload: { page, params }, error: null };

      const isValidPageParams = !isNil(page) && ALLOW_LIST.includes(page);
      if (!isValidPageParams) {
        event.error = new PageNotFoundError(`Expected one of "${ALLOW_LIST.join(',')}", got "${page}"`);
      }
      return event;
    }),
    observeOn(asyncScheduler),
    share()
  )
  .subscribe(event => {
    dispatch(event);
  })


export default null;