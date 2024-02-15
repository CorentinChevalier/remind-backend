import { NextFunction, Request, Response } from 'express'

export interface CustomError {
	status: number
	code: string
	message?: string
}

export function clientErrorHandler(
	err: CustomError,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction
) {
	// eslint-disable-next-line no-console
	switch (err.code) {
		default:
			//console.error(err)
			res.status(err.status).send(err.message)
	}
}
