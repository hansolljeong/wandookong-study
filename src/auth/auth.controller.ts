import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.gaurd';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() { email, password }) {
    return this.authService.login({ email, password });
  }

  @Post('/test')
  @UseGuards(AuthGuard)
  async authTest() {
    return;
  }
}
