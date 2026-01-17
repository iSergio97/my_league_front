<template>
  <div class="container mx-auto my-8 space-y-8">
    <div v-if="isPending">Loading...</div>
    <div v-if="isFetching">Updating...</div>
    <div v-if="isError">Error: {{ error?.message }}</div>
    <div v-if="standings">
      <div class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full bg-white text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-3 py-2 text-left">#</th>
              <th class="px-3 py-2 text-left">Equipo</th>
              <th class="px-3 py-2 text-center">PJ</th>
              <th class="px-3 py-2 text-center">GF</th>
              <th class="px-3 py-2 text-center">GC</th>
              <th class="px-3 py-2 text-center">DG</th>
              <th class="px-3 py-2 text-center">Pts</th>
            </tr>
          </thead>

          <tbody class="divide-y">
            <tr v-for="team in standings" :key="team.teamName" class="hover:bg-gray-50">
              <td class="px-3 py-2 font-medium">{{ team.ranking }}</td>
              <td class="px-3 py-2">{{ team.teamName }}</td>
              <td class="px-3 py-2 text-center">{{ team.journeyNumber }}</td>
              <td class="px-3 py-2 text-center">{{ team.goalsFor }}</td>
              <td class="px-3 py-2 text-center">{{ team.goalsAgainst }}</td>
              <td
                class="px-3 py-2 text-center font-medium"
                :class="{
                  'text-green-600': team.goalsFor - team.goalsAgainst > 0,
                  'text-red-600': team.goalsFor - team.goalsAgainst < 0,
                  'text-gray-600': team.goalsFor - team.goalsAgainst === 0,
                }"
              >
                {{ team.goalsFor - team.goalsAgainst }}
              </td>
              <td class="px-3 py-2 text-center font-bold">
                {{ team.points }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="matches">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              :class="match.status === 'Finalizado' ? 'text-green-600' : 'text-yellow-600'"
            >
              {{ match.status }}
            </span>
          </div>

          <!-- Teams -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-medium">{{ match.localTeam }}</span>
              <span class="text-lg font-bold">{{ match.localGol }}</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="font-medium">{{ match.awayTeam }}</span>
              <span class="text-lg font-bold">{{ match.awayGol }}</span>
            </div>
          </div>

          <!-- Date -->
          <div class="mt-4 text-xs text-gray-500 text-right">
            {{ formatDate(match.matchDate) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getStandings } from '@/api/standing.api';
import { getMatches } from './api/match.api';

const {
  isPending,
  isFetching,
  isError,
  data: standings,
  error,
} = useQuery({
  queryKey: ['standings'],
  queryFn: getStandings,
});

const {
  isPending: loadingMatches,
  isFetching: fetchinMatches,
  isError: errorFetchingMatches,
  data: matches,
  error: errorMatches,
} = useQuery({
  queryKey: ['matches'],
  queryFn: getMatches,
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

<style scoped></style>
