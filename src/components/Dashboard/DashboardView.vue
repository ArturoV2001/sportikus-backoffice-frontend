<template>
    <h1 class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
      Bienvenido a Sportikus {{user.name}}!
    </h1>
</template>

<script setup>

import { onMounted, ref } from 'vue'

const user = ref([]);

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem('user'));
})

</script>
