import './assets/main.css';
import Aura from '@primevue/themes/aura';
import "primeicons/primeicons.css";
import DialogService from 'primevue/dialogservice'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import alvue from '@myshell/alvue';
import ToastService  from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';



const app = createApp(App);

const user = JSON.parse(localStorage.getItem('user'));

app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark',
    }
  }
});

app.use(ToastService);
app.use(alvue);
app.use(router);
app.use(DialogService);
app.directive('tooltip', Tooltip);

app.provide('user', user);


router.isReady().then(() => {
  app.mount('#app');
});
