import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

/**
 * entryoint of programm
 *
 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('/api/parking')
    const document = SwaggerModule.createDocument(
        app, 
        new DocumentBuilder()
        .setTitle('smart-parking')
        .setDescription('Parking api description')
        .setVersion('1.0')
        .addBearerAuth()
        .setBasePath('/api/parking')
        .build()
    )
    
    SwaggerModule.setup(
            'api/parking/swagger', 
            app,
            document,
            {
                swaggerOptions: {
                    displayRequestDuration: true,
                },
            }
        )
    
    await app.listen(3001);
}
bootstrap();
