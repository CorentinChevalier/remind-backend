import { database } from '../../app-data-source'
import { User } from '../../entities/user.entity'
import { CustomErrorCodes, ErrorCodes } from '../../utils/errors.utils'
import { SignupFormdata } from './auth.utils'

const userRepository = database.getRepository(User)

export const verifyUserSignupFormdata = async (body: SignupFormdata) => {
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
		if (error instanceof CustomErrorCodes) {
			throw new CustomErrorCodes(error.code)
		} else {
			throw new CustomErrorCodes(ErrorCodes.UNKNOWN_ERROR)
		}
	}
}
