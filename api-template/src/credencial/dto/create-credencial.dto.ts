import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateCredencialDto {

    @Transform(({ value }) => value.trim().toLowerCase())
    @IsEmail({}, { message: 'O e-mail deve ser um endereço de e-mail' })
    @IsNotEmpty({ message: 'O e-mail não pode ser vazio' })
    email: string;

    @IsNotEmpty({ message: 'A senha não pode ser vazia' })
    // @IsStrongPassword(
    //     {
    //         minLength: 6,
    //         // minLowercase: 1,
    //         // minUppercase: 1,
    //         // minNumbers: 1,
    //         // minSymbols: 1
    //     },
    //     // { message: 'A senha deve conter pelo menos 6 caracteres, uma letra maiúscula, uma letra minuscula, um número e um caractere especial' }
    //     { message: '6 caracteres parsero' }
    // )
    senha: string;
}
