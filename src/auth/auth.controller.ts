import { Controller } from '@nestjs/common';
import { Post, Req, UseGuards } from '@nestjs/common/decorators';


//Guards
import { LocalAuthGuard } from 'src/@shared/guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async authenticated(@Req() req: any) {
    return req.user;
  }
}
