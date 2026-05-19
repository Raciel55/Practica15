import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: { name: string; password: string }) {
    const { name, password } = createUserDto;

    const userExists = await this.prisma.user.findUnique({
      where: { name },
    });

    if (userExists) {
      throw new ConflictException('El usuario ya existe');
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
    });

    return user;
  }


  async validateUser(name: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { name },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // 🔐 COMPARAR
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
