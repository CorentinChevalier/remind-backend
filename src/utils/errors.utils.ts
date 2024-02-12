enum ErrorCodes {
	SIGNIN_INVALID_EMAIL = 'SIGNIN_INVALID_EMAIL',
	SIGNIN_INVALID_PASSWORD = 'SIGNIN_INVALID_PASSWORD',
	SIGNUP_EMAIL_ALREADY_EXISTS = 'SIGNUP_EMAIL_ALREADY_EXISTS',
	SIGNUP_USERNAME_ALREADY_EXISTS = 'SIGNUP_USERNAME_ALREADY_EXISTS',
	SIGNUP_MISSING_FIELDS = 'SIGNUP_MISSING_FIELDS',
	SIGNUP_PASSWORDS_DO_NOT_MATCH = 'SIGNUP_PASSWORDS_DO_NOT_MATCH',
	SIGNUP_USER_CREATION_FAILED = 'SIGNUP_USER_CREATION_FAILED',
	PASSWORD_HASH_ERROR = 'PASSWORD_HASH_ERROR',
	PASSWORD_VERIFY_HASH_ERROR = 'PASSWORD_VERIFY_HASH_ERROR',
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
		SIGNIN_INVALID_PASSWORD: 'Invalid password',
		SIGNUP_EMAIL_ALREADY_EXISTS: 'Email already exists',
		SIGNUP_USERNAME_ALREADY_EXISTS: 'Username already exists',
		SIGNUP_MISSING_FIELDS: 'Missing fields',
		SIGNUP_PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
		SIGNUP_USER_CREATION_FAILED: 'User creation failed',
		PASSWORD_HASH_ERROR: 'Error hashing password',
		PASSWORD_VERIFY_HASH_ERROR: 'Error verifying password hash',
		UNKNOWN_ERROR: 'Unknown error',
	}

	constructor(code: ErrorCodes) {
		this.code = code
		this.message = CustomErrorCodes.errorMessages[code]
	}
}

export { ErrorCodes, CustomErrorCodes }
