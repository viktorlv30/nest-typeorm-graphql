import { ArgsType, Field, Int } from 'type-graphql';

const MAX_32_BIT_INT = Math.pow(2, 31) - 1;

@ArgsType()
export class AuthorsSearch {
	@Field(type => Int, { nullable: true, defaultValue: 0 })
	minNumberOfBooks: number;

	@Field(type => Int, {
		nullable: true,
		defaultValue: MAX_32_BIT_INT,
	})
	maxNumberOfBooks: number;
}
