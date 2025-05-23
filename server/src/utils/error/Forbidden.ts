import GeneralError, { Error } from "./GeneralError";

class Forbidden extends GeneralError {
  constructor(error: Error) {
    super(error, 403);
  }
}

export default Forbidden;
