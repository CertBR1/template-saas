import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { Publico } from 'src/util/decorator/publico.decorator';

@Controller('pagamento')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) { }

  @Post()
  create(@Body() createPagamentoDto: CreatePagamentoDto, @Request() req) {
    const id = req.user.id;
    console.log('Usuario Request', req.user);
    return this.pagamentoService.create(createPagamentoDto, id);
  }

  @Publico()
  @Get()
  findAll() {
    return this.pagamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagamentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagamentoDto: UpdatePagamentoDto) {
    return this.pagamentoService.update(+id, updatePagamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagamentoService.remove(+id);
  }
}
