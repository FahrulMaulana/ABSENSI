import { Controller, Get } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiBearerAuth } from 'src/common/decorators/ApiBearerAuth'
import { User } from 'src/common/decorators/User'
import { ERole } from 'src/common/enums/ERole'
import { UserPayload } from 'src/common/interfaces/Userpayload'
import { ResponDTO } from 'src/dto/respon.dto'
import { AbsensiService } from 'src/services/absensi.service'

@ApiTags('Absensi')
@Controller('/api/absensi/')
export class AbsensiController {
  constructor(private absenn: AbsensiService) {}

  @ApiBearerAuth([ERole.SU])
  @ApiResponse({ type: ResponDTO })
  @Get()
  async getabsen(@User() user: UserPayload) {
    const user_id = user.id
    const data = await this.absenn.linkAbsen(user_id)
    const res = new ResponDTO()
    res.message = ' absen berhasil '
    return res
  }
}
