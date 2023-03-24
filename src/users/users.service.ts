import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

//Repository
import { UsersRepository } from './users.repository';

//Types
import { User } from '@prisma/client';
import { UserCreateDto } from './dto/user.create.dto';
import { AuthDto } from 'src/auth/dto/auth.dto';

//Libraries
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async create(data: UserCreateDto) {
    const user = await this.usersRepository.findByName(data.user);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return await this.usersRepository.create({
      ...data,
      password: await hash(data.password, 10),
    });
  }

  async update(id: string, data: User) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.usersRepository.update(id, data);
  }

  async delete(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.delete(id);

    return user;
  }

  async validateUser(data: AuthDto) {
    return await this.usersRepository.validateUser({
      user: data.user,
      password: await hash(data.password, 10),
    });
  }
}
