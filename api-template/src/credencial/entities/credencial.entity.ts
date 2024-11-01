import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'credenciais' })
export class Credencial {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    email: string

    @Column()
    senha: string

    @OneToOne(() => Usuario, (user) => user.credencial)
    usuario: Usuario;

}
