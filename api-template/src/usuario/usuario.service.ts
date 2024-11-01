import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { DataSource, Repository, Timestamp } from 'typeorm';
import { Credencial } from 'src/credencial/entities/credencial.entity';
import * as bcrypt from 'bcrypt';
import { StripeHandlerService } from 'src/pagamento/stripe.service';
import { Assinatura } from 'src/assinatura/entities/assinatura.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Credencial)
    private credencialRepository: Repository<Credencial>,
    @InjectRepository(Assinatura)
    private assinaturaRepository: Repository<Assinatura>,
    @Inject(forwardRef(() => StripeHandlerService))
    private stripeHandlerService: StripeHandlerService,
    private dataSource: DataSource
  ) { }
  async create(createUsuarioDto: CreateUsuarioDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      const { credencial, ...usuarioData } = createUsuarioDto;
      console.log('createUsuarioDto:', createUsuarioDto);
      console.log('credencial:', credencial);
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const usuarioCriado = await queryRunner.manager.create(Usuario, usuarioData);
      await queryRunner.manager.save(usuarioCriado);
      const credencialCriada = await queryRunner.manager.create(Credencial, {
        email: credencial.email,
        senha: await bcrypt.hash(credencial.senha, 10),
        usuario: usuarioCriado
      });
      const stripeCustomer = await this.stripeHandlerService.criarUsuarioStripe(
        {
          id: usuarioCriado.id,
          nome: usuarioCriado.nome,
          email: credencialCriada.email
        }
      );
      const assinaturaCriada = await queryRunner.manager.create(Assinatura, {
        status: false,
        stripeId: stripeCustomer.id,
        usuario: usuarioCriado
      })
      await queryRunner.manager.save(assinaturaCriada);
      await queryRunner.manager.save(credencialCriada);
      await queryRunner.manager.save(usuarioCriado);
      await queryRunner.commitTransaction();
      return usuarioCriado;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException('Erro ao criar usuário', 500);
    } finally {
      await queryRunner.release();
    }
  }

  async ativarAssinatura(id: string, peridoInicial: number, peridoFinal: number) {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id },
        relations: {
          assinatura: true
        }
      })
      if (!usuario) throw new HttpException('Usuário não encontrado', 404)

      const assinatura = await this.assinaturaRepository.findOne({
        where: { id: usuario.assinatura.id },
      })
      assinatura.status = true
      assinatura.dataInicio = new Date((peridoInicial * 1000))
      assinatura.dataFim = new Date(peridoFinal * 1000)
      await this.assinaturaRepository.save(assinatura)
      return assinatura
    } catch (error) {
      console.error(error);
      throw new HttpException('Erro ao buscar usuário', 500);
    }
  }

  async cancelarAssinatura(id: string) {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id },
        relations: {
          assinatura: true
        }
      })
      if (!usuario) throw new HttpException('Usuário não encontrado', 404)

      const assinatura = await this.assinaturaRepository.findOne({
        where: { id: usuario.assinatura.id },
      })
      assinatura.status = false
      assinatura.dataFim = null
      assinatura.dataInicio = null
      await this.assinaturaRepository.save(assinatura)
      return assinatura
    } catch (error) {
      console.error(error);
      throw new HttpException('Erro ao buscar usuário', 500);
    }
  }

  findAll() {
    return `This action returns all usuario`;
  }

  findOne(id: string) {
    try {
      const usuario = this.usuarioRepository.findOne({
        where: { id },
        relations: {
          credencial: true,
          assinatura: true
        }
      })
      if (!usuario) throw new HttpException('Usuário não encontrado', 404)
      return usuario
    } catch (error) {
      console.error(error);
      throw new HttpException('Erro ao buscar usuário', 500);
    }
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
