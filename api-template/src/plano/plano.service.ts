import { HttpException, Injectable } from '@nestjs/common';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { StripeHandlerService } from 'src/pagamento/stripe.service';

@Injectable()
export class PlanoService {
  constructor(
    private readonly stripeHandlerService: StripeHandlerService
  ) { }
  create(createPlanoDto: CreatePlanoDto) {
    return 'This action adds a new plano';
  }

  async findAll() {
    try {
      const planos = await this.stripeHandlerService.buscarPlanos();
      return planos.data
    } catch (error) {
      console.error(error);
      throw new HttpException('Erro ao buscar planos', 500);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} plano`;
  }

  update(id: number, updatePlanoDto: UpdatePlanoDto) {
    return `This action updates a #${id} plano`;
  }

  remove(id: number) {
    return `This action removes a #${id} plano`;
  }
}
