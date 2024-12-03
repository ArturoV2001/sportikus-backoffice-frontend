<template>
  <Dialog
    v-model:visible="visible" :closable="false" modal draggable
    class="w-1/2 px-4">
    <h2 class="text-2xl font-bold text-primary-50 text-center mb-4">
      Términos y Condiciones
    </h2>
    <div class="text-primary-50 text-sm leading-6 space-y-4">
      <p>
        Bienvenido a Sportikus®. Al descargar, registrarte y/o usar nuestra
        aplicación, aceptas los siguientes términos y condiciones. Si no estás
        de acuerdo con ellos, te pedimos que no utilices nuestros servicios.
      </p>
      <h3 class="text-lg font-semibold">1. Definición del servicio</h3>
      <p>
        Sportikus® es una aplicación que ofrece rutinas de entrenamiento
        personalizadas, monitoreo de datos biométricos y recomendaciones basadas
        en tus condiciones físicas y de salud.
      </p>
      <h3 class="text-lg font-semibold">2. Requisitos para el uso</h3>
      <p>
        - Debes tener al menos 18 años para usar Sportikus®. Los menores de edad
        deben contar con el consentimiento de un tutor legal.
      </p>
      <p>
        - Asegúrate de proporcionar información precisa y actualizada para
        obtener resultados personalizados.
      </p>
      <h3 class="text-lg font-semibold">3. Uso de datos biométricos</h3>
      <p>
        Al aceptar estos términos, autorizas a Sportikus® a recopilar, almacenar y
        procesar tus datos biométricos para proporcionarte recomendaciones
        personalizadas. Estos datos serán tratados conforme a nuestra Política de
        Privacidad.
      </p>
      <h3 class="text-lg font-semibold">4. No sustituimos asesoramiento médico</h3>
      <p>
        Sportikus® no es un servicio médico. Las recomendaciones proporcionadas
        son solo informativas y no deben sustituir la consulta con un
        profesional de la salud.
      </p>
      <h3 class="text-lg font-semibold">5. Responsabilidades del usuario</h3>
      <p>
        - Eres responsable de garantizar que estás en condiciones físicas
        adecuadas para realizar las rutinas recomendadas.
      </p>
      <p>
        - Es tu responsabilidad detener cualquier actividad física si
        experimentas malestar, dolor o cualquier síntoma adverso.
      </p>
      <h3 class="text-lg font-semibold">6. Restricciones de uso</h3>
      <p>
        Está prohibido:
        <br />
        - Usar Sportikus® para actividades ilegales o no autorizadas.
        <br />
        - Proporcionar información falsa o suplantar la identidad de otros
        usuarios.
        <br />
        - Copiar, modificar o distribuir cualquier contenido de la aplicación sin
        autorización previa.
      </p>
      <h3 class="text-lg font-semibold">7. Propiedad intelectual</h3>
      <p>
        Todo el contenido, diseño, logotipos y funcionalidades de Sportikus® son
        propiedad exclusiva de Sportikus®. Está prohibida la
        reproducción parcial o total del contenido sin autorización expresa.
      </p>
      <h3 class="text-lg font-semibold">8. Limitación de responsabilidad</h3>
      <p>
        Sportikus® no se hace responsable por lesiones, daños o pérdidas derivadas
        del uso de nuestras rutinas o recomendaciones. La aplicación no garantiza
        resultados específicos, ya que estos dependen de múltiples factores como
        tu esfuerzo y disciplina personal.
      </p>
      <h3 class="text-lg font-semibold">9. Modificaciones del servicio</h3>
      <p>
        Nos reservamos el derecho de modificar, suspender o descontinuar
        temporal o permanentemente cualquier funcionalidad de la aplicación sin
        previo aviso.
      </p>
      <h3 class="text-lg font-semibold">10. Actualización de términos</h3>
      <p>
        Podremos actualizar estos términos ocasionalmente. Notificaremos cualquier
        cambio importante dentro de la aplicación. Tu uso continuado después de
        estas modificaciones constituye tu aceptación de los términos actualizados.
      </p>
      <h3 class="text-lg font-semibold">11. Contacto</h3>
      <p>
        Si tienes preguntas o comentarios sobre estos términos y condiciones, puedes
        contactarnos a través de soporte@sportikus.com o desde la
        sección de soporte dentro de la aplicación.
      </p>
      <h3 class="text-lg font-semibold">12. Jurisdicción</h3>
      <p>
        Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier
        disputa será resuelta en los tribunales competentes de Aguascalientes, Ags.
      </p>
    </div>
    <div class="text-center gap-2 mt-8">
      <button @click="visible = false" class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        <i class="pi pi-check mr-2" style="color: white; font-size: 1rem"/>
        Continuar
      </button>
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';

const visible = ref(false);

const beforeOpen = () => {
  visible.value = true;
};

defineExpose({ beforeOpen });
</script>
