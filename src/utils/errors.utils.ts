enum ErrorCodes {
	//SIGNIN ERROR CODES
	SIGNIN_INVALID_EMAIL = 'SIGNIN_INVALID_EMAIL',
	SIGNIN_INVALID_EMAIL_FORMAT = 'SIGNIN_INVALID_EMAIL_FORMAT',
	SIGNIN_INVALID_PASSWORD = 'SIGNIN_INVALID_PASSWORD',
	SIGNIN_MISSING_FIELDS = 'SIGNIN_MISSING_FIELDS',
	//SIGNUP ERROR CODES
	SIGNUP_EMAIL_ALREADY_EXISTS = 'SIGNUP_EMAIL_ALREADY_EXISTS',
	SIGNUP_USERNAME_ALREADY_EXISTS = 'SIGNUP_USERNAME_ALREADY_EXISTS',
	SIGNUP_MISSING_FIELDS = 'SIGNUP_MISSING_FIELDS',
	SIGNUP_PASSWORDS_DO_NOT_MATCH = 'SIGNUP_PASSWORDS_DO_NOT_MATCH',
	SIGNUP_USER_CREATION_FAILED = 'SIGNUP_USER_CREATION_FAILED',
	//PASSWORD HASH ERROR CODES
	PASSWORD_HASH_ERROR = 'PASSWORD_HASH_ERROR',
	PASSWORD_VERIFY_HASH_ERROR = 'PASSWORD_VERIFY_HASH_ERROR',
	//JWT ERROR CODES
	JWT_SIGN_ERROR = 'JWT_SIGN_ERROR',
	JWT_DECODE_ERROR = 'JWT_DECODE_ERROR',
	//UNKNOWN ERROR CODE
	UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

type CustomError = {
	[code in ErrorCodes]: string
}

class CustomErrorCodes {
	public code: ErrorCodes
	public message: string
	private static errorMessages: CustomError = {
		SIGNIN_INVALID_EMAIL: 'Invalid email',
		SIGNIN_INVALID_EMAIL_FORMAT: 'Invalid email format',
		SIGNIN_INVALID_PASSWORD: 'Invalid password',
		SIGNIN_MISSING_FIELDS: 'Missing fields',
		SIGNUP_EMAIL_ALREADY_EXISTS: 'Email already exists',
		SIGNUP_USERNAME_ALREADY_EXISTS: 'Username already exists',
		SIGNUP_MISSING_FIELDS: 'Missing fields',
		SIGNUP_PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
		SIGNUP_USER_CREATION_FAILED: 'User creation failed',
		PASSWORD_HASH_ERROR: 'Error hashing password',
		PASSWORD_VERIFY_HASH_ERROR: 'Error verifying password hash',
		JWT_SIGN_ERROR: 'Error signing JWT',
		JWT_DECODE_ERROR: 'Error decoding JWT',
		UNKNOWN_ERROR: 'Unknown error',
	}

	constructor(code: ErrorCodes) {
		this.code = code
		this.message = CustomErrorCodes.errorMessages[code]
	}
}

function handleErrorType(error: unknown) {
	if (error instanceof CustomErrorCodes) {
		throw error
	} else {
		throw new CustomErrorCodes(ErrorCodes.UNKNOWN_ERROR)
	}
}

export { ErrorCodes, CustomErrorCodes, handleErrorType }
