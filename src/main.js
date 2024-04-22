import { createApp } from 'vue';
import { createPinia } from 'pinia'
import './style.css';
import VWave from 'v-wave'
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(VWave)

app.mount('#app');
