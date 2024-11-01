<template>
    <v-container>
        <v-row class="text-center mb-8">
            <v-col cols="12">
                <h1 class="display-1 primary--text">Escolha o seu Plano</h1>
                <p class="text-subtitle-1">Selecione o plano que melhor se adequa às suas necessidades</p>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col v-for="plan in planos" :key="plan.id" cols="12" sm="6" md="4" class="d-flex justify-center">
                <v-card class="plan-card" rounded="xl" border="t-lg e-xl primary">
                    <v-card-title class="headline font-weight-bold primary--text text-center">
                        {{ plan.nickname || "Plano sem nome" }}
                    </v-card-title>

                    <v-card-subtitle class="text-subtitle-2 grey--text text--darken-1 text-center">
                        {{ plan.type === "recurring" ? "Cobrança Mensal" : "Pagamento Único" }}
                    </v-card-subtitle>

                    <v-card-text class="text-center">
                        <div class="plan-detail">
                            <v-icon color="primary" small>mdi-currency-usd</v-icon>
                            <span><strong>Valor:</strong> {{ formatCurrency(plan.unit_amount) }} {{ plan.currency
                                }}</span>
                        </div>
                        <div class="plan-detail">
                            <v-icon color="primary" small>mdi-check-circle</v-icon>
                            <span><strong>Status:</strong> {{ plan.active ? "Ativo" : "Inativo" }}</span>
                        </div>
                        <div v-if="plan.recurring" class="plan-detail">
                            <v-icon color="primary" small>mdi-calendar-repeat</v-icon>
                            <span><strong>Intervalo:</strong> {{ plan.recurring.interval_count }} {{
                                plan.recurring.interval }}</span>
                        </div>
                    </v-card-text>

                    <v-card-actions class="justify-center">
                        <v-btn @click="criarPagamento(plan.id)" color="primary" elevation="2" rounded>
                            Selecionar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { usePagamentoStore } from '@/stores/pagamento';
import { usePlanoStore } from '@/stores/plano';

export default {
    name: 'Plano',
    data() {
        return {
            planoStore: usePlanoStore(),
            pagamentoStore: usePagamentoStore(),
            planos: []
        }
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100);
        },
        async criarPagamento(priceId) {
            try {
                const { url } = await this.pagamentoStore.criarPagamento(priceId);
                console.log(url);
                window.open(url, '_blank');
            } catch (error) {
                console.error(error);
            }
        }
    },
    async mounted() {
        this.planos = await this.planoStore.buscarPlanos();
        console.log(this.planos);
    }
};

</script>

<style scoped>
.plan-card {
    width: 100%;
    max-width: 280px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 24px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.plan-card:hover {
    transform: translateY(-12px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
}

.plan-detail {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
}

.v-card-title {
    font-size: 1.25rem;
    color: var(--v-primary-base);
}

.v-card-subtitle {
    color: #6c757d;
    /* Cinza para subtítulo */
    margin-bottom: 16px;
}

.v-card-text {
    text-align: center;
}

.v-card-actions {
    justify-content: center;
}
</style>
