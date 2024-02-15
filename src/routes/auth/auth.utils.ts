import argon2 from 'argon2'
import 'dotenv/config'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { SettingsInterface } from '../../entities/settings.entity'

export interface SignupFormdata {
	email: string
	username: string
	firstname: string
	lastname: string
	password: string
	confirmPassword: string
}

export interface SigninFormdata {
	email: string
	password: string
}

export interface JwtTokenBody {
	user: {
		email: string
		username: string
		settings: SettingsInterface
	}
}

export async function hashPassword(password: string): Promise<string> {
	try {
		return await argon2.hash(password, {
			secret: Buffer.from(process.env.HASH_PASSWORD_SECRET as string),
		})
	} catch (error) {
		throw { status: 500, code: 'hash_password_error' }
	}
}

export async function verifyPassword(
	password: string,
	hash: string
): Promise<boolean> {
	try {
		return await argon2.verify(hash, password, {
			secret: Buffer.from(process.env.HASH_PASSWORD_SECRET as string),
		})
	} catch (error) {
		throw { status: 500, code: 'verify_password_error' }
	}
}

export function signJwt(payload: JwtPayload): string | undefined {
	try {
		return jwt.sign(payload, process.env.JWT_SECRET as string, {
			expiresIn: process.env.JWT_EXPIRATION as string,
		})
	} catch (error) {
		throw { status: 500, code: 'sign_jwt_error' }
	}
}

export function decodeJwt(token: string): string | JwtPayload | undefined {
	try {
		return jwt.verify(token, process.env.JWT_SECRET as string)
	} catch (error) {
		throw { status: 500, code: 'decode_jwt_error' }
	}
}
