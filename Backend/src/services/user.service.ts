import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { ERole } from 'src/common/enums/ERole'
import { CreateUserDTO } from 'src/dto/user.dto'
import { v4 as uuidv4 } from 'uuid'
import { PrismaService } from './prisma.service'

@Injectable()
export class userService {
  constructor(private prisma: PrismaService) {}

  async tambahUser(body: CreateUserDTO) {
    const salt = 10
    const pass = body.password
    const hash = await bcrypt.hash(pass, salt)
    const create = await this.prisma.user.create({
      data: {
        id: uuidv4(),
        role: ERole.SU,
        username: body.username,
        password: hash,
        nama: body.nama,
        email: body.email,
        true_password: body.password,
      },
    })
    console.log(create)

    return create
  }

  async lihatuser() {
    const get = await this.prisma.user.findMany()
    return get
  }
}
