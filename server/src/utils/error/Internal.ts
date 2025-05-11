import GeneralError, { Error } from "./GeneralError";

class Internal extends GeneralError {
  constructor(error: Error) {
    super(error, 500);
  }
}

export default Internal;
