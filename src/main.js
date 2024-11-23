import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import alvue from '@myshell/alvue';

const app = createApp(App);

app.use(PrimeVue, {
  ripple: true,
});

app.use(alvue);

app.use(router);

router.isReady().then(() => {
  app.mount('#app');
});
