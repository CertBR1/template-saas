import { HttpException, Injectable } from '@nestjs/common';
import { CreateCredencialDto } from './dto/create-credencial.dto';
import { UpdateCredencialDto } from './dto/update-credencial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Credencial } from './entities/credencial.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CredencialService {
  constructor(
    @InjectRepository(Credencial)
    private credencialRepository: Repository<Credencial>
  ) { }
  create(createCredencialDto: CreateCredencialDto) {
    return 'This action adds a new credencial';
  }

  async findByEmail(email: string) {
    try {
      return await this.credencialRepository.findOne({ where: { email }, relations: { usuario: { assinatura: true } } });
    } catch (error) {
      console.error(error);
      throw new HttpException('Erro ao buscar credencial', 500);
    }
  }

  findAll() {
    return `This action returns all credencial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} credencial`;
  }

  update(id: number, updateCredencialDto: UpdateCredencialDto) {
    return `This action updates a #${id} credencial`;
  }

  remove(id: number) {
    return `This action removes a #${id} credencial`;
  }
}
