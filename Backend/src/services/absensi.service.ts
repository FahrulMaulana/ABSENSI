import { BadGatewayException, Injectable } from '@nestjs/common'
import * as QRCode from 'qrcode'
import { v4 as uuidv4 } from 'uuid'
import { PrismaService } from './prisma.service'

@Injectable()
export class AbsensiService {
  constructor(private prisma: PrismaService) {}

  async generateLink() {
    const id_link = uuidv4().slice(0, 5)
    const now = new Date()
    const akhir = new Date(now.getTime() + 2 * 60 * 60 * 1000)
    const cek = await this.prisma.link_absen.findFirst({
      where: {
        awal: {
          lte: now,
        },
        akhir: {
          gte: now,
        },
      },
    })

    if (cek) {
      throw new BadGatewayException('masih ada link aktif')
    }
    const data = await this.prisma.link_absen.create({
      data: {
        id: id_link,
        link: `http://localhost:5000/api/absensi/${id_link}`,
        akhir,
      },
    })
    const qrCode = await QRCode.toDataURL(data.link, {
      errorCorrectionLevel: 'L', // Gunakan level koreksi paling rendah
      scale: 1,
      qzone: 0,
      mask: 7,
    })
    return qrCode
  }

  async linkAbsen(id: string, user_id: string) {
    const cek = await this.prisma.link_absen.findFirst({
      where: {
        id,
      },
    })

    if (!cek) {
      throw new BadGatewayException('QR code tidak valid')
    }

    const cekAbsen = await this.prisma.absen.findFirst({
      where: {
        id_link: id,
      },
    })

    if (cekAbsen) {
      throw new BadGatewayException('Kamu telah absen')
    }

    const now = new Date()

    if (now < cek.awal || now > cek.akhir) {
      throw new BadGatewayException('QR code telah kadaluarsa')
    }

    const data = await this.prisma.absen.create({
      data: {
        id: uuidv4(),
        id_user: user_id,
        id_link: cek.id,
      },
    })
    return data
  }

  async getdata() {
    const now = new Date()
    const sekarang = now.getFullYear()
    const sekarangg = (now.getMonth() + 1).toString().padStart(2, '0')
    const sekaranggg = now.getDate()
    const b = `${sekarang}-${sekarangg}-${sekaranggg}`
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2)
    console.log(startOfDay)
    console.log(endOfDay)

    const data = await this.prisma.absen.findMany({
      where: {
        absen_at: {
          gt: startOfDay,
          lt: endOfDay,
        },
      },
      select: {
        absen_at: true,
        user: {
          select: {
            nama: true,
            username: true,
          },
        },
        link_absen: {
          select: {
            link: true,
          },
        },
      },
    })
    return data
  }
}
