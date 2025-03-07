<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { debounce } from "lodash-es";
import { useAssetStore } from "../stores/assetStore";
import { useRoute, useRouter } from "vue-router";
import type { Asset, Filters } from "../types";

import AssetTable from "/src/components/AssetTable.vue";
import AssetFilters from "/src/components/AssetFilters.vue";
import Pagination from "/src/components/Pagination.vue";
import ActionBar from "/src/components/ActionBar.vue";
import AssetEditModal from "/src/components/AssetEditModal.vue";
import AddPropertyModal from "/src/components/AddPropertyModal.vue";
import LoadingSpinner from "/src/components/LoadingSpinner.vue";

const assetStore = useAssetStore();
const route = useRoute();
const router = useRouter();
const showEditModal = ref(false);
const showAddModal = ref(false);

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
    assetStore.loadAssets(newQuery);
  }, 300),
  { deep: true }
);

const closeEditModal = () => {
  selectedAsset.value = null;
  showEditModal.value = false;
};

const clearSelection = () => {
  selectedAsset.value = null;
};

const changePage = (page: number) => {
  router.push({ query: { ...route.query, page } });
};

const selectAsset = (asset: Asset) => {
  selectedAsset.value = asset;
};

onMounted(() => {
  assetStore.loadAssets(route.query);
});
</script>

<template>
  <div class="m-10">
    <h1 class="text-2xl font-bold py-4">List of Properties</h1>

    <AssetFilters v-model:filters="filters" />

    <ActionBar
      :isActionBarVisible="selectedAsset !== null"
      @edit="showEditModal = true"
      @clearSelection="clearSelection"
      @addProperty="showAddModal = true"
    />
    <div v-if="!assetStore.loading">
      <AssetTable
        :assets="assetStore.assets"
        :selectedAsset="selectedAsset"
        @select="selectAsset"
      />

      <Pagination
        v-if="assetStore.pagination"
        :pagination="assetStore.pagination"
        @changePage="changePage"
      />
    </div>
    <LoadingSpinner v-else />
    <AssetEditModal
      v-if="showEditModal && selectedAsset"
      :asset="selectedAsset"
      @close="closeEditModal()"
    />

    <AddPropertyModal v-if="showAddModal" @close="showAddModal = false" />
  </div>
</template>
