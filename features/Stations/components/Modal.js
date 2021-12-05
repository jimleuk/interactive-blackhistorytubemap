import { html, render } from 'https://cdn.skypack.dev/lit';
import WinBox from "https://unpkg.com/winbox@0.2.1/src/js/winbox.js";
import { dispatch } from '../../../actions/index.js';
import { isMobileViewport, getBaseUrl } from '../../utils/index.js';
import { ACTIONS } from '../index.js';

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

const Modal = (item) => {
  if (!currentInstance) {
    currentInstance = new WinBox({
      ...(!isMobileViewport() ? defaultConfig : mobileConfig),
      onclose: () => {
        currentInstance = null;
        window.location.href = `${getBaseUrl()}#`;
        dispatch({ type: ACTIONS.CLOSE_STATION, payload: item, error: null });
      }
    });
  }

  const issueUrl = encodeURI([
    'https://github.com/jimleuk/interactive-blackhistorytubemap/issues/new?',
    `labels=${item.station_code}`,
    `&title=Suggest an edit for ${item.name} / ${item.station_name}`
  ].join(''));

  render(html`
    <profile-card
      title="${item.name}"
      date-start="${item.date_start}"
      date-end="${item.date_end}"
      station-name="${item.station_name}"
      station-line="${item.station_line}"
      description="${item.description}"
      image-url="${item.image_url}"
      image-attribution="${item.image_attribution}"
      info-url="${item.info_url}"
      category="${item.category ? item.category.join(',') : ''}"
      issue-url="${issueUrl}"
    >
    </profile-card>
  `, currentInstance.body);
  currentInstance.body.scrollTo(1, 1);
}

export default Modal;