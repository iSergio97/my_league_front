<template>
  <div class="flex flex-row gap-1">
    <div v-for="(resultado, idx) in resultados" :key="idx">
      <p
        class="rounded-full"
        :class="{
          'bg-green-500': resultado === 'W',
          'bg-gray-500': resultado === 'D',
          'bg-red-500': resultado === 'L',
        }"
      >
        <span v-if="idx <= 3">
          <VictoryIcon v-if="resultado === 'W'" class="w-4.5 h-4.5" />
          <LoseIcon v-if="resultado === 'L'" class="w-4.5 h-4.5" />
          <DrawIcon v-if="resultado === 'D'" class="w-4.5 h-4.5" />
        </span>
        <span v-else>
          <VictoryLastGameIcon v-if="resultado === 'W'" class="w-5 h-5" />
          <LoseLastGameIcon v-if="resultado === 'L'" class="w-5.5 h-5.5" />
          <DrawLastGameIcon v-if="resultado === 'D'" class="w-5.5 h-5.5" />
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import VictoryIcon from './svg/VictoryIcon.vue';
import LoseIcon from './svg/LoseIcon.vue';
import DrawIcon from './svg/DrawIcon.vue';
import VictoryLastGameIcon from './svg/VictoryLastGameIcon.vue';
import LoseLastGameIcon from './svg/LoseLastGameIcon.vue';
import DrawLastGameIcon from './svg/DrawLastGameIcon.vue';

interface Props {
  lastResults: string;
}

const { lastResults } = defineProps<Props>();

const resultados = computed(() => lastResults.split('-') ?? []);
</script>

<style scoped></style>
