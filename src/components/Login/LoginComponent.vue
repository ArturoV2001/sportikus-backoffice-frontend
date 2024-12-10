<template>
  <div :class="!newUser ? 'bg-gray-50 dark:bg-gray-900 w-full' : ' bg-gray-50 dark:bg-gray-900 w-full lg:contain-size'">
    <div class="flex flex-col items-center justify-center mx-auto lg:h-screen">
      <h1 class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-16 h-16 mr-2" src="/src/assets/img/logo.png" alt="logotipo">
        Sportikus BackOffice
      </h1>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div v-if="!newUser" class="p-6 space-y-4 md:space-y-6">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Inicia sesión en tu cuenta
          </h1>
          <alv-form :action="submitLogin" class="space-y-4 md:space-y-6">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
              <input
                v-model="loginItem.email" type="email" name="item.email" id="item.email" placeholder="" required
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
              <input
                v-model="loginItem.password" type="password" name="item.password" id="item.password"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required>
            </div>
            <div class="flex items-center justify-between">
              <a href="" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Olvidaste tu contraseña?</a>
            </div>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer">
              Iniciar sesión
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              ¿Aún no tienes una cuenta? <a @click="newUser = true" class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">Regístrate</a>
            </p>
          </alv-form>
        </div>

        <div v-else class="p-6 space-y-6 md:space-y-12 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Crea una cuenta
          </h1>
          <alv-form class="space-y-4 md:space-y-6" :action="submitRegister">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
              <input v-model="registerItem.name" type="text" name="registerItem.name" id="registerItem.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tu nombre" required>
            </div>
            <div>
              <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
              <input v-model="registerItem.last_name" type="text" name="registerItem.last_name" id="registerItem.last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tu apellido" required>
            </div>
            <div>
              <label for="weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Peso</label>
              <input min="0" v-model="registerItem.weight" type="number" name="registerItem.weight" id="registerItem.weight" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tu peso en kg" required>
            </div>
            <div>
              <label for="birthdate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de nacimiento</label>
              <DatePicker v-model="registerItem.birthdate" showIcon fluid :showOnFocus="false" inputId="registerItem.birthdate" />
            </div>
            <div>
              <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Género</label>
              <button v-if="registerItem.gender_id === 1" @click="()=>{registerItem.gender_id = 2}" class="w-full text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                Mujer
              </button>
              <button v-else @click="()=>{registerItem.gender_id = 1}" class="w-full text-white bg-indigo-400 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                Hombre
              </button>
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu correo electrónico</label>
              <input v-model="registerItem.email" type="email" name="registerItem.email" id="registerItem.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="tunombre@correo.com" required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
              <input v-model="registerItem.password" type="password" name="registerItem.password" id="registerItem.password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
            <div>
              <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirma tu contraseña</label>
              <input v-model="registerItem.password_confirmation" type="password" name="registerItem.password_confirmation" id="registerItem.password_confirmation" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input v-model="termsAndConditions" id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">Acepto los <a class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer" @click="termsModal.beforeOpen()">Términos y Condiciones</a></label>
              </div>
            </div>
            <button
              type="submit"
              :disabled="isSubmitting || !termsAndConditions"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer
              disabled:bg-gray-500 disabled:text-gray-300 disabled:shadow-none disabled:cursor-auto">
              Crear cuenta
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              ¿Ya tienes una cuenta? <a @click="newUser = false" class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">Inicia sesión aquí</a>
            </p>
          </alv-form>
        </div>
      </div>
    </div>
  </div>
  <TermsAndConditions ref="termsModal"/>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { authLogin, authRegister } from '@/services/auth.js';
import { useToast } from 'primevue/usetoast';
import TermsAndConditions from '@/components/GlobalComponents/TermsAndConditions.vue';
import DatePicker from 'primevue/datepicker';
import { format } from 'date-fns'; // Si usas date-fns

const user = inject('user');
const termsModal = ref(null);
const toast = useToast();
const newUser = ref(false);
const termsAndConditions = ref(false);
const isSubmitting = ref(false);
const loginItem = ref({
  email: null,
  password: null,
});
const registerItem = ref({
  email: null,
  password: null,
  password_confirmation: null,
  name: null,
  last_name: null,
  weight: null,
  birthdate: null,
  gender_id: 1,
});

const beforeOpen = () => {
  isSubmitting.value = false;
};

const submitLogin = async () => {
  isSubmitting.value = true;
  await authLogin(loginItem.value)
    .then(response => {
      toast.add({
        severity: 'success',
        summary: `¡Bienvenid${response.user.gender_id === 1 ? 'a' : 'o'} de nuevo ${response.user.name}!`,
        life: 3000,
      });
      setTimeout(() => {
        localStorage.setItem('auth', response.access_token);
        user.value = response.user;
        window.location.href = '/';
      }, 3000);
    })
    .catch(error => {
      const errorMessage = error.response?.data?.message;
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 3000,
      });
    })
    .finally(() => {
      isSubmitting.value = false;
    });
};

const submitRegister = async () => {
  isSubmitting.value = true;

  // Formatear el campo birthdate al formato 'YYYY-MM-DD'
  registerItem.value.birthdate = format(new Date(registerItem.value.birthdate), 'yyyy-MM-dd');

  await authRegister(registerItem.value)
    .then(response => {
      toast.add({
        severity: 'success',
        summary: '¡Felicidades!',
        detail: `Te has registrado en Sportikus ¡Bienvenid${response.user.gender_id === 1 ? 'a' : 'o'}!`,
        life: 3000,
      });
      setTimeout(() => {
        localStorage.setItem('auth', response.access_token);
        user.value = response.user;
        window.location.href = '/';
      });
    })
    .catch(error => {
      const errorMessage = error.response?.data?.message;
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 3000,
      });
    })
    .finally(() => {
      isSubmitting.value = false;
    });
};

onMounted(() => {
  beforeOpen();
});
</script>
