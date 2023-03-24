import { UseGuards } from '@nestjs/common/decorators';
import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  ParseUUIDPipe,
  Body,
  Req,
} from '@nestjs/common';

//Services
import { UsersService } from './users.service';

//Types
import { UserCreateDto } from './dto/user.create.dto';
import { User } from '@prisma/client';
import { IResponseJWT } from 'src/@shared/interfaces/responseJWT.interface';

//Decorators
import { Permissions } from 'src/@shared/decorators/permissions.decorator';
import { PermissionsGuard } from '../@shared/guards/permissions.guard';

@Controller('users')
@UseGuards(PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Permissions(['users-read'])
  @Get('/')
  findAll(@Req() req: IResponseJWT) {
    console.log(req.user);
    return this.usersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Permissions(['users-read'])
  @Post('/')
  create(@Body() data: UserCreateDto) {
    return this.usersService.create(data);
  }

  @Put('/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() data: User) {
    return this.usersService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }
}
