<template>
  <SnackbarToast />
  <v-overlay :model-value="carregando" class="align-center justify-center" persistent>
    <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
  </v-overlay>
  <v-app v-if="!autenticado && !cadastro">
    <Login />
  </v-app>
  <v-app v-else-if="!pago && !cadastro">
    <Plano />
  </v-app>
  <v-app v-else>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { useAppStore } from './stores/app';
import { useAuthStore } from './stores/auth';

export default {
  name: 'App',
  data() {
    return {
      appStore: useAppStore(),
      authStore: useAuthStore()
    }
  },
  computed: {
    carregando() {
      return this.appStore.carregando
    },
    pago() {
      return this.authStore.pago
    },
    autenticado() {
      return this.authStore.autenticado
    },
    cadastro() {
      const route = this.$route.name
      console.log(route);
      return route === '/cadastro/'
    },
    sucesso() {
      return this.$route.path === '/sucesso'; // Verificando se a rota atual é /sucesso
    }
  },
  watch: {
    '$route'(to) {
      // Verifica se a nova rota é /sucesso
      if (to.path === '/sucesso' && this.autenticado) {
        console.log('Redirecionando para o login após logout...');
        this.authStore.logout(); // Logout do usuário
        this.$router.push('/'); // Redireciona para a página de login
      } if (to.path === '/cadastro' && !this.autenticado) {
        console.log('Redirecionando para o login após cadastro...');
        this.cadastro = true
      }
    }
  },
  beforeMount() {
    console.log(this.$route.fullPath);
    console.log('beforeMount', this.sucesso, this.autenticado);
    console.log(this.authStore.accessToken);
    this.authStore.validarToken()
  }
}
</script>
