import { Field, InputType, ID } from 'type-graphql';

@InputType()
class BookInput {
	@Field(type => String)
	readonly title: string;

	@Field(type => [ID])
	readonly authorIds: number[];
}

export default BookInput;
