import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = process.env.PORT || 3000;
	Logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap');
	await app.listen(port);
}
bootstrap();
