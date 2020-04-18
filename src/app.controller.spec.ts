import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import RepoModule from './repo.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AppController', () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [TypeOrmModule.forRoot(), RepoModule],
			controllers: [AppController],
			providers: [AppService],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe('root', () => {
		it('should contains "Total books are"', async () => {
			expect(await appController.getBooksCount()).toContain(
				'Total books are',
			);
		});
	});
});
