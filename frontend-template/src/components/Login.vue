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
                        <h2>Login</h2>
                    </v-card-title>

                    <v-card-subtitle class="text-center">
                        <p>Entre com suas credenciais</p>
                    </v-card-subtitle>

                    <v-card-text>
                        <v-form ref="form" @submit.prevent="handleSubmit" v-model="formValid">
                            <v-text-field v-model="credentials.nome" label="Nome" :rules="[rules.required]" required
                                outlined class="mb-4" />

                            <v-text-field v-model="credentials.senha" label="Senha"
                                :rules="[rules.required, rules.minLength]" type="password" required outlined
                                class="mb-6" />

                            <v-row class="w-100">
                                <v-col cols="6">
                                    <v-btn :disabled="!formValid" color="primary" type="submit" block>
                                        Login
                                    </v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn color="secondary" router to="/cadastro" block>
                                        Cadastrar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { required, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useAuthStore } from '@/stores/auth'; // Certifique-se de que o caminho está correto

export default {
    data() {
        return {
            authStore: useAuthStore(),

            credentials: {
                nome: '',
                senha: '',
            },
            rules: {
                required: (value) => !!value || 'Campo obrigatório',
                minLength: (value) => (value.length >= 6) || 'A senha deve ter pelo menos 6 caracteres',
            },
            formValid: false,
            v$: null, // Inicializa v$ como null
        };
    },

    methods: {
        validations() {
            return {
                credentials: {
                    nome: { required },
                    senha: { required, minLength: minLength(6) },
                },
            };
        },
        async handleSubmit() {
            this.v$.$touch(); // Toca todos os campos para mostrar erros se existirem
            if (this.v$.$invalid) return; // Se o formulário é inválido, retorna

            try {
                // Aqui você pode adicionar a lógica para enviar os dados de login
                const payload = await this.authStore.login(this.credentials.nome, this.credentials.senha);
                console.log('Login bem-sucedido:', payload);
                // Você pode redirecionar o usuário ou realizar outra ação após o login
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                // Você pode exibir uma mensagem de erro ao usuário
            }
        },
    },
    watch: {
        credentials: {
            handler() {
                this.formValid = !this.v$.$invalid; // Atualiza a validade do formulário com base na validação
            },
            deep: true, // Isso garante que o watcher funcione em profundidade
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
    /* Cria a animação */
    animation: gradientBackground 15s ease infinite;
    /* Animação suave */
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
    /* Fundo translúcido no card */
    backdrop-filter: blur(10px);
    /* Efeito de blur no fundo do card */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #3F51B5;
    /* Usar o azul principal nos títulos */
}
</style>