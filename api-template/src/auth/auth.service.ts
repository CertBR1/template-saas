import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredencialService } from 'src/credencial/credencial.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly credencialService: CredencialService
    ) { }


    async login(credencial: any) {
        console.log('Login:', credencial);
        const payload = { id: credencial.usuario.id, nome: credencial.usuario.nome, statusAssinatura: credencial.usuario.assinatura.status };
        console.log('payload:', payload);
        return {
            access_token: this.jwtService.sign(payload),
            statusAssinatura: credencial.usuario.assinatura.status
        };
    }

    async validarToken(access_token: string) {
        try {
            const valido = this.jwtService.verify(access_token, { ignoreExpiration: true }) ? true : false
            return {
                valido,
                statusAssinatura: this.jwtService.decode(access_token)['statusAssinatura']
            }
        } catch (error) {
            console.error(error);
            throw new HttpException('Token inválido', 401);
        }
    }

    async validarCredenciais(email: string, senha: string) {
        try {
            const credencial = await this.credencialService.findByEmail(email);
            if (credencial && await bcrypt.compare(senha, credencial.senha)) {
                return credencial;
            }
            throw new HttpException('Email ou senha incorretos', 401);
        } catch (error) {
            console.error(error);
            throw new HttpException('Email ou senha incorretos', 401);
        }
    }
}
