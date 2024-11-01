import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth';
import axios from 'axios'


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,

})
console.log('Base URL:', import.meta.env.VITE_API_URL); // Adicione este log

// Interceptor para requisição
api.interceptors.request.use(config => {
    const appStore = useAppStore()
    const authStore = useAuthStore()
    const token = authStore.accessToken

    console.log('Token:', token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    console.log('base.url:', config.baseURL)
    appStore.setCarregando(true) // Define carregando como true ao iniciar a requisição
    return config
})

// Interceptor para resposta
api.interceptors.response.use(response => {
    const appStore = useAppStore()

    appStore.setCarregando(false) // Define carregando como false ao receber a resposta
    return response
}, error => {
    const appStore = useAppStore()

    appStore.setCarregando(false) // Define carregando como false ao receber um erro
    return Promise.reject(error)
})

export default api
