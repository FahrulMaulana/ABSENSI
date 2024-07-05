import { Injectable } from '@nestjs/common'

@Injectable()
export class helloservice {
  hello() {
    return 'Hello World!'
  }
}
