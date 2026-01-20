<template>
  <div class="container mx-auto my-8 space-y-8">
    <FinderComponent @jornada="cambioJornada" @temporada="cambioTemporada" />
    <div class="grid gap-8 grid-cols-5">
      <div class="col-span-3" v-if="day">
        <RankingComponent :journey-day="day" />
      </div>

      <div class="col-span-2" v-if="day">
        <MatchComponent :match-day="day" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FinderComponent from '@/components/FinderComponent.vue';
import MatchComponent from '@/components/MatchComponent.vue';
import RankingComponent from '@/components/RankingComponent.vue';
import { type Ref, ref } from 'vue';

const day: Ref<number | undefined> = ref(undefined);
const temporada: Ref<string | undefined> = ref(undefined);

const cambioJornada = (nuevaJornada: number) => (day.value = nuevaJornada);

const cambioTemporada = (nuevaTemporada: string) => (temporada.value = nuevaTemporada);
</script>
