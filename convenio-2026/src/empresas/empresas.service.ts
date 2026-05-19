import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmpresasService {
  constructor(private prisma: PrismaService) { }

  async create(createEmpresaDto: CreateEmpresaDto) {
    const { name, representante, userId } = createEmpresaDto;

    try {
      const empresaExistente = await this.prisma.empresa.findUnique({
        where: { name },
      });

      if (empresaExistente) {
        throw new ConflictException('La empresa ya existe');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      return await this.prisma.empresa.create({
        data: {
          name,
          representante,
          user: {
            connect: { id: userId },
          },
        },
      });

    } catch (error: any) {

      if (error.code === 'P2002') {
        throw new ConflictException('La empresa ya existe');
      }

      if (error.code === 'P2025') {
        throw new NotFoundException('Usuario no encontrado');
      }

      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Error al crear la empresa');
    }
  }

  findAll() {
    return this.prisma.empresa.findMany();
  }
  findOne(id: string) {
    return this.prisma.empresa.findUnique({
      where: { id },
    });
  }

  update(id: string, updateEmpresaDto: UpdateEmpresaDto) {
    return this.prisma.empresa.update({
      where: { id },
      data: updateEmpresaDto,
    });
  }

  remove(id: string) {
    return this.prisma.empresa.delete({
      where: { id },
    });
  }
}
