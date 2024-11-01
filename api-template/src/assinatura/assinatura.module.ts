import { Module } from '@nestjs/common';
import { AssinaturaService } from './assinatura.service';
import { AssinaturaController } from './assinatura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assinatura } from './entities/assinatura.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Assinatura
    ])
  ],
  controllers: [AssinaturaController],
  providers: [AssinaturaService],
})
export class AssinaturaModule { }
