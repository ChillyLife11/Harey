import { createApp } from 'vue';
import { createPinia } from 'pinia'
import './style.less';
import VWave from 'v-wave'
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(VWave)

import 'animate.css';

app.mount('#app');

