import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToMany,
	RelationCount,
} from 'typeorm';
import Book from './book.entity';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity({ name: 'authors' })
export default class Author {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ name: 'first_name' })
	firstName: string;

	@Field()
	@Column({ name: 'last_name' })
	lastName: string;

	@Field(() => [Book], { nullable: true })
	books: Book[];

	// Associations

	@ManyToMany(
		type => Book,
		book => book.authorsRelation,
		{ cascade: true },
	)
	booksRelation: Book[];

	@RelationCount((author: Author) => author.booksRelation)
	bookCount: number;
}
