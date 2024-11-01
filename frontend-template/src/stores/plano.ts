import api from '@/util/axios'
import { defineStore } from 'pinia'


export const usePlanoStore = defineStore('plano', {
    state: () => ({}),
    actions: {
        async buscarPlanos() {
            try {
                const { data: planos } = await api.get('/plano')
                return planos
            } catch (error) {
                console.error(error)
                throw error
            }
        }
    }
})