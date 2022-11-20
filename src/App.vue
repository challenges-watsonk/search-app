<script setup lang="ts">
import { computed } from "vue";
import AutoCompleteInput from "./components/AutoCompleteInput.vue";
import type { AutoCompleteOption } from "./components/AutoCompleteOption";
import { useCitiesStore } from "./stores/cities";

const citiesStore = useCitiesStore();
const queryResults = computed<AutoCompleteOption[]>(() =>
  citiesStore.partiallyMatchingNames.map((name) => ({
    primaryText: name,
  }))
);
</script>

<template>
  <main>
    <AutoCompleteInput
      v-model="citiesStore.nameQuery"
      :queryResults="queryResults"
      label="Search for a city name:"
      noResultText="No matching cities found."
    ></AutoCompleteInput>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
