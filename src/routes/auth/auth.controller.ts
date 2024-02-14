import express, { Request, Response } from 'express'
import { SigninFormdata, SignupFormdata } from './auth.utils'
import {
	createToken,
	verifySigninFormdata,
	verifyUserSignupFormdata,
} from './auth.service'
import { CustomErrorCodes, ErrorCodes } from '../../utils/errors.utils'
import { createUser } from '../users/users.service'

const auth = express.Router()

auth.post(
	'/signin',
	async (req: Request<object, object, SigninFormdata>, res: Response) => {
		try {
			let token = undefined
			//we check that everything is okay (email, password, etc.)
			const isDataValid = await verifySigninFormdata(req.body)

			if (isDataValid) {
				token = await createToken(req.body)
			}

			res.cookie('jwt-auth', token, {
				httpOnly: true,
				secure: true,
				maxAge: 86400000, //24 hours in milliseconds
			})

			res.status(200).send({ message: 'User signed in successfully' })
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('🧨 ERROR', error)
			if (error instanceof CustomErrorCodes) {
				if (
					error.code === ErrorCodes.SIGNIN_INVALID_EMAIL ||
					error.code === ErrorCodes.SIGNIN_INVALID_PASSWORD
				) {
					res.status(401).send()
				} else {
					res.status(400).send(error)
				}
			} else {
				res.status(500).send(
					new CustomErrorCodes(ErrorCodes.UNKNOWN_ERROR)
				)
			}
		}
	}
)

auth.post(
	'/signup',
	async (req: Request<object, object, SignupFormdata>, res: Response) => {
		try {
			if (await verifyUserSignupFormdata(req.body)) {
				//create user
				await createUser(req.body)

				res.status(201).send('User created successfully')
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('🧨 ERROR', error)
			if (error instanceof CustomErrorCodes) {
				res.status(400).send(error)
			} else {
				res.status(500).send(
					new CustomErrorCodes(ErrorCodes.UNKNOWN_ERROR)
				)
			}
		}
	}
)

export default auth
