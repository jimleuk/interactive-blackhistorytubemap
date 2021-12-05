import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';

export default class StationBadgeElement extends LitElement {
  static properties = {
    line: { attribute: true },
    name: { attribute: true }
  }

  static styles = css`
    div {
      width: 42px;
      height: 42px;
      border-width: 10px;
      border-style: solid;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    span {
      background-color: var(--color-brand-1);
      color: var(--color-white);
      padding-top: 3px;
      padding-bottom: 3px;
      white-space: nowrap;
      text-align: center;
      font-size: var(--size-1);
    }
  `

  render() {
    return html`
      <link rel="stylesheet" href="./styles.css" />
      <div class="line-${this.line} mr-2">
        <span class="pl-1 pr-1">${this.name}</span>
      </div>
    `
  }
}