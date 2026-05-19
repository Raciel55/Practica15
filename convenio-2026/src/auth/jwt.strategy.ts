import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: (req) => {
        console.log("HEADERS:", req.headers);
        return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      },
      secretOrKey: config.get<string>('JWT_SECRET'), // ✅ MISMO SECRET
    });
  }

  async validate(payload: any) {
    console.log('Payload:', payload);
    return payload;
  }
}