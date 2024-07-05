import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { helloservice } from 'src/services/Hello.service'

@ApiTags('Hello')
@Controller('/api')
export class hellocontroler {
  constructor(private heloservice: helloservice) {}

  @Get('/hello')
  async hellocontroller() {
    const data = await this.heloservice.hello()
    return data
  }
}
