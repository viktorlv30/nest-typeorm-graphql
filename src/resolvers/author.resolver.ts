import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import RepoService from '../services/repo.service';
import Author from '../db/models/author.entity';
import { AuthorsSearch } from './input/authors.search.arg';
import AuthorInput from './input/author.input';
import { Int } from 'type-graphql';
import { IDArg } from './input/id.arg';

@Resolver(Author)
class AuthorResolver {
	constructor(private readonly repoService: RepoService) {}

	@Query(returns => Author, {
		nullable: true,
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
		return (await this.repoService.authorRepo.delete(id)).affected;
	}

	@Mutation(() => Int, {
		description:
			'1. Deletes an author and all his/her books without coauthors\n2. For books with coauthors deletes the author from coauthors list\n3. Returns: deleted and updated raws count (author and books without coauthors + books in coauthors or 0)',
	})
	public async deleteAuthorWithBooks(@Args() id: IDArg): Promise<number> {
		// Do not start a transaction if an author doesn't exist
		const author = await this.repoService.authorRepo.findOne(id, {
			relations: ['booksRelation'],
		});

		if (!author) {
			return 0;
		}

		const queryRunner = this.repoService.authorRepo.manager.connection.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const personalBooks = author.booksRelation.filter(
				book => book.authorCount === 1,
			);

			await Promise.all([
				this.repoService.bookRepo.delete(
					personalBooks.map(book => book.id),
				),
				this.repoService.authorRepo.delete(id),
			]);

			// 1 - actually author
			const count = author.bookCount + 1;
			queryRunner.commitTransaction();

			return count;
		} catch (error) {
			// Since we have errors lets rollback the changes we made
			queryRunner.rollbackTransaction();
		} finally {
			// We need to release a queryRunner which was manually instantiated
			queryRunner.release();
		}
	}
}

export default AuthorResolver;
