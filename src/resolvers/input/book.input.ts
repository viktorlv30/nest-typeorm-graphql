import { Field, InputType, Int } from 'type-graphql';

@InputType()
class BookInput {
	@Field(type => String)
	readonly title: string;

	@Field(type => [Int])
	readonly authorIds: number[];
}

export default BookInput;
