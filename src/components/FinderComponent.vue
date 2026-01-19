<template>
  <div class="w-64">
    <label for="fruit" class="block mb-1 text-sm font-medium text-gray-700">
      Selecciona jornada {{ selectOption }}
    </label>

    <select
      id="fruit"
      name="fruit"
      class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      v-model="selectOption"
      @change="emit('jornada', selectOption)"
    >
      <option v-for="jornada in jornadas" :value="jornada" :key="jornada">
        Jornada {{ jornada }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

const length = 38;
const jornadas = Array.from({ length }, (_, i) => i + 1);

const selectOption: Ref<number> = ref(1);

const emit = defineEmits(['jornada']);
</script>
