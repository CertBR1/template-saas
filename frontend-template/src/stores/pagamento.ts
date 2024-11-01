import { showToast } from '@/main'
import api from '@/util/axios'
import { defineStore } from 'pinia'


export const usePagamentoStore = defineStore('pagamento', {

    state() {
        return {

        }
    },

    actions: {
        async criarPagamento(priceId: string) {
            try {
                const { data } = await api.post('/pagamento', { priceId })
                console.log("data:", data);
                return data
            } catch (error) {
                console.error(error);
                console.log('Erro response data:', error.response.data.message);
                if (error.response.data.message) {
                    showToast(error.response.data.message, 'error');
                }
                throw error;
            }
        }
    }
})