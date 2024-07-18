import { Controller, Get, Param, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiBearerAuth } from 'src/common/decorators/ApiBearerAuth'
import { User } from 'src/common/decorators/User'
import { ERole } from 'src/common/enums/ERole'
import { UserPayload } from 'src/common/interfaces/Userpayload'
import { generateDTO } from 'src/dto/absensi.dto'
import { ResponDTO } from 'src/dto/respon.dto'
import { AbsensiService } from 'src/services/absensi.service'

@ApiTags('Absensi')
@Controller('/api/absensi/')
export class AbsensiController {
  constructor(private absenn: AbsensiService) {}

  // @ApiBearerAuth([ERole.SU])
  @ApiResponse({ type: generateDTO })
  @Post()
  async generate() {
    const data = await this.absenn.generateLink()
    const res = new ResponDTO()
    return data
  }

  @ApiBearerAuth([ERole.SU])
  @ApiResponse({ type: ResponDTO })
  @Get('/:id')
  async getabsenId(@Param('id') id: string, @User() user: UserPayload) {
    console.log(5)

    const user_id = user.id
    const data = await this.absenn.linkAbsen(id, user_id)
    const res = new ResponDTO()
    res.message = ' absen berhasil '
    return res
  }

  @ApiBearerAuth([ERole.SU])
  @Get('/list/absen')
  async getAbsen() {
    console.log(1)

    const data = await this.absenn.getdata()
    return data
  }
}
