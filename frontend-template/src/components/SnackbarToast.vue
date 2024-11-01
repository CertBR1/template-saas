<!-- src/components/SnackbarToast.vue -->
<template>
    <v-snackbar v-model="visible" :color="toast.color" :timeout="3000" @close="visible = false">
        {{ toast.message }}
        <template #action>
            <v-btn color="white" text @click="visible = false">Fechar</v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue';

export default {
    setup() {
        const visible = ref(false);
        const toast = ref({ message: '', color: 'success' });

        const { appContext } = getCurrentInstance(); // Obtém o contexto da instância
        const eventBus = appContext.config.globalProperties.$eventBus; // Acesso ao eventBus

        const showToast = (data) => {
            toast.value = data;
            visible.value = true;
        };

        onMounted(() => {
            // Escuta o evento do eventBus
            eventBus.on('show-toast', showToast);
        });

        return { visible, toast };
    },
    beforeUnmount() {
        const { appContext } = getCurrentInstance();
        const eventBus = appContext.config.globalProperties.$eventBus; // Acesso ao eventBus
        // Limpa o listener quando o componente for desmontado
        eventBus.off('show-toast', showToast);
    },
};
</script>

<style scoped>
.v-card {
    margin-top: 50px;
}
</style>
