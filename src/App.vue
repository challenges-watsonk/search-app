<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import AutoCompleteInput from "./components/AutoCompleteInput.vue";
import type { AutoCompleteOption } from "./components/AutoCompleteResult.vue";
import { useBooksStore } from "./stores/books";
import { useCitiesStore } from "./stores/cities";

const citiesStore = useCitiesStore();
const citiesQueryResults = computed<AutoCompleteOption[]>(() =>
  citiesStore.partiallyMatchingNames.map((name) => ({
    primaryText: name,
  }))
);

const booksStore = useBooksStore();
const booksQueryResults = computed<AutoCompleteOption[]>(() =>
  booksStore.partiallyMatchingTitles.map(({ title, author }) => ({
    primaryText: title,
    secondaryText: author,
  }))
);

const cityAutoComplete = ref();
onMounted(() => {
  cityAutoComplete.value?.focus();
});
</script>

<template>
  <main>
    <AutoCompleteInput
      v-model="citiesStore.nameQuery"
      :queryResults="citiesQueryResults"
      label="Search for a city name:"
      noResultText="No matching cities found."
      ref="cityAutoComplete"
    ></AutoCompleteInput>

    <AutoCompleteInput
      v-model="booksStore.titleQuery"
      :queryResults="booksQueryResults"
      label="Search for a book title:"
      noResultText="No matching books found."
    ></AutoCompleteInput>
  </main>
</template>

<style scoped>
main {
  display: flex;
  width: 100%;
}
</style>
