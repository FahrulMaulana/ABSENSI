import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { plainToInstance } from 'class-transformer'
import { ApiBearerAuth } from 'src/common/decorators/ApiBearerAuth'
import { User } from 'src/common/decorators/User'
import { ERole } from 'src/common/enums/ERole'
import { UserPayload } from 'src/common/interfaces/Userpayload'
import { ResponDTO } from 'src/dto/respon.dto'
import { CreateUserDTO, GetUserDTO } from 'src/dto/user.dto'
import { userService } from 'src/services/user.service'

@ApiTags('User')
@Controller('/api')
export class userController {
  constructor(private user: userService) {}

  @ApiResponse({ type: ResponDTO })
  @Post('/user')
  async postuser(@Body() body: CreateUserDTO) {
    const data = await this.user.tambahUser(body)
    const res = new ResponDTO()
    res.message = 'data berhasil ditambah'
    return res
  }

  @ApiBearerAuth([ERole.SU])
  @ApiResponse({ type: GetUserDTO })
  @Get('/user')
  async getuser(@User() user: UserPayload) {
    console.log(user)

    const data = await this.user.lihatuser()
    return plainToInstance(GetUserDTO, data)
  }
}
