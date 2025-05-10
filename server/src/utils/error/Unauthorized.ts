import GeneralError, { Error } from "./GeneralError";

class Unauthorized extends GeneralError {
  constructor(error: Error | Error[]) {
    super(error, 401);
  }
}

export default Unauthorized;