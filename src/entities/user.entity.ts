import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Note } from './note.entity'
import { Settings } from './settings.entity'

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'character varying', nullable: false, unique: true })
	username: string

	@Column({ type: 'character varying', nullable: false })
	firstname: string

	@Column({ type: 'character varying', nullable: false })
	lastname: string

	@Column({ type: 'character varying', nullable: false, unique: true })
	email: string

	@Column({ type: 'character varying', nullable: false })
	password: string

	@OneToMany(() => Note, (note) => note.user)
	notes: Note[]

	@OneToOne(() => Settings)
	@JoinColumn()
	settings: Settings
}
