<template>
  <div class="flex">
    <button
      class="inline-flex m-1 text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
      @click="props.modal.beforeOpen(props.rowData.id)"
      v-tooltip.top="'Editar'">
      <i class="pi pi-pen-to-square" />
    </button>
    <button
      class="inline-flex m-1 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
      @click="props.deleteModal.beforeOpen(props.rowData.name,props.rowData.id )"
      v-tooltip.top="'Eliminar'">
      <i class="pi pi-trash" />
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  rowData: { type:Object, default:null },
  modal: {type:Object, default: () => {} },
  deleteModal: {type:Object, default: () => {} },
})
</script>
