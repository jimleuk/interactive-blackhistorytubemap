import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';

export default class ProfileCardElement extends LitElement {
  constructor() {
    super();
  }

  static properties = {
    minimize: { attribute: true },
    title: { attribute: true },
    'date-start': { attribute: true },
    'date-end': { attribute: true },
    'station-name': { attribute: true },
    'station-line': { attribute: true },
    description: { attribute: true },
    'image-url': { attribute: true },
    'image-attribution': { attribute: true },
    'info-url': { attribute: true },
    category: { attribute: true },
    'issue-url': { attribute: true },
  }

  static styles = css`
    :host {
      display: block;
    }
    .root {
      border-top: 1px solid var(--color-gray-2);
    }
    .header {
      display: flex;
    }
    .header-left {
      flex-grow: 1;
    }
    .title {
      font-size: var(--size-2);
    }
    .meta {
      font-size: var(--size-1);
      display: flex;
    }
    .content-item h3 {
      font-size: var(--size-2);
      font-weight: var(--weight-2);
    }
    .content-item a {
      word-wrap: break-word;
    }
    .content-description {
      font-size: var(--size-4);
    }
    .content-image {
      position: relative;
      background-color: var(--color-gray-1);
      border-top: 1px solid var(--color-gray-2);
      border-bottom: 1px solid var(--color-gray-2);
      min-height: 300px;
    }
    .content-image img {
      width: 100%;
      max-height: 360px;
      object-fit: contain;
    }
    .content-image-attribution {
      color: var(--color-gray-3);
      font-size: var(--size-1);
      text-align: right;
    }
    .content-image-placeholder {
      position: absolute;
      width: 100%;
      height:100%;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--size-4);
      color: var(--color-gray-3);
    }
    @media screen and (min-width: 480px) {
      .title {
        font-size: var(--size-3);
      }
      .meta {
        font-size: var(--size-2);
      }
    }
  `

  render() {
    const category = this.category ? this.category.split(',') : null;

    if (this.minimize) {
      return html`
        <link rel="stylesheet" href="./styles.css" />
        <div class="root">
          <div class="header p-2">
            <div class="header-left">
              <h2 class="title mt-0 mb-1">${this.title}</h2>
              <div class="meta mb-1">
                <div class="meta-item">
                ${this['date-start']
                  ? `${this['date-start']} ${this['date-end'] ? `- ${this['date-end']}` : ''}`
                  : 'Unknown Dates'
                }
                </div>
              </div>
              ${category && category.length ? (
                html`<div class="meta">
                  <div class="meta-item">
                    ${category.map(cat => html`<a href="./#filter/${cat}" class="category-tag pl-1 pr-1 mr-1">${cat}</a>`)}
                  </div>
                </div>`
              ): null}
            </div>
            <div class="header-right">
              <station-badge
                line="${this['station-line']}"
                name="${this['station-name']}"
              ></station-badge>
            </div>
          </div>
        </div>
      `;
    }

    return html`
      <link rel="stylesheet" href="./styles.css" />
      <div class="root">
        <div class="header p-2">
          <div class="header-left">
            <h2 class="title mt-0 mb-1">${this.title}</h2>
            <div class="meta">
              <div class="meta-item">
                ${this['date-start']
                  ? `${this['date-start']} ${this['date-end'] ? `- ${this['date-end']}` : ''}`
                  : 'Unknown Dates'
                }
              </div>
            </div>
          </div>
          <div class="header-right">
            <div>
              <station-badge
                line="${this['station-line']}"
                name="${this['station-name']}"
              ></station-badge>
            </div>
          </div>
        </div>
        <div class="content pt-2 pb-2">
          <div class="content-item pl-2 pr-2">
            <p class="content-description mb-0 mt-0">${this.description}</p>
          </div>
          <div class="content-item pt-2 pb-2">
            <div class="content-image">
              ${this['image-url']
              ? (
                html`<a href="${this['image-url']}" target="_blank" rel="noopener noreferrer" title="View full size">
                    <img src="${this['image-url']}" alt="${this.name}" />
                  </a>  
                  <div class="content-image-attribution pt-1 pb-1 pl-2 pr-2">
                    ${this['image-attribution']}
                  </div>`
                ) : (
                  html`<div class="content-image-placeholder">
                    No Image Available
                  </div>`
                )}
            </div>
          </div>
          ${this['info-url'] ? (
            html`<div class="content-item pl-2 pr-2">
              <h3>References</h3>
              <p>
                <a href="${this['info-url']}" target="_blank" rel="noopener noreferrer" title="Link to external site">
                  ${this['info-url']}
                </a>
              </p>
            </div>`) : null}
          ${category && category.length ? (
            html`<div class="content-item pl-2 pr-2">
              <h3>Categories</h3>
              ${category.map(cat => html`<a href="./#filter/${cat}" class="category-tag pl-1 pr-1 mr-1">${cat}</a>`)}
            </div>`) : null}
          <div class="content-item pt-2 pl-2 pr-2">
            <p>
              <a href="${this['issue-url']}">
                Suggest an edit
              </a>
            </p>
          </div>
        </div>
      </div>
      `;
  }
}