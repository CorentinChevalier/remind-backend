import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Settings {
	@PrimaryGeneratedColumn('uuid')
	id: string
}
