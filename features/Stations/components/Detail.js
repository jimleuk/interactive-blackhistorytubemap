import mustache from 'https://cdn.skypack.dev/mustache';

const template = `
<div class="profile">
  <div class="profile-header p-2">
    <div class="profile-header-left">
      <h2 class="profile-title mt-0 mb-1">{{name}}</h2>
      <div class="profile-meta">
        <div class="profile-meta-item">
          {{#date_start}}
          {{date_start}}{{#date_end}} - {{date_end}}{{/date_end}}
          {{/date_start}}
          {{^date_start}}Unknown Dates{{/date_start}}
        </div>
      </div>
    </div>
    <div class="profile-header-right">
      <div class="wx-station-badge line-{{station.line}} mr-2">
        <span class="pl-1 pr-1">{{station.name}}</span>
      </div>
    </div>
  </div>
  <div class="profile-content pt-2 pb-2">
    <div class="profile-content-item pl-2 pr-2">
      <p class="profile-content-description mb-0 mt-0">{{description}}</p>
    </div>
    
    <div class="profile-content-item pt-2 pb-2">
      <div class="profile-content-image">
        {{#image_url}}
        <a href="{{image_url}}" target="_blank" rel="noopener noreferrer" title="View full size">
          <img src="{{image_url}}" alt="{{name}}" />
        </a>
        <div class="profile-content-image-attribution pt-1 pb-1 pl-2 pr-2">
          {{image_attribution}}
        </div>
        {{/image_url}}
        {{^image_url}}
          <div class="profile-content-image-placeholder">
            No Image Available
          </div>
        {{/image_url}}
      </div>
    </div>
    {{#info_url}}
    <div class="profile-content-item pl-2 pr-2">
      <h3>References</h3>
      <p><a href="{{info_url}}" target="_blank" rel="noopener noreferrer" title="Link to external site">{{info_url}}</a><p>
    </div>
    {{/info_url}}
    {{#category.length}}
    <div class="profile-content-item pl-2 pr-2">
      <h3>Categories</h3>
      {{#category}}
      <a href="./#filter/{{.}}" class="category-tag pl-1 pr-1 mr-1">{{.}}</a>
      {{/category}}
    </div>
    {{/category.length}}
    <div class="profile-content-item pt-2 pl-2 pr-2">
      <p>

        <a href="{{suggestAnEditURL}}">
          Suggest an edit
        </a>
      </p>
    </div>
  </div>
</div>
`;

const Detail = (payload) => {
  const suggestAnEditURL = encodeURI(`https://github.com/jimleuk/interactive-blackhistorytubemap/issues/new?labels=${payload.station.code}&title=Suggest an edit for ${payload.name} / ${payload.station.name}`);
  return mustache.render(template, {
    ...payload,
    suggestAnEditURL,
  });
}

export default Detail;