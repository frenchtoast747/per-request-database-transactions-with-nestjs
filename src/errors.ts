export class BaseError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InvariantViolated extends BaseError {}
