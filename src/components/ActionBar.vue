<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ isActionBarVisible: any }>();

const emit = defineEmits(["edit", "clearSelection", "addProperty"]);

</script>

<template>
  <div class="pb-4 flex gap-2">
    <button
      @click="emit('addProperty')"
      class="px-4 py-2 bg-green-500 text-white rounded"
    >
      Add Property
    </button>

    <template v-if="isActionBarVisible">
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
    </template>
  </div>
</template>
