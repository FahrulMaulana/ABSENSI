import { Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { PrismaService } from './prisma.service'

@Injectable()
export class AbsensiService {
  constructor(private prisma: PrismaService) {}

  async linkAbsen(user_id: string) {
    const data = await this.prisma.absen.create({
      data: {
        id: uuidv4(),
        id_user: user_id,
      },
    })
    return data
  }
}
