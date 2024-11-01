import { forwardRef, Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Credencial } from 'src/credencial/entities/credencial.entity';
import { PagamentoModule } from 'src/pagamento/pagamento.module';
import { Assinatura } from 'src/assinatura/entities/assinatura.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Credencial,
      Assinatura
    ]),
    forwardRef(
      () => PagamentoModule
    )
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService]
})
export class UsuarioModule { }
