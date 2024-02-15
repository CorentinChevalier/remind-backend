import express, { NextFunction, Request, Response } from 'express'
import { SigninFormdata, SignupFormdata } from './auth.utils'
import {
	createToken,
	verifySigninFormdata,
	verifyUserSignupFormdata,
} from './auth.service'
import { createUser } from '../users/users.service'

const auth = express.Router()

auth.post(
	'/signin',
	async (
		req: Request<object, object, SigninFormdata>,
		res: Response,
		next: NextFunction
	) => {
		try {
			let token = undefined
			//we check that everything is okay (email, password, etc.)
			await verifySigninFormdata(req.body)
			token = await createToken(req.body)

			res.cookie('jwt-auth', token, {
				httpOnly: true,
				secure: true,
				maxAge: 86400000, //24 hours in milliseconds
			})

			res.status(200).send('User signed in successfully')
		} catch (error) {
			next(error)
		}
	}
)

auth.post(
	'/signup',
	async (
		req: Request<object, object, SignupFormdata>,
		res: Response,
		next: NextFunction
	) => {
		try {
			if (await verifyUserSignupFormdata(req.body)) {
				//create user
				await createUser(req.body)

				res.status(201).send('User created successfully')
			}
		} catch (error) {
			next(error)
		}
	}
)

export default auth
