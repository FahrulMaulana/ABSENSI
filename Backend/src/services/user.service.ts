import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { ERole } from 'src/common/enums/ERole'
import { UserPayload } from 'src/common/interfaces/UserPayload'
import { CreateUserDTO, EditProfile } from 'src/dto/user.dto'
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

  async userInfo(user: UserPayload) {
    return {
      id: user.id,
      role: user.id_role,
      username: user.username,
      nama: user.nama,
      email: user.email,
    }
  }

  async editUser(body: EditProfile, id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    const data = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username: body.username || user.username,
        nama: body.nama || user.nama,
        email: body.email || user.email,
      },
    })
    console.log(data)

    return data
  }
}
