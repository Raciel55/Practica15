import { Module } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EmpresasController],
  providers: [EmpresasService, PrismaService],
  imports: [AuthModule],
})
export class EmpresasModule {}
