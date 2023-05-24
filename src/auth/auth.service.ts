import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async signIn({ email, password }) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new UnauthorizedException('사용자를 찾을 수 없습니다.');

    // @TODO: password hash
    if (user.password !== password)
      throw new UnauthorizedException('잘못된 password 입니다.');

    const payload = { userId: user.id, secret: process.env.JWT_SECRET };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
