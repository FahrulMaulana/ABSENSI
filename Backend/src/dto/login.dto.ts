import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { UserPayload } from 'src/common/interfaces/Userpayload'

export class LoginDTO {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  username: string

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  password: string
}

export class LoginData {
  @Expose()
  @ApiProperty()
  token: string

  @Expose()
  @ApiProperty()
  userPayload?: UserPayload
}
