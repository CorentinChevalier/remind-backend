import argon2 from 'argon2'
import 'dotenv/config'
import { CustomErrorCodes, ErrorCodes } from '../../utils/errors.utils'

export interface SignupFormdata {
	email: string
	username: string
	firstname: string
	lastname: string
	password: string
	confirmPassword: string
}

export async function hashPassword(password: string): Promise<string> {
	try {
		return await argon2.hash(password, {
			secret: Buffer.from(process.env.HASH_PASSWORD_SECRET as string),
		})
	} catch (error) {
		throw new CustomErrorCodes(ErrorCodes.PASSWORD_HASH_ERROR)
	}
}

export async function verifyPassword(
	password: string,
	hash: string
): Promise<boolean> {
	try {
		return await argon2.verify(hash, password)
	} catch (error) {
		throw new CustomErrorCodes(ErrorCodes.PASSWORD_VERIFY_HASH_ERROR)
	}
}
