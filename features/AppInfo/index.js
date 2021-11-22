import { fromEvent } from 'https://cdn.skypack.dev/rxjs';
import { ofType, dispatch } from '../../actions/index.js';

const ACTIONS = {
  OPEN_INFO: 'OPEN_INFO',
  CLOSE_INFO: 'CLOSE_INFO',
}

export const AppInfo = ({ el, openButton, closeButton }) => {
  ofType([ACTIONS.OPEN_INFO, ACTIONS.CLOSE_INFO])
    .subscribe(event => {
      if (event.error) return;
      el.classList.toggle('in-active', event.type !== ACTIONS.OPEN_INFO);

      const isActive = !el.classList.contains('in-active');
      if (event.meta.isMobileViewport ) {
        window.scrollTo(0,isActive ? window.innerHeight : 0);
      }
    });

  fromEvent(openButton, 'click')
    .subscribe(() => dispatch({ type: ACTIONS.OPEN_INFO }));

  fromEvent(closeButton, 'click')
    .subscribe(() => dispatch({ type: ACTIONS.CLOSE_INFO }));
}