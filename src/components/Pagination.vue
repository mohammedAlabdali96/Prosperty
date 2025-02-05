<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps<{ pagination: any }>();
const emit = defineEmits(["changePage"]);

const hasPrev = computed(() => props.pagination?.prev_page_url !== null);
const hasNext = computed(() => props.pagination?.next_page_url !== null);
</script>

<template>
  <div class="flex justify-around mt-4">
    <button
      @click="emit('changePage', props.pagination.current_page - 1)"
      :disabled="!hasPrev"
      class="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
    >
      Previous
    </button>

    <span v-if="props.pagination">
      Page {{ props.pagination.current_page }} of
      {{ props.pagination.last_page }}
    </span>

    <button
      @click="emit('changePage', props.pagination.current_page + 1)"
      :disabled="!hasNext"
      class="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>
