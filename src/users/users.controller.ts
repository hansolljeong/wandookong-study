import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  AuthUser,
  AuthUserType,
} from 'src/common/decorators/auth-user.decorator';
import { UsersMeResponseDto } from './dto/user-me.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async getMe(@AuthUser() authUser: AuthUserType): Promise<UsersMeResponseDto> {
    return this.usersService.getMe(authUser);
  }
}
