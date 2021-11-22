export class StationNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'StationNotFoundError';
  }
}