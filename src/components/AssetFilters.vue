<script setup lang="ts">
import { defineProps, defineEmits, watch } from "vue";
import { useAssetStore } from "../stores/assetStore";

const props = defineProps<{ filters: any }>();
const emit = defineEmits(["update:filters"]);

const assetStore = useAssetStore();

// Load asset types & amenities
assetStore.loadAssetTypes();
assetStore.loadAmenities();

// Watch for filter changes and notify parent
watch(
  props.filters,
  (newFilters) => {
    emit("update:filters", newFilters);
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col gap-4 pb-4">
    <!-- Type Filter -->
    <div class="border p-4 rounded-md shadow-sm">
      <h4 class="font-semibold mb-2">Filter by Type</h4>
      <div class="flex flex-wrap gap-2">
        <label
          v-for="type in assetStore.assetTypes"
          :key="type.value"
          class="mr-4"
        >
          <input type="checkbox" v-model="filters.types" :value="type.value" />
          {{ type.name }}
        </label>
      </div>
    </div>

    <!-- Amenities Filter -->
    <div class="border p-4 rounded-md shadow-sm">
      <h4 class="font-semibold mb-2">Filter by Amenities</h4>
      <div class="flex flex-wrap gap-2">
        <label
          v-for="amenity in assetStore.amenities"
          :key="amenity"
          class="mr-4"
        >
          <input type="checkbox" v-model="filters.amenities" :value="amenity" />
          {{ amenity }}
        </label>
      </div>
    </div>

    <!-- Sorting by Size -->
    <div class="border p-4 rounded-md shadow-sm">
      <h4 class="font-semibold mb-2">Sort by Size</h4>
      <div class="flex flex-wrap gap-4">
        <label class="flex items-center space-x-2">
          <input
            type="checkbox"
            :checked="filters.sort === 'size' && !filters.sortDesc"
            @change="
              filters.sort =
                filters.sort === 'size' && !filters.sortDesc ? null : 'size';
              filters.sortDesc = false;
            "
          />
          <span>Ascending</span>
        </label>

        <label class="flex items-center space-x-2">
          <input
            type="checkbox"
            :checked="filters.sort === 'size' && filters.sortDesc"
            @change="
              filters.sort =
                filters.sort === 'size' && filters.sortDesc ? null : 'size';
              filters.sortDesc = true;
            "
          />
          <span>Descending</span>
        </label>
      </div>
    </div>
  </div>
</template>
