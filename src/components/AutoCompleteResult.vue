<script setup lang="ts">
export interface AutoCompleteOption {
  primaryText: string;
  secondaryText?: string;
}

const props = defineProps<AutoCompleteOption>();
const emit = defineEmits<{ (e: "click"): void }>();
</script>

<template>
  <div
    class="result"
    @mousedown="$event.preventDefault()"
    @mouseup="
      () => {
        emit('click');
      }
    "
  >
    <h3>{{ props.primaryText }}</h3>
    <h4>{{ props.secondaryText }}</h4>
  </div>
</template>

<style scoped>
.result {
  cursor: pointer;
}
.result:hover {
  background: var(--color-background);
}
</style>
