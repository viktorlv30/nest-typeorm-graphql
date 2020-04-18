import { Field, InputType } from 'type-graphql';

@InputType()
class BookInput {
	@Field()
	readonly title: string;

	@Field()
	readonly authorIds: number[];
}

export default BookInput;
