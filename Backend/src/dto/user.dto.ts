import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsEmail, IsString } from 'class-validator'
import { UUID } from 'crypto'
import { ERole } from 'src/common/enums/ERole'

// DTO untuk POST (pembuatan pengguna)
export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  password: string

  @ApiProperty()
  @IsString()
  nama: string

  @ApiProperty()
  @IsEmail()
  email: string
}

// DTO untuk GET (pengambilan data pengguna)
export class GetUserDTO {
  @Expose()
  @ApiProperty()
  id: UUID

  @Expose()
  @ApiProperty()
  role: ERole

  @Expose()
  @ApiProperty({ description: 'Nama pengguna untuk login' })
  @IsString()
  username: string

  @Expose()
  @ApiProperty()
  @IsString()
  nama: string

  @Expose()
  @ApiProperty()
  @IsEmail()
  email: string
}
