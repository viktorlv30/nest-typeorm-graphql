import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class AuthorAdd {
	@Field(type => ID)
	bookId: number;

	@Field(type => ID)
	authorId: number;
}
