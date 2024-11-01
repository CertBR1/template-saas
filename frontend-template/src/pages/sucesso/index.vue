<template>
    <div>
        <!-- Seu conteúdo do componente aqui -->
        <h1>Sucesso!</h1>
    </div>
</template>

<script>
export default {
    name: 'Sucesso',
    data() {

    },
    mounted() {
        this.playAudio();
    },
    methods: {
        playAudio() {
            const audio = new Audio(require('@/assets/dinheiro.mp3')); // Altere o nome do arquivo para o que você está usando
            audio.play().catch((error) => {
                console.error('Erro ao reproduzir o áudio:', error);
            });
        }
    }
}
</script>

<style>
/* Adicione seus estilos aqui, se necessário */
</style>