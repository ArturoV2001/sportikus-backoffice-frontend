<template>
  <section :class="!newUser ? 'bg-gray-50 dark:bg-gray-900 w-full' : 'bg-gray-50 dark:bg-gray-900 w-full contain-size'">
    <div class="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
      <h1 class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-16 h-16 mr-2" src="/src/assets/img/logo.png" alt="logotipo">
        Sportikus BackOffice
      </h1>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
        <div v-if="!newUser" class="p-6 space-y-4 md:space-y-6">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Inicia sesión en tu cuenta
          </h1>
          <alv-form :action="submitLogin" class="space-y-4 md:space-y-6">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
              <input
                v-model="loginItem.email" type="email" name="item.email" id="item.email" placeholder="" required
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
              <input
                v-model="loginItem.password" type="password" name="item.password" id="item.password"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember" aria-describedby="remember-description" type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
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
              <input v-model="registerItem.weight" type="number" name="registerItem.weight" id="registerItem.weight" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tu peso en kg" required>
            </div>
            <div>
              <label for="birthdate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de nacimiento</label>
              <input v-model="registerItem.birthdate" type="date" name="registerItem.birthdate" id="registerItem.birthdate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
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
                <input v-model="termsAndConditions" id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required>
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">Acepto los <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Términos y Condiciones</a></label>
              </div>
            </div>
            <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Crear cuenta</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              ¿Ya tienes una cuenta? <a @click="newUser=false" class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">Inicia sesión aquí</a>
            </p>
          </alv-form>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup>
import { ref } from 'vue'
import {authLogin, authRegister} from '@/services/auth.js'
//import { useRouter } from 'vue-router'

//const router = useRouter();
const response = ref();
const newUser = ref(false);
const termsAndConditions = ref(false);

const loginItem = ref({
  email: null,
  password: null,
});
const registerItem = ref({
  email:null,
  password:null,
  password_confirmation:null,
  name:null,
  last_name:null,
  weight:null,
  birthdate:null,
});

const submitLogin = async () => {
  response.value = await authLogin(loginItem.value)
    .catch(()=>{
      console.log("Credenciales invalidas");
    });
  if (response.value.access_token && response.value.user){
    console.log(response.value.access_token);
    console.log(response.value.user);
    localStorage.setItem('auth',response.value.access_token);
    localStorage.setItem('user',JSON.stringify(response.value.user));
    window.location.href = '/';
  }
}

const submitRegister = async () => {
  if (termsAndConditions.value) {
    response.value = await authRegister(registerItem.value)
      .catch(response => {
        console.log(response.data);
        console.log("error al registrar")
      });
    if (response.value.access_token && response.value.user){
      console.log(response.value.access_token);
      console.log(response.value.user);
      localStorage.setItem('auth',response.value.access_token);
      localStorage.setItem('user',JSON.stringify(response.value.user));
      window.location.href = '/';
    }
  }else {
    console.log("Acepta los terminos y condiciones.")
  }
}
</script>
