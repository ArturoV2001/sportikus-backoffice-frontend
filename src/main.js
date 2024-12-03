import './assets/main.css';
import Aura from '@primevue/themes/aura';
import "primeicons/primeicons.css";
import DialogService from 'primevue/dialogservice';
import { createApp, ref } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import alvue from '@myshell/alvue';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';

// Importar el componente Chart de PrimeVue
import Chart from 'primevue/chart';

const app = createApp(App);

const user = ref({
  email:null,
  password:null,
  name:null,
  last_name:null,
  weight:null,
  birthdate:null,
  user_type_id:null,
  gender_id:null,
  routine_id:null,
  ailment_id:null,
});
const adminPermission = ref(false);

app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark',
    },
  },
});

app.use(ToastService);
app.use(alvue);
app.use(router);
app.use(DialogService);
app.directive('tooltip', Tooltip);

// Registrar el componente Chart globalmente
app.component('PrimeChart', Chart);

app.provide('user', user);
app.provide('adminPermission', adminPermission);

router.isReady().then(() => {
  app.mount('#app');
});
