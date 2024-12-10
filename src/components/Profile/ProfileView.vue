<template>
  <div class="h-auto p-6 shadow-2xl rounded-2xl">
    <h1 class="self-center text-xl font-semibold sm:text-5xl whitespace-nowrap dark:text-white">
      Mi perfil
    </h1>
    <div class="flex w-full">
      <div class="w-auto mr-3">
        <Image src="/src/assets/img/user_default.png" alt="Image" class="w-64 mt-10" preview/>
      </div>
      <div class="w-1/2 pt-6">
        <h1 class="self-center text-xl font-semibold sm:text-3xl whitespace-nowrap dark:text-white">
          {{user.name + " " + user.last_name}}
        </h1>
        <div class="ml-8 mt-4 mb-2">
          <Tag icon="pi pi-address-book" class="text-1xl" severity="info" :value="`Datos ${user.user_type_id === 1 ? ' del administrador' : ''}`"/>
        </div>
        <div class="border-double border-4 border-light-blue-500 rounded-lg p-4 ml-12">
          <h2 class="self-center text-xl font-semibold sm:text-lg whitespace-nowrap dark:text-white mt-1">
            <span class="font-bold">Peso:</span> {{user.weight}} kg
          </h2>
          <h2 class="self-center text-xl font-semibold sm:text-lg whitespace-nowrap dark:text-white mt-1">
            <span class="font-bold">Cumpleaños:</span> {{user.birthdate}}
          </h2>
          <h2 class="self-center text-xl font-semibold sm:text-lg whitespace-nowrap dark:text-white mt-1">
            <span class="font-bold">Genero:</span> {{user.gender_id === 1 ? 'Mujer' : 'Hombre'}}
          </h2>
          <h2 class="self-center text-xl font-semibold sm:text-lg whitespace-nowrap dark:text-white mt-1">
            <span class="font-bold">Registrado el:</span> {{formatTimestampToDate(user.created_at)}}
          </h2>
        </div>
      </div>
    </div>
    <div>
      <div class="border-double border-2 border-light-blue-500 rounded-lg p-6 mt-6">
        <alv-form :action="changePassword">
          <h1 class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white mb-2">
            Cambiar contraseña
          </h1>
          <h1 class="self-center text-xl font-semibold sm:text-sm whitespace-nowrap dark:text-white mt-1">
            <i class="pi pi-info-circle mr-2"></i> Ingresa los datos solicitados para cambiar tu contraseña.
          </h1>
          <div class="flex flex-col md:flex-row md:gap-4 w-full">
            <div class="flex-grow pt-4">
              <span class="block mb-2 text-lg font-semibold dark:text-white">Contraseña actual:</span>
              <Password class="w-full" v-model="changePasswordData.current_password" />
            </div>

            <div class="flex-grow pt-4">
              <span class="block mb-2 text-lg font-semibold dark:text-white">Nueva contraseña:</span>
              <Password class="w-full" v-model="changePasswordData.new_password" />
            </div>

            <div class="flex-grow pt-4">
              <span class="block mb-2 text-lg font-semibold dark:text-white">Confirmar contraseña:</span>
              <Password class="w-full" v-model="changePasswordData.new_password_confirmation" />
            </div>
          </div>



          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="text-white mt-4 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              <i class="pi pi-bookmark-fill mr-2" style="color: white; font-size: 1rem"></i>
              Cambiar
            </button>
          </div>
        </alv-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tag from 'primevue/tag';
import Image from 'primevue/image';
import Password from 'primevue/password';
import { inject, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import {authChangePassword} from '@/services/auth.js'

const isSubmitting = ref(false);
const toast = useToast();
const user = inject('user');
const changePasswordData = ref({
  current_password: null,
  new_password: null,
  new_password_confirmation: null,
});

const changePassword = async () => {
  isSubmitting.value = true;
  await authChangePassword(changePasswordData.value)
    .then(() => {
      toast.add({
        severity:'success',
        summary:'¡Felicidades!',
        detail:'Tu contraseña ha sido cambiada exitosamente.',
        life:3000,
      });
      changePasswordData.value = {
        current_password: null,
        new_password: null,
        new_password_confirmation: null,
      }
    }).catch((error) => {
      const errorMessage = error.response?.data?.message;
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 3000,
      });
    })
    .finally(() => {isSubmitting.value = false})
}

const formatTimestampToDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

</script>
