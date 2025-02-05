<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { debounce } from "lodash-es";
import { useAssetStore } from "../stores/assetStore";
import { useRoute, useRouter } from "vue-router";
import type { Asset, Filters } from "../types";

import AssetTable from "../components/AssetTable.vue";
import AssetFilters from "../components/AssetFilters.vue";
import Pagination from "../components/Pagination.vue";
import ActionBar from "../components/ActionBar.vue";
import AssetEditModal from "../components/AssetEditModal.vue";

const assetStore = useAssetStore();
const route = useRoute();
const router = useRouter();
const showEditModal = ref(false);

const selectedAsset = ref<Asset | null>(null);

const filters: any = ref({
  amenities: route.query["filter[amenities]"]
    ? (route.query["filter[amenities]"] as string).split(",")
    : [],
  types: route.query["filter[type_id]"]
    ? (route.query["filter[type_id]"] as string).split(",")
    : [],
  sort: route.query.sort || null,
  sortDesc: route.query.sortDesc === "true",
});

watch(
  filters,
  debounce((newFilters: Filters) => {
    console.log("Filters Changed:", newFilters);

    const newQuery: any = {
      "filter[type_id]": newFilters.types.length
        ? newFilters.types.join(",")
        : undefined,
      "filter[amenities]": newFilters.amenities.length
        ? newFilters.amenities.join(",")
        : undefined,
      page: 1,
    };

    if (newFilters.sort) {
      newQuery.sort = newFilters.sort;
      newQuery.sortDesc = newFilters.sortDesc ? "true" : "false";
    }

    if (JSON.stringify(route.query) !== JSON.stringify(newQuery)) {
      router.replace({ query: newQuery });
    }
  }, 300),
  { deep: true }
);

watch(
  () => route.query,
  debounce((newQuery: any) => {
    console.log("Route Query Changed:", newQuery);
    assetStore.loadAssets(newQuery);
  }, 300),
  { deep: true }
);

const closeEditModal = () => {
  selectedAsset.value = null;
  showEditModal.value = false;
};

onMounted(() => {
  console.log("run");
  assetStore.loadAssets(route.query);
});
</script>

<template>
  <div class="m-10">
    <h1 class="text-2xl font-bold py-4">List of Properties</h1>

    <AssetFilters v-model:filters="filters" />

    <ActionBar
      v-if="selectedAsset"
      :selectedAsset="selectedAsset"
      @edit="showEditModal = true"
      @clear="selectedAsset = null"
    />

    <AssetTable
      :assets="assetStore.assets"
      :selectedAsset="selectedAsset"
      @select="(asset) => (selectedAsset = asset)"
    />

    <Pagination
      v-if="assetStore.pagination"
      :pagination="assetStore.pagination"
      @changePage="(page) => router.push({ query: { ...route.query, page } })"
    />
    <AssetEditModal
      v-if="showEditModal"
      :asset="selectedAsset"
      @close="closeEditModal()"
    />
  </div>
</template>
