<script setup lang="ts">
import { computed } from "vue";
import type { AutoCompleteOption } from "./AutoCompleteOption";

const props = withDefaults(
  defineProps<{
    label: string;
    modelValue: string;
    queryResults: AutoCompleteOption[];
    minimumQueryLength?: number;
    noResultText: string;
  }>(),
  {
    minimumQueryLength: 3,
  }
);

const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const queryCanAutocomplete = computed(
  () => props.modelValue.length >= props.minimumQueryLength
);
const queryHasResults = computed(() => props.queryResults.length > 0);
</script>

<template>
  <label
    >{{ label }}
    <input
      :value="props.modelValue"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      type="text"
    />
  </label>
  <template v-if="queryCanAutocomplete">
    <select v-if="queryHasResults">
      <option
        v-for="result in queryResults"
        :value="result.primaryText"
        :key="result.primaryText"
      >
        <em>{{ result.primaryText }}</em
        >{{ result.secondaryText }}
      </option>
    </select>
    <p v-if="!queryHasResults">{{ noResultText }}</p>
  </template>
  <p v-if="!queryCanAutocomplete">
    Enter {{ minimumQueryLength }} or more letters to see autocomplete options.
  </p>
</template>

<style scoped>
/** TODO: add style for component */
</style>
