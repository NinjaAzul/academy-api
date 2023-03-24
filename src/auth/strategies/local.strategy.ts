import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

//Auth Entity
import { AuthService } from '../auth.service';

//Libraries
import { compare } from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {
    super({
      usernameField: 'user',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({
      user: username,
      password: password,
    });

    if (!user) {
      throw new UnauthorizedException('Username or password incorrect');
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Username or password incorrect');
    }

    delete user.password;

    const payload = { sub: user.id };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}
