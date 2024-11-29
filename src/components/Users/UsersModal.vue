<template>
  <Dialog v-model:visible="visible" modal draggable header="Usuario" class="w-1/2">
    <alv-form :action="!id ? createElement : updateElement">
      <div class="flex items-center gap-4 mb-4">
        <label for="item.name" class="font-semibold w-24">Nombre: </label>
        <InputText v-model="itemData.name" id="item.name" class="flex-auto" autocomplete="off" placeholder="Nombre" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="item.last_name" class="font-semibold w-24">Apellido: </label>
        <InputText v-model="itemData.last_name" id="item.last_name" class="flex-auto" autocomplete="off" placeholder="Apellido" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="item.weight" class="font-semibold w-24">Peso: </label>
        <InputNumber v-model="itemData.weight" id="item.weight" class="flex-auto" autocomplete="off" placeholder="Peso" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="birthdate" class="font-semibold w-24">Cumpleaños: </label>
        <input v-model="itemData.birthdate" type="date" id="birthdate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="gender" class="font-semibold w-24">Genero: </label>
        <button v-if="itemData.gender_id === 1" @click="itemData.gender_id = 2" class="w-full text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
          Mujer
        </button>
        <button v-else @click="itemData.gender_id = 1" class="w-full text-white bg-indigo-400 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
          Hombre
        </button>
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="email" class="font-semibold w-24">Correo electrónico: </label>
        <InputText v-model="itemData.email" type="email" name="itemData.email" id="itemData.email" class="flex-auto" placeholder="tunombre@correo.com"/>
      </div>
      <div class="flex items-center gap-4 mb-4" v-if="!id">
        <label for="password" class="font-semibold w-24">Contraseña</label>
        <Password v-model="itemData.password" type="password" name="itemData.password" id="itemData.password" placeholder="••••••••" class="flex-auto" required />
      </div>
      <div v-if="!id" class="flex items-center gap-4 mb-4">
        <label for="password_confirmation" class="font-semibold w-24">Confirma tu contraseña</label>
        <Password v-model="itemData.password_confirmation" type="password" name="itemData.password_confirmation" id="itemData.password_confirmation" placeholder="••••••••" class="flex-auto" required />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
        <button type="submit" class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          <i class="pi pi-bookmark-fill mr-2" style="color: white; font-size: 1rem"/>
          Guardar
        </button>
      </div>
    </alv-form>
  </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog';
import Password from 'primevue/password'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { getUserById, createUser, updateUser } from '@/services/user.js';

const emit = defineEmits(['elementCreated']);
const toast = useToast();
const visible = ref(false);
const id = ref(null);

const itemData = ref({
  email:null,
  password:null,
  password_confirmation:null,
  name:null,
  last_name:null,
  weight:null,
  birthdate:null,
  gender_id:1,
});

const beforeOpen = async (key = null) => {
  id.value = null;
  itemData.value = {
    email:null,
    password:null,
    password_confirmation:null,
    name:null,
    last_name:null,
    weight:null,
    birthdate:null,
    gender_id:1,
  };
  visible.value = true;
  if (key) {
    await getUserById(key, Object.keys(itemData.value))
      .then(response => {
        id.value = key;
        itemData.value = response;
      });
  }
};

const createElement = async () => {
  await createUser(itemData.value)
    .then(() => {
      visible.value = false;
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Usuario agregado correctamente',
        life: 3000,
      });
      emit('elementCreated');
    })
    .catch(response => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: response.message,
        life: 3000,
      });
    })
};

const updateElement = async () => {
  await updateUser(id.value, itemData.value)
    .then(() => {
      visible.value = false;
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Usuario actualizado correctamente',
        life: 3000,
      });
      emit('elementCreated');
    })
    .catch(response => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: response.message,
        life: 3000,
      });
    })
};

defineExpose({ beforeOpen });
</script>
