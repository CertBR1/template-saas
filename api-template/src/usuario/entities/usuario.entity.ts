import { Assinatura } from "src/assinatura/entities/assinatura.entity";
import { Credencial } from "src/credencial/entities/credencial.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuarios' })
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @OneToOne(() => Assinatura, (assinatura) => assinatura.usuario)
    assinatura: Assinatura

    @OneToOne(() => Credencial, (credencial) => credencial.usuario)
    @JoinColumn()
    credencial: Credencial
}
