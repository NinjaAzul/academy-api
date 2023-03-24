import { Injectable } from '@nestjs/common';

//Users Entity
import { UsersService } from '../users/users.service';

//Types
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(data: AuthDto) {
    return await this.usersService.validateUser(data);
  }
}
