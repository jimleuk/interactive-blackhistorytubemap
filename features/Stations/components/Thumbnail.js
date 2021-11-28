import { html, render } from 'https://cdn.skypack.dev/lit-html';

const Thumbnail = ({
  name,
  date_start,
  date_end,
  category,
  station,
} = {}, el) => {
  const content = html`
    <div class="profile">
      <div class="profile-header p-2">
        <div class="profile-header-left">
          <h2 class="profile-title mt-0 mb-1">${name}</h2>
          <div class="profile-meta mb-1">
            <div class="profile-meta-item">
            ${date_start ? `${date_start}${date_end ? `- ${date_end}` : ''}` : 'Unknown Dates'}
            </div>
          </div>
          <div class="profile-meta">
            <div class="profile-meta-item">
              ${category.map(cat => html`<a href="./#filter/${cat}" class="category-tag pl-1 pr-1 mr-1">${cat}</a>`)}
            </div>
          </div>
        </div>
        <div class="profile-header-right">
          <div class="wx-station-badge line-${station.line} mr-2">
            <span class="pl-1 pr-1">${station.name}</span>
          </div>
        </div>
      </div>
    </div>
  `;
  if (!el) return content;
  render(content, el);
};

export default Thumbnail;