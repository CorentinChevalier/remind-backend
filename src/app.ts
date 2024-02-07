import express from 'express'
import helmet from 'helmet'
import 'dotenv/config'
import 'reflect-metadata'
import { database } from './app-data-source'

//setting up connection to the database
database
	.initialize()
	.then(() => {
		console.log(`Connection to database initialized`)
		console.log(`Database is running on port ${process.env.POSTGRES_PORT}`)
	})
	.catch((err) => {
		console.error(err)
		process.exit(1)
	})

const PORT = process.env.PORT ?? 3000

const app = express()

//!keep this up to date for security reasons
app.use(helmet())

app.listen(process.env.PORT, () => {
	console.log(`App listening on port ${PORT}`)
})
