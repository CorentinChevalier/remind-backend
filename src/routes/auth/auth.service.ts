import { database } from '../../app-data-source'
import { User } from '../../entities/user.entity'
import {
	CustomErrorCodes,
	ErrorCodes,
	handleErrorType,
} from '../../utils/errors.utils'
import { emailFormat } from '../../utils/regex.utils'
import {
	SigninFormdata,
	SignupFormdata,
	signJwt,
	verifyPassword,
} from './auth.utils'

const userRepository = database.getRepository(User)

export async function verifyUserSignupFormdata(
	body: SignupFormdata
): Promise<boolean> {
	try {
		const {
			email,
			username,
			firstname,
			lastname,
			password,
			confirmPassword,
		} = body

		//checking for email unicity
		if (await userRepository.findOneBy({ email })) {
			throw new CustomErrorCodes(ErrorCodes.SIGNUP_EMAIL_ALREADY_EXISTS)
		}

		//checking for username unicity
		if (await userRepository.findOneBy({ username })) {
			throw new CustomErrorCodes(
				ErrorCodes.SIGNUP_USERNAME_ALREADY_EXISTS
			)
		}

		//checking for missing fields
		if (
			!email ||
			!username ||
			!firstname ||
			!lastname ||
			!password ||
			!confirmPassword
		) {
			throw new CustomErrorCodes(ErrorCodes.SIGNUP_MISSING_FIELDS)
		}

		//checking for password match
		if (password !== confirmPassword) {
			throw new CustomErrorCodes(ErrorCodes.SIGNUP_PASSWORDS_DO_NOT_MATCH)
		}

		return true
	} catch (error) {
		handleErrorType(error)
		return false
	}
}

export async function verifySigninFormdata(
	body: SigninFormdata
): Promise<boolean> {
	try {
		const { email, password } = body

		//checking for missing fields
		if (!email || !password) {
			throw new CustomErrorCodes(ErrorCodes.SIGNIN_MISSING_FIELDS)
		}

		const user = await userRepository.findOneBy({ email })

		//checking for valid email format
		if (!emailFormat.test(email)) {
			throw new CustomErrorCodes(ErrorCodes.SIGNIN_INVALID_EMAIL)
		}

		//checking for valid email
		if (!user) {
			throw new CustomErrorCodes(ErrorCodes.SIGNIN_INVALID_EMAIL)
		}

		//checking for valid password
		if (!(await verifyPassword(password, user.password))) {
			throw new CustomErrorCodes(ErrorCodes.SIGNIN_INVALID_PASSWORD)
		}

		return true
	} catch (error) {
		handleErrorType(error)
		return false
	}
}

export async function createToken(
	body: SigninFormdata
): Promise<string | undefined> {
	try {
		const user = await userRepository.findOneBy({ email: body.email })

		if (user) {
			return signJwt({
				user: {
					email: user.email,
					username: user.username,
					settings: user.settings,
				},
			})
		} else {
			throw new CustomErrorCodes(ErrorCodes.UNKNOWN_ERROR)
		}
	} catch (error) {
		handleErrorType(error)
	}
}
