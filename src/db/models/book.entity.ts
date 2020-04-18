import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	JoinTable,
	RelationCount,
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

	@Field(() => [Author], { nullable: true })
	authors: Author[];

	// Associations

	@ManyToMany(
		type => Author,
		author => author.booksRelation,
		{ primary: true },
	)
	@JoinTable()
	authorsRelation: Author[];

	@RelationCount((book: Book) => book.authorsRelation)
	authorCount: number;
}
