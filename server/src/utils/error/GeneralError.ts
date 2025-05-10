export enum ErrorTypes {
  Create = "CreateException",
  Update = "UpdateException",
  Delete = "DeleteException",
  NotFound = "NotFound",
  Unauthorized = "Unauthorized",
  Internal = "Internal",
  BadRequest = "BadRequest",
}

export interface Error {
  type: ErrorTypes;
  title: string;
  detail: string;
}

class GeneralError {
  public readonly error: Error;
  public readonly statusCode: number;

  constructor(error: Error, statusCode: number) {
    this.error = error;
    this.statusCode = statusCode;
  }
}

export default GeneralError;
