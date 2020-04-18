import { /*Args, Mutation, Query,*/ Resolver } from '@nestjs/graphql';
import RepoService from '../../src/repo.service';
// import Author from 'src/db/models/author.entity';
// import AuthorInput from './input/author.input';

@Resolver()
class AuthorResolver {
	constructor(private readonly repoService: RepoService) {}

	// @Query(() => Author, { nullable: true })
	// public async getAuthor(@Args('id') id: number): Promise<Author> {
	// 	return this.repoService.authorRepo.findOne(id);
	// }

	// @Query(() => [Author])
	// public async getAuthors(
	// 	minNumberOfBooks: number,
	// 	maxNumberOfBooks: number,
	// ): Promise<Author[]> {
	// 	return this.repoService.authorRepo.find();
	// }

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
