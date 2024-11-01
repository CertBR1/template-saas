// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    carregando: false
  }),

  actions: {
    setCarregando(value: boolean) {
      this.carregando = value
    }
  }
})
