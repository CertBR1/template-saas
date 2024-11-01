<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <!-- Espaço para a logo ou imagem no topo -->
            <v-col cols="12" class="text-center mb-6">
                <v-img src="" max-width="200" alt="Logo" />
            </v-col>

            <v-col cols="12" sm="8" md="4">
                <v-card class="mx-auto" max-width="344">
                    <v-card-title class="text-center">
                        <h2>Cadastro</h2>
                    </v-card-title>

                    <v-card-subtitle class="text-center">
                        <p>Preencha os campos para criar sua conta</p>
                    </v-card-subtitle>

                    <v-card-text>
                        <v-form ref="form" @submit.prevent="handleSubmit" v-model="formValido">
                            <v-text-field v-model="usuario.nome" label="Nome" :rules="[regras.obrigatorio]" required
                                outlined class="mb-4" color="primary" />

                            <v-text-field v-model="usuario.email" label="E-mail"
                                :rules="[regras.obrigatorio, regras.email]" required outlined class="mb-4"
                                color="primary" />

                            <v-text-field v-model="usuario.senha" label="Senha"
                                :rules="[regras.obrigatorio, regras.minimoCaracteres]" type="password" required outlined
                                class="mb-4" color="primary" />

                            <v-text-field v-model="usuario.confirmarSenha" label="Confirme a Senha"
                                :rules="[regras.obrigatorio, regras.minimoCaracteres, regraConfirmacaoSenha]"
                                type="password" required outlined class="mb-6" color="primary" />

                            <v-btn :disabled="!formValido" color="primary" type="submit" block>
                                Cadastrar
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { required, minLength, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useUsuarioStore } from '@/stores/usuario';

export default {
    data() {
        return {
            usuarioStore: useUsuarioStore(),
            usuario: {
                nome: '',
                email: '',
                senha: '',
                confirmarSenha: '',
            },
            regras: {
                obrigatorio: (value) => !!value || 'Campo obrigatório',
                minimoCaracteres: (value) => (value.length >= 6) || 'A senha deve ter pelo menos 6 caracteres',
                email: (value) => /.+@.+\..+/.test(value) || 'E-mail inválido',
            },
            formValido: false,
            v$: null, // Inicializa v$ como null
        };
    },

    computed: {
        regraConfirmacaoSenha() {
            return (value) => {
                return value === this.usuario.senha || 'As senhas não correspondem';
            };
        },
    },
    methods: {
        validations() {
            return {
                usuario: {
                    nome: { required },
                    email: { required, email },
                    senha: { required, minLength: minLength(6) },
                    confirmarSenha: { required, minLength: minLength(6) },
                },
            };
        },
        async handleSubmit() {
            this.v$.$touch(); // Toca todos os campos para mostrar erros se existirem
            if (this.v$.$invalid) return; // Se o formulário é inválido, retorna

            // Aqui você pode adicionar a lógica para enviar os dados de cadastro
            const payload = {
                nome: this.usuario.nome,
                credencial: {
                    email: this.usuario.email,
                    senha: this.usuario.senha,
                },
            };
            console.log('Dados do usuário:', payload);
            await this.usuarioStore.criarUsuario(payload);
        },
    },
    watch: {
        usuario: {
            handler() {
                this.formValido = !this.v$.$invalid; // Atualiza a validade do formulário com base na validação
            },
            deep: true,
        },
    },
    mounted() {
        // Inicializa o Vuelidate
        this.v$ = useVuelidate(this.validations(), this);
    },
};
</script>

<style scoped>
.v-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(45deg, #3F51B5, #82B1FF, #fff);
    background-size: 400% 400%;
    animation: gradientBackground 15s ease infinite;
}

@keyframes gradientBackground {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.v-card {
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 24px;
    border-radius: 16px;
}

.v-card-title h2 {
    font-weight: bold;
    margin: 0;
    font-size: 24px;
    color: #3F51B5;
}

.v-card-subtitle p {
    margin-top: 8px;
    font-size: 14px;
    color: #666;
}

/* Ajustes de margens e espaçamento */
.v-text-field {
    margin-bottom: 24px;
}

.v-btn {
    font-weight: bold;
    letter-spacing: 1px;
}

.v-btn.primary {
    background-color: #3F51B5;
    color: white;
}
</style>