import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Note {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(() => User, (user) => user.notes, { nullable: false })
	user: User

	@Column({ type: 'character varying', nullable: false })
	title: string

	@Column({ type: 'text', nullable: true })
	content: string
}
