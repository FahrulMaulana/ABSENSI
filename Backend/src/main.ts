import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { env } from 'process'
import { AppModule } from './app.module'
import { SwaggerApiDocs } from './docs/swagger-api.docs'

async function bootstrap() {
  if (!env.APP_KEY) throw new Error('APP_KEY is not defined')

  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // Static Assets
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setViewEngine('html')

  /* Global Interceptor */
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector), { excludeExtraneousValues: true }))

  /* Global Validation */
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

  /* Swagger */
  if (env.APP_ENV !== 'prod') {
    new SwaggerApiDocs(app).init()
  }

  await app.listen(5000)

  console.log(`Application is running on: http://localhost:5000`)
}
bootstrap()
