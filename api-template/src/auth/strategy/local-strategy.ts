import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService
    ) {
        super({
            // Mudar o nome da propriedade username para usernameField ex:
            usernameField: 'email',
            // Mudar o nome da propriedade password para passwordField ex:
            passwordField: 'senha',
        });
    }

    async validate(email: string, senha: string): Promise<any> {
        const credencial = await this.authService.validarCredenciais(email, senha);
        if (!credencial) {
            throw new UnauthorizedException();
        }
        return credencial;
    }
}