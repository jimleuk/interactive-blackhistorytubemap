import mustache from 'https://cdn.skypack.dev/mustache';

const template = `
<div class="profile">
  <div class="profile-header p-2">
    <div class="profile-header-left">
      <h2 class="profile-title mt-0 mb-1">{{name}}</h2>
      <div class="profile-meta mb-1">
        <div class="profile-meta-item">
          {{#date_start}}
          {{date_start}}{{#date_end}} - {{date_end}}{{/date_end}}
          {{/date_start}}
          {{^date_start}}Unknown Dates{{/date_start}}
        </div>
      </div>
      <div class="profile-meta">
        <div class="profile-meta-item">
        {{#category}}<span>#{{.}}</span> {{/category}}
        </div>
      </div>
    </div>
    <div class="profile-header-right">
      <div class="wx-station-badge line-{{station.line}} mr-2">
        <span class="pl-1 pr-1">{{station.name}}</span>
      </div>
    </div>
  </div>
</div>
`;

const Thumbnail = (payload) => mustache.render(template, payload);
export default Thumbnail;