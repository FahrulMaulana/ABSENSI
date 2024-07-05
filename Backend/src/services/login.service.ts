import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import * as jwt from 'jsonwebtoken'
import { env } from 'process'
import { UserPayload } from 'src/common/interfaces/Userpayload'
import { LoginDTO, LoginData } from 'src/dto/login.dto'
import { PrismaService } from './prisma.service'

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}

  async login(body: LoginDTO) {
    const cek = await this.prisma.user.findFirst({
      where: {
        username: body.username,
      },
    })

    if (!cek) {
      throw new BadRequestException('username salah')
    }

    if (cek) {
      const cekPass = await bcrypt.compare(body.password, cek.password as string)

      if (!cekPass) {
        throw new BadRequestException('Password salah')
      }

      const Userpayloadd = new UserPayload({
        id: cek.id,
        id_role: cek.role,
        username: cek.username,
        nama: cek.nama,
        email: cek.email,
      })

      const token = jwt.sign(instanceToPlain(Userpayloadd, { excludeExtraneousValues: true }), env.APP_KEY as string, {
        expiresIn: '7D',
      })

      return plainToInstance(LoginData, {
        token,
        userPayload: Userpayloadd,
      })
    }
  }
}
