import { Injectable } from '@nestjs/common';
import { AuthUserType } from 'src/common/decorators/auth-user.decorator';
import { UsersMeResponseDto } from './dto/user-me.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserByEmail(email: string) {
    return this.usersRepository.findOneByEmail(email);
  }

  async getMe({ userId }: AuthUserType): Promise<UsersMeResponseDto> {
    const user = await this.usersRepository.findOne(userId);

    return new UsersMeResponseDto(user);
  }
}
