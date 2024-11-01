import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity({ name: 'assinaturas' })
export class Assinatura {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    status: boolean

    @Column()
    stripeId: string

    @Column({ nullable: true, default: null, type: 'timestamp' })
    dataInicio: Date; // Alterado para Date

    @Column({ nullable: true, default: null, type: 'timestamp' })
    dataFim: Date; // Alterado para Date

    @OneToOne(() => Usuario, (usuario) => usuario.assinatura)
    @JoinColumn()
    usuario: Usuario
}
