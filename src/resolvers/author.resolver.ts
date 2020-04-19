import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import RepoService from 'src/repo.service';
import Author from 'src/db/models/author.entity';
import { AuthorsSearch } from './input/authors.search.arg';
import AuthorInput from './input/author.input';
import { Int } from 'type-graphql';
import { IDArg } from './input/id.arg';

@Resolver(Author)
class AuthorResolver {
	constructor(private readonly repoService: RepoService) {}

	@Query(returns => Author, {
		nullable: true,
		description: 'Find author by id.`',
	})
	public getAuthor(@Args() { id }: IDArg): Promise<Author> {
		return this.repoService.authorRepo.findOne(id);
	}

	@Query(() => [Author], {
		description: `1. Without arguments returns all the authors\n2. With 'minNumberOfBooks: 3' returns the authors who has 3 and more books\n3. With 'maxNumberOfBooks: 10' returns the authors who has not more than 10 books\n4. With 'minNumberOfBooks: 3, maxNumberOfBooks: 6' returns the authors who has 3,4,5 and 6 books`,
	})
	public async getAuthors(
		@Args() { minNumberOfBooks, maxNumberOfBooks }: AuthorsSearch,
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

	@Mutation(() => Author)
	public async createAuthor(
		@Args('author') { firstName, lastName }: AuthorInput,
	): Promise<Author> {
		const author = this.repoService.authorRepo.create({
			firstName,
			lastName,
		});

		return this.repoService.authorRepo.save(author);
	}

	@Mutation(() => Int)
	public async deleteAuthor(@Args() { id }: IDArg): Promise<number> {
		const deleteResult = await this.repoService.authorRepo.delete(id);

		return deleteResult.affected;
	}
}

export default AuthorResolver;
