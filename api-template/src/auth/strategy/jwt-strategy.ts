
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        // { id: credencial.usuario.id, nome: credencial.usuario.nome, statusAssinatura: credencial.usuario.assinatura.status }
        return { id: payload.id, nome: payload.nome, statusAssinatura: payload.statusAssinatura };
    }
}
