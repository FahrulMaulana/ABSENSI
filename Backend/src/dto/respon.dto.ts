import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class ResponDTO {
  @Expose()
  @ApiProperty()
  message: string
}
