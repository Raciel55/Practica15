import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [

      ConfigModule.forRoot(),
      PassportModule,


      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '8h' },
        }),
      }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
  exports: [AuthService, JwtModule], // 👈 importante si lo usas en otros módulos
})
export class AuthModule { }