import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('login() - accessToken 반환', async () => {
    const result = await service.login({
      email: 'test@wandookong.com',
      password: 'password',
    });
    expect(result.access_token).toBeDefined();
  });
});
