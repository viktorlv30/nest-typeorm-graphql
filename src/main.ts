import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './modules/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = process.env.PORT || 3000;
	Logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap');
	await app.listen(port);
}
bootstrap();
