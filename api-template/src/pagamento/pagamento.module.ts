import { forwardRef, Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { StripeHandlerService } from './stripe.service';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    StripeModule.forRootAsync(StripeModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('STRIPE_CONFIG'),
      inject: [ConfigService],
    }),
    forwardRef(() => UsuarioModule),

  ],
  controllers: [PagamentoController],
  providers: [PagamentoService, StripeHandlerService],
  exports: [PagamentoService, StripeHandlerService],
})
export class PagamentoModule { }
