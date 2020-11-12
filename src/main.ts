import { NestFactory, Reflector } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ClassSerializerInterceptor, INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { AppModule } from './AppModule'

require('dotenv').config({ path: require('find-config')('.env') })

const logger = new Logger('main')

export async function createApp(): Promise<INestApplication> {
    return NestFactory.create(AppModule)
}

export async function configureApp(app: INestApplication): Promise<void> {
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true
        })
    )

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

    const options = new DocumentBuilder()
        .setTitle('COMO assignment')
        .setDescription('Instagram API example')
        .setVersion('0.1')
        .build()
    const document = SwaggerModule.createDocument(app, options)

    SwaggerModule.setup('swagger', app, document)

    if (require.main === module) {
        const port = process.env.SERVER_PORT || 3000
        logger.log(`Starting server on port: ${port}`)
        await app.listen(port)
    }
}

createApp()
    .then(async app => configureApp(app))
    .then(() => logger.log(`Bootstrap configuration complete.`))
    .catch(e => {
        throw e
    })
