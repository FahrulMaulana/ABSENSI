import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { hellocontroler } from './controllers/Hello.controller'
import { AbsensiController } from './controllers/absensi.controller'
import { LoginController } from './controllers/login.controller'
import { userController } from './controllers/user.controller'
import { helloservice } from './services/Hello.service'
import { AbsensiService } from './services/absensi.service'
import { LoginService } from './services/login.service'
import { PrismaModule } from './services/prisma.module'
import { userService } from './services/user.service'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'publlic'),
    }),
    PrismaModule,
  ],
  controllers: [hellocontroler, userController, LoginController, AbsensiController],
  providers: [helloservice, userService, LoginService, AbsensiService],
})
export class AppModule {}
