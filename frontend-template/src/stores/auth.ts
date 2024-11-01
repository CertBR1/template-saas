import { defineStore } from 'pinia'
import api from '@/util/axios'
import { showToast } from '@/main'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        autenticado: false,
        pago: false,
        accessToken: null
    }),
    actions: {
        async login(email: string, senha: string) {
            try {
                console.log('Login:', email, senha);
                const { data } = await api.post('/auth/login', {
                    email,
                    senha
                })
                if (data.access_token) {
                    this.autenticado = true
                    this.accessToken = data.access_token
                    this.pago = data.statusAssinatura
                }
                return data
            } catch (error) {
                console.error(error);
                console.log('Erro response data:', error.response.data.message);
                if (error.response.data.message) {
                    showToast(error.response.data.message, 'error');
                }
                throw error;

            }
        },
        async logout() {
            this.autenticado = false
            this.accessToken = null
        },
        async validarToken() {
            if (this.accessToken) {
                try {
                    console.log('Validando token...');
                    const { data } = await api.post('/auth/validar-token', {
                        access_token: this.accessToken
                    },)
                    if (data.valido) {
                        console.log('Token valido:', data);
                        this.autenticado = true
                        this.pago = data.statusAssinatura
                    } else {
                        this.logout()
                    }
                } catch (error) {
                    console.error(error);
                    this.logout()
                    console.log('Erro response data:', error.response.data.message);
                    if (error.response.data.message) {
                        showToast(error.response.data.message, 'error');
                    }
                    throw error;
                }
            }
        }
    },
    persist: {
        storage: localStorage,
    }
})