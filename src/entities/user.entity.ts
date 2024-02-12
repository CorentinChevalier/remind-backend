import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Note, NoteInterface } from './note.entity'
import { Settings, SettingsInterface } from './settings.entity'

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

export interface UserInterface {
	id: string
	username: string
	firstname: string
	lastname: string
	email: string
	password: string
	notes: NoteInterface[]
	settings: SettingsInterface
}
