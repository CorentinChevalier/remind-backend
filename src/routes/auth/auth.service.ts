import { database } from '../../app-data-source'
import { User } from '../../entities/user.entity'
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
	const { email, username, firstname, lastname, password, confirmPassword } =
		body

	//checking for email unicity
	if (await userRepository.findOneBy({ email })) {
		throw {
			status: 400,
			code: 'signup_email_already_exists',
			message: 'Email already exists',
		}
	}

	//checking for username unicity
	if (await userRepository.findOneBy({ username })) {
		throw {
			status: 400,
			code: 'signup_username_already_exists',
			message: 'Username already exists',
		}
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
		throw {
			status: 400,
			code: 'signup_missing_fields',
			message: 'Missing fields',
		}
	}

	//checking for password match
	if (password !== confirmPassword) {
		throw {
			status: 400,
			code: 'signup_password_mismatch',
			message: 'Password mismatch',
		}
	}

	return true
}

export async function verifySigninFormdata(
	body: SigninFormdata
): Promise<boolean> {
	const { email, password } = body

	//checking for missing fields
	if (!email || !password) {
		throw {
			status: 400,
			code: 'signin_missing_fields',
			message: 'Missing fields',
		}
	}

	const user = await userRepository.findOneBy({ email })

	//checking for valid email format
	if (!emailFormat.test(email)) {
		throw {
			status: 400,
			code: 'signin_invalid_email',
			message: 'email format is invalid',
		}
	}

	//checking for valid email
	if (!user) {
		throw {
			status: 400,
			code: 'signin_invalid_email',
		}
	}

	//checking for valid password
	if (!(await verifyPassword(password, user.password))) {
		throw { status: 400, code: 'signin_invalid_password' }
	}

	return true
}

export async function createToken(
	body: SigninFormdata
): Promise<string | undefined> {
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
		throw { status: 500, code: 'signin_token_creation_failed' }
	}
}
