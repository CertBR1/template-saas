import { defineStore } from 'pinia'
import api from '@/util/axios'
import { showToast } from '@/main'

export const useUsuarioStore = defineStore('usuario', {
    state: () => {
        return {
        }
    },
    actions: {
        async criarUsuario(criarUsuario: {
            nome: string,
            credencial: {
                email: string,
                senha: string
            }
        }) {
            try {
                console.log(criarUsuario);
                const { data } = await api.post('/usuario', criarUsuario);
                return data;
            } catch (error) {
                console.error(error);
                console.log('Erro response:', error.response);
                if (error.response.data.message) {
                    showToast(error.response.data.message.toString(), 'error');
                }
                throw error;
            }
        }
    }
})