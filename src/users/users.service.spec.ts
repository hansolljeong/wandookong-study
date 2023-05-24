import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users.module';
import { UserEntity } from './entities/user.entity';
import { DataSource } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let dataSource: DataSource;
  let user: UserEntity;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
            synchronize: true,
          }),
        }),
        UsersModule,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    dataSource = module.get<DataSource>(DataSource);
  });

  beforeEach(async () => {
    user = await dataSource.getRepository(UserEntity).save({
      email: 'test@wandookong.com',
      password: '123456',
      nickname: 'test',
    });

    it('getMe()', async () => {
      const result = await service.getMe({ userId: user.id });
      expect(result).toBeDefined();
    });
  });
});
