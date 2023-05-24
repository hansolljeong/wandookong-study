import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.gaurd';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  async signIn(@Body() { email, password }) {
    return this.authService.signIn({ email, password });
  }

  @Post('/test')
  @UseGuards(AuthGuard)
  async authTest() {
    return;
  }
}
