/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { eventBus } from './util/eventBus'

const app = createApp(App)
export const showToast = (message: string, color = 'success') => {
    eventBus.emit('show-toast', { message, color });
};

app.config.globalProperties.$eventBus = eventBus
app.config.globalProperties.$showToast = showToast

registerPlugins(app)


app.mount('#app')
