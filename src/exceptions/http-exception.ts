export class HttpException extends Error {
    status: number;
    error: unknown;
    constructor(status: number, message: string, error?: unknown) {
      super(message);
      this.status = status;
      this.error = error;
    }
  }

  export const HTTP_RESPONSE_CODE = {
    NOT_FOUND: 404,
    CREATED: 201,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
  };

  export const APP_ERROR_MESSAGE = {
  serverError: "Something went wrong, try again later. If this problem persists, contact the administrator",
  userDoesntExist: "User does not exist",
  rentalPropertyNotFound: "Rental property not found",
  invalidCredentials: "Invalid user email or password",
  invalidEmail: "Enter a valid email address",
  invalidId: "Id is not valid",
};