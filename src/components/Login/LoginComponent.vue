<template>
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logotipo">
          Sportikus BackOffice
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Inicia sesión en tu cuenta
            </h1>
            <alv-form :action="submitLogin" class="space-y-4 md:space-y-6">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
                <input
                  v-model="item.email" type="email" name="item.email" id="item.email" placeholder="" required
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                <input
                  v-model="item.password" type="password" name="item.password" id="item.password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember" aria-describedby="remember-description" type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    >
                  </div>
                  <div id="remember-description" class="ml-3 text-sm">
                    <label for="remember" class="text-gray-500 dark:text-gray-300">Recuérdame</label>
                  </div>
                </div>
                <a href="" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Olvidaste tu contraseña?</a>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Iniciar sesión
              </button>


              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿Aún no tienes una cuenta? <a href="" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Regístrate</a>
              </p>
            </alv-form>
          </div>
        </div>
      </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import {authLogin} from '@/services/auth.js'

const response = ref();
const item = ref({
  email: null,
  password: null,
});

const submitLogin = async () => {
  response.value = await authLogin(item.value)
    .catch(()=>{
      console.log("Credenciales invalidas");
    });
  if (response.value.access_token && response.value.user){
    console.log(response.value.access_token);
    console.log(response.value.user);
    localStorage.setItem('auth',response.value.access_token);
    localStorage.setItem('user',JSON.stringify(response.value.user));
  }
}
</script>
