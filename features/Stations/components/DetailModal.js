import WinBox from "https://unpkg.com/winbox@0.2.1/src/js/winbox.js";
import { stationsKeyByCode } from '../../../datasets/index.js'
import { dispatch } from '../../../actions/index.js';
import { isMobileViewport, getBaseUrl } from '../../utils/index.js';
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
  if (!currentInstance) {
    currentInstance = new WinBox({
      ...(!isMobileViewport() ? defaultConfig : mobileConfig),
      onclose: () => {
        currentInstance = null;
        window.location.href = `${getBaseUrl()}#`;
        dispatch({ type: ACTIONS.CLOSE_STATION, payload: station, error: null });
      }
    });
  }
  Detail({ ...station, station: stationsKeyByCode[station.station_code] }, currentInstance.body);
  currentInstance.body.scrollTo(1, 1);
  return currentInstance;
}

export default DetailModal;