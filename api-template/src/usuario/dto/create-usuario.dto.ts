import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateCredencialDto } from "src/credencial/dto/create-credencial.dto";

export class CreateUsuarioDto {

    @Transform(({ value }) => value.trim().toUpperCase())
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    @IsString({ message: 'O nome deve ser uma string' })
    nome: string;

    @ValidateNested({ each: true })
    @Type(() => CreateCredencialDto)
    credencial: CreateCredencialDto;
}
