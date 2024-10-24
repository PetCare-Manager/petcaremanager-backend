
export enum RestCodes {
	CODE_OK = 200,
	CODE_CREATED = 201,
	CODE_NO_CONTENT = 204,
	CODE_BAD_REQUEST = 400
}

export class CustomError extends Error{
	constructor(message: string, public statusCode: RestCodes) {
		super(message);
		Error.captureStackTrace(this, this.constructor);
		this.toJson();
	}

	toJson() {
		return {
			statusCode: this.statusCode,
			message: this.message,
		};
	}
}