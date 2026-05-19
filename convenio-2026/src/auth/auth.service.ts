import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async login(name: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { name },
        });

        if (!user) throw new NotFoundException('Usuario no encontrado');

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

        const payload = {
            sub: user.id,
            name: user.name,
        };
        console.log('Payload:', payload); // Agrega este log para verificar el contenido del payload

        return {
            success: true,
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
