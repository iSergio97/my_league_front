<template>
  <div v-if="isPending">Loading...</div>
  <div v-else-if="isError">Error: {{ error?.message }}</div>
  <div v-else-if="standings">
    <div class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="min-w-full bg-white text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-3 py-2 text-left w-8">#</th>
            <th class="px-3 py-2 text-left">Equipo</th>
            <th class="px-3 py-2 text-center w-4">PJ</th>
            <th class="px-3 py-2 text-center w-4">GF</th>
            <th class="px-3 py-2 text-center w-4">GC</th>
            <th class="px-3 py-2 text-center w-4">DG</th>
            <th class="px-3 py-2 text-center w-4">Pts</th>
            <th class="px-3 py-2 text-center w-4">Últimos</th>
          </tr>
        </thead>

        <TransitionGroup tag="tbody" name="ranking" class="divide-y">
          <tr
            v-for="(team, index) in standings"
            :key="team.teamName"
            class="hover:bg-gray-300 transition-colors duration-300"
            :class="{
              'bg-blue-300': index <= 3,
              'bg-orange-300': index > 3 && index < 6,
              'bg-green-300': index >= 6 && index < 8,
              'bg-red-300': index > 16,
            }"
          >
            <td class="px-3 py-2 font-medium">
              <div class="flex flex-row gap-4">
                <span class="my-0.5" v-if="journeyDay > 1">
                  <UpRankingIcon
                    class="text-green-600 w-4 h-4"
                    v-if="team.ranking < team.previousRanking"
                  />
                  <DownRankingIcon
                    class="text-red-600 w-4 h-4"
                    v-else-if="team.ranking > team.previousRanking"
                  />
                  <KeepRankingIcon class="text-gray-600 w-4 h-4" v-else />
                </span>
                <span v-else>
                  <KeepRankingIcon class="text-gray-600 w-4 h-4" />
                </span>
                {{ team.ranking }}
                <span v-if="index <= 3"> <ChampionsLeagueIcon /></span>
                <span v-if="index > 3 && index < 6"> <EuropaLeagueIcon /></span>
                <span v-if="index >= 6 && index < 8"> <ConferenceLeagueIcon /></span>
                <span v-if="index > 16"> <ArrowIcon class="text-red-500" /></span>
              </div>
            </td>
            <td class="px-3 py-2">{{ team.teamName }}</td>
            <td class="px-3 py-2 text-center">{{ team.matchesPlayed }}</td>
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
            <td class="px-3 text-center font-bold">
              <LastResultsComponent :last-results="team.lastResults" />
            </td>
          </tr>
        </TransitionGroup>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getStandings } from '@/api/standing.api';
import { useQuery } from '@tanstack/vue-query';
import ChampionsLeagueIcon from './svg/ChampionsLeagueIcon.vue';
import EuropaLeagueIcon from './svg/EuropaLeagueIcon.vue';
import ConferenceLeagueIcon from './svg/ConferenceLeagueIcon.vue';
import ArrowIcon from './svg/ArrowIcon.vue';
import LastResultsComponent from './LastResultsComponent.vue';
import DownRankingIcon from './svg/DownRankingIcon.vue';
import UpRankingIcon from './svg/UpRankingIcon.vue';
import KeepRankingIcon from './svg/KeepRankingIcon.vue';

interface Props {
  journeyDay: number;
}

const props = defineProps<Props>();

const {
  data: standings,
  isPending,
  isError,
  error,
} = useQuery({
  queryKey: ['standings', () => props.journeyDay],
  queryFn: () => getStandings(props.journeyDay),
  placeholderData: (prev) => prev,
});
</script>

<style scoped>
.ranking-move {
  transition: transform 0.5s ease;
}

.ranking-enter-active,
.ranking-leave-active {
  transition: all 0.5s ease;
}

.ranking-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.ranking-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
