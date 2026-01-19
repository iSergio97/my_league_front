<template>
  <div class="container mx-auto my-8 space-y-8">
    <FinderComponent @jornada="cambioJornada" />
    <div class="grid gap-8 grid-cols-5">
      <div class="col-span-3">
        <RankingComponent :journey-day="day" />
      </div>

      <div class="col-span-2">
        <MatchComponent :match-day="day" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RankingComponent from './components/RankingComponent.vue';
import MatchComponent from './components/MatchComponent.vue';
import { type Ref, ref } from 'vue';
import FinderComponent from './components/FinderComponent.vue';

const day: Ref<number> = ref(1);

const cambioJornada = (nuevaJornada: number) => (day.value = nuevaJornada);
</script>
