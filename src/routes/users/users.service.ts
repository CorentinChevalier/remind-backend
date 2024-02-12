import { database } from '../../app-data-source'
import { User } from '../../entities/user.entity'
import { CustomErrorCodes, ErrorCodes } from '../../utils/errors.utils'
import { SignupFormdata, hashPassword } from '../auth/auth.utils'

const userRepository = database.getRepository(User)

export const createUser = async (
	formdata: SignupFormdata
): Promise<boolean> => {
	try {
		//hashing password
		const hashedPassword = await hashPassword(formdata.password)

		//creating user
		const user = await userRepository.insert({
			email: formdata.email,
			username: formdata.username,
			firstname: formdata.firstname,
			lastname: formdata.lastname,
			password: hashedPassword,
		})

		if (user) {
			return true
		} else {
			return false
		}
	} catch (error) {
		throw new CustomErrorCodes(ErrorCodes.SIGNUP_USER_CREATION_FAILED)
	}
}
