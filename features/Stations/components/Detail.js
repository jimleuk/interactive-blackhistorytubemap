import { html, render } from 'https://cdn.skypack.dev/lit-html';

const Detail = ({
  name,
  description,
  date_start,
  date_end,
  station,
  image_url,
  image_attribution,
  info_url,
  category,
} = {}, el) => {
  const suggestAnEditURL = encodeURI([
    'https://github.com/jimleuk/interactive-blackhistorytubemap/issues/new?',
    `labels=${station.code}`,
    `&title=Suggest an edit for ${name} / ${station.name}`
  ].join(''));

  const content = html`
    <div class="profile">
      <div class="profile-header p-2">
        <div class="profile-header-left">
          <h2 class="profile-title mt-0 mb-1">${name}</h2>
          <div class="profile-meta">
            <div class="profile-meta-item">
              ${date_start ? `${date_start}${date_end ? `- ${date_end}` : ''}` : 'Unknown Dates'}
            </div>
          </div>
        </div>
        <div class="profile-header-right">
          <div>
            <div class="wx-station-badge line-${station.line} mr-2">
              <span class="pl-1 pr-1">${station.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-content pt-2 pb-2">
        <div class="profile-content-item pl-2 pr-2">
          <p class="profile-content-description mb-0 mt-0">${description}</p>
        </div>
        <div class="profile-content-item pt-2 pb-2">
          <div class="profile-content-image">
            ${image_url
             ? (
               html`<a href="${image_url}" target="_blank" rel="noopener noreferrer" title="View full size">
                  <img src="${image_url}" alt="${name}" />
                </a>  
                <div class="profile-content-image-attribution pt-1 pb-1 pl-2 pr-2">
                  ${image_attribution}
                </div>`
              ) : (
                html`<div class="profile-content-image-placeholder">
                  No Image Available
                </div>`
              )}
          </div>
        </div>
        ${info_url ? (
          html`<div class="profile-content-item pl-2 pr-2">
            <h3>References</h3>
            <p>
              <a href="${info_url}" target="_blank" rel="noopener noreferrer" title="Link to external site">${info_url}</a>
            </p>
          </div>`) : null}
        ${category.length ? (
          html`<div class="profile-content-item pl-2 pr-2">
            <h3>Categories</h3>
            ${category.map(cat => html`<a href="./#filter/${cat}" class="category-tag pl-1 pr-1 mr-1">${cat}</a>`)}
          </div>`) : null}
        <div class="profile-content-item pt-2 pl-2 pr-2">
          <p>
            <a href="${suggestAnEditURL}">
              Suggest an edit
            </a>
          </p>
        </div>
      </div>
    </div>
    `;
  if (!el) return content;
  render(content, el);
}

export default Detail;