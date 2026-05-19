import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, BadRequestException, HttpCode, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);

      return {
        success: true,
        message: "Usuario creado",
        user,
      };

    } catch (error) {
      if (error.message === "USER_EXISTS") {
        throw new ConflictException("El usuario ya existe");
      }

      throw new BadRequestException("Error al crear usuario");
    }
  }


  @Post('login')
  @HttpCode(200)
  async login(@Body() body: { name: string; password: string }) {
    const user = await this.usersService.validateUser(
      body.name,
      body.password,
    );

    return {
      success: true,
      message: 'Login exitoso',
      user,
    };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
