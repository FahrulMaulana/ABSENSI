import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'

export class generateDTO {
  @Expose()
  @ApiProperty()
  @Type(() => Date)
  akhir: Date
}
