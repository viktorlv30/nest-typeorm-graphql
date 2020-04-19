import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class AuthorAdd {
	@Field(type => ID)
	authorId: number;

	@Field(type => ID)
	bookId: number;
}
