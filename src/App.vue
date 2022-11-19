<script setup lang="ts">
import { computed } from "vue";
import { useCitiesStore } from "./stores/cities";

const citiesStore = useCitiesStore();
const queryCanAutocomplete = computed(() => citiesStore.nameQuery.length > 2);
const queryHasResults = computed(
  () => citiesStore.partiallyMatchingNames.length > 0
);
</script>

<template>
  <main>
    <label for="city-name-search">Search for a city name:</label>
    <input
      v-model="citiesStore.nameQuery"
      type="text"
      id="city-name-search"
      name="city-name-search"
    />
    <template v-if="queryCanAutocomplete">
      <select
        v-if="queryHasResults"
        name="city-name-autocomplete"
        id="city-name-autocomplete"
      >
        <option
          v-for="name in citiesStore.partiallyMatchingNames"
          :value="name"
          :key="name"
        >
          {{ name }}
        </option>
      </select>
      <p v-if="!queryHasResults">No matching cities found.</p>
    </template>
    <p v-if="!queryCanAutocomplete">
      Enter 3 or more letters to see autocomplete options.
    </p>
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
