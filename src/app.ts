import express from 'express'
import helmet from 'helmet'
import 'dotenv/config'
import 'reflect-metadata'
import { database } from './app-data-source'
import authController from './routes/auth/auth.controller'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import options from './swaggerConfig'

//setting up connection to the database
database
	.initialize()
	.then(() => {
		// eslint-disable-next-line no-console
		console.log(`Connection to database initialized`)
		// eslint-disable-next-line no-console
		console.log(`Database is running on port ${process.env.POSTGRES_PORT}`)
	})
	.catch((err) => {
		// eslint-disable-next-line no-console
		console.error(err)
		process.exit(1)
	})

const PORT = process.env.PORT ?? 3000

const app = express()

//!keep this up to date for security reasons
app.use(helmet())

//required to parse requests bodies
app.use(express.json())

//swagger
const specs = swaggerJsdoc(options)
app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(specs, { explorer: true })
)

//controllers
app.use('/auth', authController)

//start the server
app.listen(process.env.PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`App listening on port ${PORT}`)
})
