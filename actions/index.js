import { ReplaySubject } from 'https://cdn.skypack.dev/rxjs';
import { filter } from 'https://cdn.skypack.dev/rxjs/operators';
import { isMobileViewport } from '../features/utils/index.js';

const observable = new ReplaySubject(5);

export const ofType = (actionTypes) => {
  const x = observable.pipe(filter(event => [].concat(actionTypes).includes(event.type)))
  if (!x.filter) x.filter = (cb) => x.pipe(filter(cb));
  return x;
}

export const dispatch = (event) => {
  observable.next({
    ...event,
    meta: {
      isMobileViewport: isMobileViewport(),
    }
  });
}