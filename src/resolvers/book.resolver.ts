import { Args, Query, Resolver } from '@nestjs/graphql';
import RepoService from 'src/repo.service';
import Book from 'src/db/models/book.entity';
import { Raw } from 'typeorm';

@Resolver(Book)
class BookResolver {
	constructor(private readonly repoService: RepoService) {}

	@Query(returns => Book, {
		nullable: true,
		description: 'Find a book by id.`',
	})
	public getBook(@Args('id') id: number): Promise<Book> {
		return this.repoService.bookRepo.findOne(id);
	}

	@Query(() => [Book], {
		description: `1. Case insensitive\n2. Supports 'like' syntax\n3. Without parameter - returns all the books\n4. With 'title: Art of %' - returns all books which names start with 'Art of'`,
	})
	public async getBooks(
		@Args('title') title: string = null,
	): Promise<Book[]> {
		return this.repoService.bookRepo.find({
			where: {
				title: Raw(alias => `${alias} ILIKE '%${title}%'`),
			},
		});
	}

	// @Mutation(() => Book)
	// public async createBook(@Args('data') input: BookInput): Promise<Book> {
	// 	const book = this.repoService.bookRepo.create({
	// 		title: input.title,
	// 		authorId: input.authorIds[0],
	// 	});
	// 	return this.repoService.bookRepo.save(book);
	// }

	// @Mutation(() => Book)
	// public async addAuthor(
	// 	@Args('bookId') bookId: number,
	// 	@Args('authorId') authorId: number,
	// ): Promise<Book> {

	// 	return this.repoService.bookRepo.addAuthor(bookId, authorId);
	// }

	// @Mutation(() => Book)
	// public async deleteAuthorWithBooks(
	// 	@Args('data') input: number,
	// ): Promise<number> {
	// 	return this.repoService.bookRepo.deleteAuthorWithBooks(input);
	// }

	// @Mutation(() => Book)
	// public async deleteAuthor(@Args('data') input: number): Promise<number> {
	// 	return this.repoService.bookRepo.deleteAuthor(input);
	// }
}

export default BookResolver;
