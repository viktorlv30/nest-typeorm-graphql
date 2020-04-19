import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoModule from './repo.module';
import { GraphQLModule } from '@nestjs/graphql';
import AuthorResolver from './resolvers/author.resolver';
import BookResolver from './resolvers/book.resolver';

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
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
