import { Injectable } from '@nestjs/common';
import RepoService from './repo.service';

@Injectable()
export class AppService {
	constructor(private readonly repoService: RepoService) {}

	async getBooksCount(): Promise<string> {
		// querying database
		return `Total books are ${await this.repoService.bookRepo.count()}`;
	}
}
