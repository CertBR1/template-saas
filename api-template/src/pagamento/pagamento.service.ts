import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { StripeHandlerService } from './stripe.service';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class PagamentoService {
  constructor(
    private stripeHandlerService: StripeHandlerService,
    @Inject(forwardRef(() => UsuarioService))
    private usuarioService: UsuarioService
  ) { }
  async create(createPagamentoDto: CreatePagamentoDto, id: string) {
    try {
      const usuario = await this.usuarioService.findOne(id)
      console.log('usuario:', usuario);
      const checkout = this.stripeHandlerService.criarSessaoCheckout(createPagamentoDto.priceId, usuario.assinatura.stripeId)
      return checkout
    } catch (error) {
      console.error(error);
      throw new HttpException('Erro ao criar pagamento', 500);
    }
  }

  async findAll() {
    try {
      const prices = await this.stripeHandlerService.buscarPlanos()
      return prices
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} pagamento`;
  }

  update(id: number, updatePagamentoDto: UpdatePagamentoDto) {
    return `This action updates a #${id} pagamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} pagamento`;
  }
}
