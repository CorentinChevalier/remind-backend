import { database } from '../../app-data-source'
import { User } from '../../entities/user.entity'
import { SignupFormdata, hashPassword } from '../auth/auth.utils'

const userRepository = database.getRepository(User)

export async function createUser(formdata: SignupFormdata): Promise<boolean> {
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
		throw { status: 500, code: 'user_creation_error' }
	}
}
