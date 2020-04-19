import { ArgsType, Field } from 'type-graphql';

export const DEFAULT_BOOKS_SEARCH = '';

@ArgsType()
export class GetBooksArgs {
	@Field(type => String, {
		defaultValue: DEFAULT_BOOKS_SEARCH,
	})
	title: string;
}
