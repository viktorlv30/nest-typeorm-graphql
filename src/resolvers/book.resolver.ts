import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import RepoService from 'src/repo.service';
import Book from 'src/db/models/book.entity';
import { Raw } from 'typeorm';
import { BooksSearch, DEFAULT_BOOKS_SEARCH } from './input/books.search.arg';
import { prepareLikeQueryString } from 'src/helpers/books.query.helper';
import BookInput from './input/book.input';
import { AuthorAdd } from './input/add.author.arg';
import { Int } from 'type-graphql';
import { IDArg } from './input/id.arg';

@Resolver(Book)
class BookResolver {
	constructor(private readonly repoService: RepoService) {}

	@Query(returns => Book, {
		nullable: true,
		description: 'Find a book by id.`',
	})
	public getBook(@Args() { id }: IDArg): Promise<Book> {
		return this.repoService.bookRepo.findOne(id);
	}

	@Query(() => [Book], {
		description: `1. Case insensitive\n2. Supports 'like' syntax\n3. Without parameter - returns all the books\n4. With 'title: Art of %' - returns all books which names start with 'Art of'`,
	})
	public async getBooks(@Args() { title }: BooksSearch): Promise<Book[]> {
		// Without arguments return all the books
		if (title === DEFAULT_BOOKS_SEARCH) {
			return this.repoService.bookRepo.find();
		}

		const searchQuery = prepareLikeQueryString(title);

		return this.repoService.bookRepo.find({
			where: {
				title: Raw(alias => `${alias} LIKE '${searchQuery}'`),
			},
		});
	}

	@Mutation(() => Book)
	public async createBook(
		@Args('book') { title, authorIds }: BookInput,
	): Promise<Book> {
		const authors = await this.repoService.authorRepo.findByIds(authorIds);
		const newBook = new Book();
		newBook.title = title;
		newBook.authorsRelation = authors;

		return this.repoService.bookRepo.save(newBook);
	}

	@Mutation(() => Book)
	public async addAuthor(
		@Args() { bookId, authorId }: AuthorAdd,
	): Promise<Book> {
		const book = await this.repoService.bookRepo.findOne(bookId, {
			relations: ['authorsRelation'],
		});
		const author = await this.repoService.authorRepo.findOne(authorId);
		if (!(book.authorsRelation instanceof Array)) {
			book.authorsRelation = [];
		}
		book.authorsRelation.push(author);

		return this.repoService.bookRepo.save(book);
	}

	@Mutation(() => Int)
	public async deleteBook(@Args() { id }: IDArg): Promise<number> {
		return (await this.repoService.bookRepo.delete(id)).affected;
	}

	// @ResolveProperty(() => Author)
	// public async author(@Parent() parent): Promise<Author> {
	// 	return this.repoService.authorRepo.findOne(parent.authorsId);
	// }
}

export default BookResolver;
