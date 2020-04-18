import { Field, InputType } from 'type-graphql';

@InputType()
class AuthorInput {
	@Field()
	readonly firstName: string;
	@Field()
	readonly lastName: string;
}

export default AuthorInput;
