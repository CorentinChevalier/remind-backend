import express, { Request, Response } from 'express'
import { SignupFormdata } from './auth.utils'
import { verifyUserSignupFormdata } from './auth.service'
import { CustomErrorCodes, ErrorCodes } from '../../utils/errors.utils'
import { createUser } from '../users/users.service'

const auth = express.Router()

auth.post('/signin', (req: Request, res: Response) => {
	try {
		res.send('signin')
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
})

auth.post(
	'/signup',
	async (req: Request<object, object, SignupFormdata>, res: Response) => {
		try {
			if (await verifyUserSignupFormdata(req.body)) {
				//create user
				const user = await createUser(req.body)

				if (!user) {
					throw new CustomErrorCodes(
						ErrorCodes.SIGNUP_USER_CREATION_FAILED
					)
				}

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
