import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import Author from './author.entity';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
@Entity({ name: 'books' })
export default class Book {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	title: string;

	// Associations

	@ManyToMany(
		type => Author,
		author => author.books,
		{ primary: true },
	)
	@JoinTable()
	authors: Author[];
}
