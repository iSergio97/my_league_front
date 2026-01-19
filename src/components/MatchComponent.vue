<template>
  <div v-if="isPending">Loading...</div>
  <div v-else-if="isError">Error: {{ error?.message }}</div>
  <div v-else-if="matches">
    <div class="grid gap-4 grid-cols-2">
      <div
        v-for="match in matches"
        :key="match.matchId"
        class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
      >
        <!-- Header -->
        <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Jornada {{ match.matchDay }}</span>
          <span
            class="font-medium"
            :class="match.status === 'Finalizado' ? 'text-blue-600' : 'text-yellow-600'"
          >
            {{ match.status }}
          </span>
        </div>

        <!-- Teams -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="font-medium">{{ match.localTeam }}</span>
            <span
              class="text-lg font-bold"
              :class="{
                'text-green-500': match.localGol > match.awayGol,
                'text-red-500': match.localGol < match.awayGol,
              }"
              >{{ match.localGol }}</span
            >
          </div>

          <div class="flex items-center justify-between">
            <span class="font-medium">{{ match.awayTeam }}</span>
            <span
              class="text-lg font-bold"
              :class="{
                'text-green-500': match.awayGol > match.localGol,
                'text-red-500': match.awayGol < match.localGol,
              }"
              >{{ match.awayGol }}</span
            >
          </div>
        </div>

        <!-- Date -->
        <div class="mt-4 text-xs text-gray-500 text-right">
          {{ formatDate(match.matchDate) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMatches } from '@/api/match.api';
import { useQuery } from '@tanstack/vue-query';

interface Props {
  matchDay: number;
}

const props = defineProps<Props>();

const {
  data: matches,
  isPending,
  isError,
  error,
} = useQuery({
  queryKey: ['matches', () => props.matchDay],
  queryFn: () => getMatches(props.matchDay),
});

const formatDate = (date: string) =>
  new Date(date).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
</script>
