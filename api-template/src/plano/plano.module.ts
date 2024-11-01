import { Module } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { PlanoController } from './plano.controller';
import { PagamentoModule } from 'src/pagamento/pagamento.module';

@Module({
  imports: [PagamentoModule],
  controllers: [PlanoController],
  providers: [PlanoService],
})
export class PlanoModule { }
