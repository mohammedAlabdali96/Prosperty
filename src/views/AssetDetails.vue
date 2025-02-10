<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAssetStore } from "../stores/assetStore";
import type { Asset } from "../types";
import AssetEditModal from "/src/components/AssetEditModal.vue";
import LoadingSpinner from "/src/components/LoadingSpinner.vue";

const route = useRoute();
const router = useRouter();
const assetStore = useAssetStore();

const asset = ref<Asset | null>(null);
const showEditModal = ref(false);
const isLoading = computed(() => assetStore.loading);
const error = ref<string | null>(null);

const fetchAssetDetails = async () => {
  try {
    asset.value = await assetStore.loadAssetById(route.params.uuid as string);

    if (!asset.value) {
      error.value = "Asset not found. The asset ID may be invalid.";
    }
  } catch (err) {
    console.error("Failed to load asset:", err);
    error.value = "An error occurred while fetching asset details.";
  }
};

onMounted(fetchAssetDetails);
defineExpose({ fetchAssetDetails, showEditModal });

</script>

<template>
  <div class="p-6 sm:p-10 max-w-5xl mx-auto">
    <h1 class="text-3xl sm:text-5xl font-extrabold text-center mb-6 sm:mb-8 text-gray-800">
      Asset Details
    </h1>

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="flex w-full justify-center">
      <LoadingSpinner class="w-16 h-16" />
    </div>

    <!-- Error Message -->
    <div
      v-else-if="error"
      class="mt-6 p-4 sm:p-6 border border-red-400 bg-red-100 text-red-700 rounded text-center"
    >
      <h2 class="text-xl sm:text-2xl font-semibold">Oops! 😟</h2>
      <p class="text-sm sm:text-lg">{{ error }}</p>
      <button
        @click="router.push('/')"
        class="mt-4 px-4 sm:px-5 py-2 sm:py-3 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
      >
        Back to Assets
      </button>
    </div>

    <!-- Asset Details -->
    <div v-else-if="asset" class="bg-white shadow-lg rounded-xl p-6 sm:p-8">
      <h2 class="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
        {{ asset.title }}
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div class="space-y-4">
          <div class="p-4 border rounded-lg shadow-sm bg-gray-100">
            <span class="text-md sm:text-lg font-bold text-gray-700">Type:</span>
            <span class="text-gray-900 text-md sm:text-lg p-2">{{ asset.type.name }}</span>
          </div>

          <div class="p-4 border rounded-lg shadow-sm bg-gray-100">
            <span class="text-md sm:text-lg font-bold text-gray-700">Size:</span>
            <span class="text-gray-900 text-md sm:text-lg p-2">{{ asset.size }} sq.m</span>
          </div>

          <div class="p-4 border rounded-lg shadow-sm bg-gray-100">
            <span class="text-md sm:text-lg font-bold text-gray-700">Price:</span>
            <span class="text-gray-900 text-md sm:text-lg p-2">€{{ asset.price }}</span>
          </div>
        </div>

        <div class="space-y-4">
          <div class="p-4 border rounded-lg shadow-sm bg-gray-100">
            <span class="text-md sm:text-lg font-bold text-gray-700">Bathrooms:</span>
            <span class="text-gray-900 text-md sm:text-lg p-2">{{ asset.bathrooms }}</span>
          </div>

          <div class="p-4 border rounded-lg shadow-sm bg-gray-100">
            <span class="text-md sm:text-lg font-bold text-gray-700">Bedrooms:</span>
            <span class="text-gray-900 text-md sm:text-lg p-2">{{ asset.bedrooms }}</span>
          </div>
        </div>
      </div>

      <div class="p-4 sm:p-5 border rounded-lg shadow-sm bg-gray-100 mt-6">
        <span class="text-md sm:text-lg font-bold text-gray-700">Address:</span>
        <span class="text-gray-900 text-md sm:text-lg p-2">
          {{ asset.street }} {{ asset.street_number }}, {{ asset.postal_code }}
        </span>
      </div>

      <div class="p-4 sm:p-5 border rounded-lg shadow-sm bg-gray-100 mt-6">
        <span class="text-md sm:text-lg font-bold text-gray-700">Description:</span>
        <p class="text-gray-900 text-md sm:text-lg mt-2 leading-relaxed p-2">
          {{ asset.description }}
        </p>
      </div>

      <!-- Edit Button -->
      <div class="flex justify-center mt-6 sm:mt-8">
        <button
          @click="showEditModal = true"
          class="px-4 sm:px-6 py-2 sm:py-4 bg-blue-500 text-white text-lg sm:text-xl font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition transform hover:scale-105"
        >
          Edit Asset
        </button>
      </div>
    </div>

    <!-- Edit Modal -->
    <AssetEditModal
      v-if="showEditModal && asset"
      :asset="asset"
      @close="
        showEditModal = false;
        fetchAssetDetails();
      "
    />
  </div>
</template>
