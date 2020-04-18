import {
	Args,
	Query,
	Resolver,
} from '@nestjs/graphql';
import RepoService from 'src/repo.service';
import Author from 'src/db/models/author.entity';
import { GetAuthorsArgs } from './args/authors.arg';
// import AuthorInput from './input/author.input';

@Resolver(Author)
class AuthorResolver {
	constructor(private readonly repoService: RepoService) {}

	@Query(returns => Author, {
		nullable: true,
		description: 'Find author by id.`',
	})
	public getAuthor(@Args('id') id: number): Promise<Author> {
		return this.repoService.authorRepo.findOne(id);
	}

	@Query(() => [Author], {
		description: `1. Without arguments returns all the authors\n2. With 'minNumberOfBooks: 3' returns the authors who has 3 and more books\n3. With 'maxNumberOfBooks: 10' returns the authors who has not more than 10 books\n4. With 'minNumberOfBooks: 3, maxNumberOfBooks: 6' returns the authors who has 3,4,5 and 6 books`,
	})
	public async getAuthors(
		@Args() { minNumberOfBooks, maxNumberOfBooks }: GetAuthorsArgs,
	): Promise<Author[]> {
		const authors = (
			await this.repoService.authorRepo.find({
				relations: ['booksRelation'],
			})
		).filter(
			author =>
				author.bookCount >= minNumberOfBooks &&
				author.bookCount <= maxNumberOfBooks,
		);

		return authors;
	}

	// @Mutation(() => Author)
	// public async createAuthor(
	// 	@Args('data') input: AuthorInput,
	// ): Promise<Author> {
	// 	const author = this.repoService.authorRepo.create({
	// 		firstName: input.firstName,
	// 	});
	// 	return this.repoService.authorRepo.save(author);
	// }

	// @Mutation(() => Author)
	// public async deleteAuthor(@Args('data') input: number): Promise<number> {
	// 	return this.repoService.authorRepo.deleteOneById(input);
	// }
}

export default AuthorResolver;
