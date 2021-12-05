import { html, render } from 'https://cdn.skypack.dev/lit-html';

const Preview = (item, el) => {
  render(html`
    <profile-card
      title="${item.name}"
      date-start="${item.date_start}"
      date-end="${item.date_end}"
      station-name="${item.station_name}"
      station-line="${item.station_line}"
      description="${item.description}"
      category="${item.category ? item.category.join(',') : ''}"
      minimize="true"
    >
    </profile-card>
  `, el);
  return el.querySelector('profile-card');
};

export default Preview;