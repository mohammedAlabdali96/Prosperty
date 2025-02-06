<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAssetStore } from "../stores/assetStore";
import AssetEditModal from "../components/AssetEditModal.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const route = useRoute();
const router = useRouter();
const assetStore = useAssetStore();

const asset = ref(null);
const showEditModal = ref(false);
const isLoading = computed(() => assetStore.loading);

const fetchAssetDetails = async () => {
  try {
    asset.value = await assetStore.loadAssetById(route.params.uuid as string);
  } catch (error) {
    console.error("Failed to load asset:", error);
  }
};

onMounted(fetchAssetDetails);
</script>

<template>
  <div class="p-8 max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold text-center mb-6">Asset Details</h1>

    <div v-if="isLoading" class="flex justify-center mt-6">
      <LoadingSpinner class="w-12 h-12" />
    </div>

    <div v-else-if="asset" class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-3xl font-semibold text-gray-800 mb-4">
        {{ asset.title }}
      </h2>

      <div class="grid grid-cols-2 gap-6">
        <div class="space-y-4">
          <div class="p-4 border rounded-lg shadow-sm bg-gray-50">
            <span class="font-semibold text-gray-700">Type:</span>
            <span class="text-gray-900">{{ asset.type.name }}</span>
          </div>

          <div class="p-4 border rounded-lg shadow-sm bg-gray-50">
            <span class="font-semibold text-gray-700">Size:</span>
            <span class="text-gray-900">{{ asset.size }} sq.m</span>
          </div>

          <div class="p-4 border rounded-lg shadow-sm bg-gray-50">
            <span class="font-semibold text-gray-700">Price:</span>
            <span class="text-gray-900">€{{ asset.price }}</span>
          </div>
        </div>

        <div class="space-y-4">
          <div class="p-4 border rounded-lg shadow-sm bg-gray-50">
            <span class="font-semibold text-gray-700">Bathrooms:</span>
            <span class="text-gray-900">{{ asset.bathrooms }}</span>
          </div>

          <div class="p-4 border rounded-lg shadow-sm bg-gray-50">
            <span class="font-semibold text-gray-700">Bedrooms:</span>
            <span class="text-gray-900">{{ asset.bedrooms }}</span>
          </div>

          <div class="p-4 border rounded-lg shadow-sm bg-gray-50">
            <span class="font-semibold text-gray-700">Floor:</span>
            <span class="text-gray-900">{{ asset.floor }}</span>
          </div>
        </div>
      </div>

      <div class="p-4 border rounded-lg shadow-sm bg-gray-50 mt-6">
        <span class="font-semibold text-gray-700">Address:</span>
        <span class="text-gray-900">
          {{ asset.street }} {{ asset.street_number }}, {{ asset.postal_code }}
        </span>
      </div>

      <div class="p-4 border rounded-lg shadow-sm bg-gray-50 mt-6">
        <span class="font-semibold text-gray-700">Description:</span>
        <p class="text-gray-900">{{ asset.description }}</p>
      </div>

      <div class="flex justify-center mt-6">
        <button
          @click="showEditModal = true"
          class="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Edit Asset
        </button>
      </div>
    </div>

    <AssetEditModal
      v-if="showEditModal"
      :asset="asset"
      @close="
        showEditModal = false;
        fetchAssetDetails();
      "
    />
  </div>
</template>
