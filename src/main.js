import { createApp } from 'vue';
import { createPinia } from 'pinia'
import router from "@/router.js";
import VWave from 'v-wave'
import App from './App.vue';

import 'animate.css';
import './style.scss';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VWave);

app.mount('#app');