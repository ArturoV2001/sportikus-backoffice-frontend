
<template>
  <Dialog
    v-model:visible="visible" modal draggable
    :header="`Recomendación del ${recommendation_date}`"
    class="w-1/2 px-4">
    <div  class="w-full text-center">
      <i class="pi pi-address-book" style="font-size: 2rem;"/>
    </div>
    <div class="p-4 text-justify" v-html="recommendation"></div>
  </Dialog>
</template>

<script setup>
import Dialog from "primevue/dialog";
import { ref } from "vue";
import {getRecommendation} from '@/services/recommendation_user.js'
const visible = ref(false);
const recommendation = ref();
const recommendation_date = ref();

const beforeOpen = async (recommendation_id, recommendation_timestamp) => {
  visible.value = true;
  recommendation.value = null;
  recommendation_date.value = formatTimestamp(recommendation_timestamp);
  await getRecommendation({
    recommendation_user_id: recommendation_id,
  })
    .then(response => {
      recommendation.value = response.recommendation;
    })
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

defineExpose({beforeOpen});

</script>
