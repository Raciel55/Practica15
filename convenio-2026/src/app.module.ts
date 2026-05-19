import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EmpresasModule } from './empresas/empresas.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({isGlobal: true}), AuthModule, EmpresasModule]
})
export class AppModule {
  
}