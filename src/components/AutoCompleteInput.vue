<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import AutoCompleteResult, {
  type AutoCompleteOption,
} from "./AutoCompleteResult.vue";

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

const state = reactive({ showResults: false });
const input = ref<HTMLInputElement>();

defineExpose({
  focus: () => input.value?.focus(),
});
</script>

<template>
  <div class="autocomplete-container">
    <label
      ><p>{{ label }}</p>
      <input
        :value="props.modelValue"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        type="text"
        @focus="state.showResults = true"
        @blur="state.showResults = false"
        ref="input"
      />
    </label>
    <div class="dropdown" v-if="state.showResults">
      <template v-if="queryCanAutocomplete">
        <AutoCompleteResult
          v-for="result in queryResults"
          :key="result.primaryText"
          @click="
            () => {
              emit('update:modelValue', result.primaryText);
              input?.blur();
            }
          "
          v-bind="result"
        >
        </AutoCompleteResult>
        <p v-if="!queryHasResults">{{ noResultText }}</p>
      </template>
      <div>
        <p class="prompt" v-if="!queryCanAutocomplete">
          Enter {{ minimumQueryLength }} or more letters to see autocomplete
          options.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.autocomplete-container {
  margin: 1rem;
  width: 10rem;
}
label {
  display: block;
}
input {
  background: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  width: 100%;
  font-size: 1em;
}
input:focus {
  outline: none;
  border: 1px solid var(--color-border-hover);
}
.dropdown {
  max-height: 5rem;
  overflow: auto;
  position: relative;
  background: var(--color-background-soft);
  z-index: 100;
}
</style>
