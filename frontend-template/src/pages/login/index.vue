<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card>
                    <v-card-title>
                        <h2>Login</h2>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" @submit.prevent="handleSubmit" v-model="formValid">
                            <v-text-field v-model="credentials.name" label="Nome" :rules="[rules.required]" required
                                outlined></v-text-field>

                            <v-text-field v-model="credentials.password" label="Senha"
                                :rules="[rules.required, rules.minLength]" type="password" required
                                outlined></v-text-field>

                            <v-btn :disabled="!formValid" color="primary" type="submit">Login</v-btn>
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

export default {
    data() {
        return {
            credentials: {
                name: '',
                password: '',
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
                    name: { required },
                    password: { required, minLength: minLength(6) },
                },
            };
        },
        handleSubmit() {
            this.v$.$touch(); // Toca todos os campos para mostrar erros se existirem
            if (this.v$.$invalid) return; // Se o formulário é inválido, retorna

            // Aqui você pode adicionar a lógica para enviar os dados de login
            console.log('Credenciais:', this.credentials);
            // Exemplo de chamada de API para login
            // this.login(this.credentials);
        },
    },
    watch: {
        credentials: {
            handler() {
                this.formValid = !this.v$.$invalid; // Atualiza a validade do formulário com base na validação
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
.v-card {
    margin-top: 50px;
}
</style>
