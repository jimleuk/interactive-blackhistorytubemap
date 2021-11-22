export class PageNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PageNotFoundError';
  }
}