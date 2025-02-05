<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps<{ selectedAsset: any }>();

const emit = defineEmits(["edit", "clearSelection"]);

const isActionBarVisible = computed(() => props.selectedAsset !== null);
</script>

<template>
  <div v-if="isActionBarVisible" class="pb-4 flex gap-2">
    <button
      @click="emit('edit')"
      class="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Edit
    </button>
    <button
      @click="emit('clearSelection')"
      class="px-4 py-2 bg-gray-500 text-white rounded"
    >
      Cancel
    </button>
  </div>
</template>
