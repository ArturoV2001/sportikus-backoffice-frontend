<template>
  <NavbarMenu :user="user" :signOutModalRef="signOutModalRef"/>
  <AsideMenu/>
  <div class="fixed right-0 w-4/5 h-5/6 top-0 mt-16 p-4 rounded-lg dark:border-gray-700 overflow-auto">
    <router-view name="mainComponent"/>
  </div>
  <SignOutModal ref="signOutModalRef"/>
</template>

<script setup>
import AsideMenu from '@/components/MainView/AsideMenu.vue'
import NavbarMenu from '@/components/MainView/NavbarMenu.vue'
import { onMounted, ref } from 'vue'
import SignOutModal from '@/components/MainView/SignOutModal.vue'
//import { useRouter } from 'vue-router'

//const router = useRouter();
const user = ref([]);
const signOutModalRef = ref(null);
const beforeOpen = () => {
  user.value = JSON.parse(localStorage.getItem('user'));
};

onMounted(() => {
  beforeOpen();
})

</script>

