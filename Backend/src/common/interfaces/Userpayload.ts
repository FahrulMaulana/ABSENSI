import { Expose } from 'class-transformer'
import { IsEmail } from 'class-validator'

export class UserPayload {
  @Expose()
  id: string

  @Expose()
  id_role: string | null

  @Expose()
  username: string

  @Expose()
  nama: string

  @Expose()
  @IsEmail()
  email: string

  constructor(data: UserPayload) {
    Object.assign(this, data)
  }
}
