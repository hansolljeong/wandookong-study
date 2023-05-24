import { UserEntity } from 'src/users/entities/user.entity';

export class UsersMeResponseDto {
  email: string;
  nickname: string;
  status: number;

  constructor(user: UserEntity) {
    this.email = user.email;
    this.nickname = user.nickname;
    this.status = user.status;
  }
}
