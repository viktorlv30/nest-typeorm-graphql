import { Module } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import AuthorResolver from '../resolvers/author.resolver';
import BookResolver from '../resolvers/book.resolver';
import { AppController } from '../controllers/app.controller';
import RepoModule from './repo.module';

const graphQLImports = [AuthorResolver, BookResolver];

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		RepoModule,
		...graphQLImports,
		GraphQLModule.forRoot({
			autoSchemaFile: 'schema.graphql',
			playground: true,
			debug: true,
			path: '/',
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
