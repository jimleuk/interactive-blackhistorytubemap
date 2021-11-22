import WinBox from "https://unpkg.com/winbox@0.2.1/src/js/winbox.js";
import { stationsKeyByCode } from '../../../datasets/index.js'
import { dispatch } from '../../../actions/index.js';
import { isMobileViewport } from '../../utils/index.js';
import { ACTIONS } from '../index.js';
import Detail from './Detail.js';

const defaultConfig = {
  class: ['no-min', 'no-max', 'no-full', 'no-shadow'],
  x: '65%',
  y: '15%',
  width: '30%',
  height: '80%',
  title: 'Black History Tube Map'
};

const mobileConfig = {
  ...defaultConfig,
  x: 0,
  y: 0,
  width: '100%',
  height: '100%',
};

export let currentInstance = null;

const DetailModal = (station) => {
  const content = Detail({
    ...station,
    station: stationsKeyByCode[station.station_code],
  });

  if (currentInstance) {
    currentInstance.body.innerHTML = content;
    currentInstance.body.scrollTo(1, 1);
    return;
  }

  currentInstance = new WinBox({
    ...(!isMobileViewport() ? defaultConfig : mobileConfig),
    html: content,
    onclose: () => {
      currentInstance = null;
      window.location.href = `${window.location.href}#`;
      dispatch({ type: ACTIONS.CLOSE_STATION, payload: station, error: null });
    }
  });

  return currentInstance;
}

export default DetailModal;