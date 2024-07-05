import { Body, Controller, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoginDTO, LoginData } from 'src/dto/login.dto'
import { LoginService } from 'src/services/login.service'

@ApiTags('Login')
@Controller('/login')
export class LoginController {
  constructor(private loginn: LoginService) {}

  @ApiResponse({ type: LoginData })
  @Post()
  async loginuser(@Body() body: LoginDTO) {
    const data = await this.loginn.login(body)
    return data
  }
}
