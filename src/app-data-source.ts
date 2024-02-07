import { DataSource } from 'typeorm'
import 'dotenv/config'

export const database = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	entities: ['src/entities/*.ts'],
	migrations: ['src/migrations/*.ts'],
	synchronize: false,
	logging: ['info', 'warn', 'error', 'migration'],
})
