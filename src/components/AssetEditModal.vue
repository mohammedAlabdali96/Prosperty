<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useAssetStore } from "../stores/assetStore";
import LoadingSpinner from "./LoadingSpinner.vue";
import type { Asset } from "../types";


const props = defineProps<{ asset: Asset }>();
const emit = defineEmits(["close"]);
const route = useRoute();
const assetStore = useAssetStore();

const originalAsset = ref<Asset>({ ...props.asset });
const editableAsset = ref<Asset>({
  ...props.asset,
  type_id: props.asset.type.uuid,
});

onMounted(() => {
  assetStore.loadAssetTypes();
});

watch(
  () => props.asset,
  (newAsset) => {
    editableAsset.value = {
      ...newAsset,
      type_id: newAsset.type.uuid,
    };
  },
  { deep: true, immediate: true }
);

const selectedTypeId = computed({
  get: () => editableAsset.value.type_id,
  set: (newTypeId) => {
    editableAsset.value.type_id = newTypeId;
    editableAsset.value.type =
      assetStore.assetTypes.find((t) => t.uuid === newTypeId) ||
      editableAsset.value.type;
  },
});

const isDataChanged = computed(() => {
  const fieldsToCheck = [
    "title",
    "size",
    "price",
    "bathrooms",
    "bedrooms",
    "floor",
    "postal_code",
    "street",
    "street_number",
    "available_from",
    "description",
  ];

  return fieldsToCheck.some(
    (field) =>
      originalAsset.value[field as keyof Asset] !==
      editableAsset.value[field as keyof Asset]
  );
});

const isTypeChanged = computed(() => {
  return originalAsset.value.type.uuid !== editableAsset.value.type_id;
});

const isChanged = computed(() => isDataChanged.value || isTypeChanged.value);

const saveChanges = async () => {
  if (!editableAsset.value || assetStore.loading) return;

  try {
    const updatedAsset = {
      ...editableAsset.value,
    };

    await assetStore.updateAssetDetails(updatedAsset.uuid, updatedAsset);
    await assetStore.loadAssets(route.query);

    emit("close");
  } catch (error) {
    console.error("Error updating asset:", error);
  }
};
</script>

<template>
  <div
    class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-[200] overflow-x-scroll"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-[40rem]">
      <h2 class="text-xl font-bold mb-4">Edit Asset</h2>

      <!-- Title -->
      <label class="block mb-2">Title</label>
      <input
        v-model="editableAsset.title"
        class="w-full p-2 border rounded mb-4"
      />

      <!-- Type (Dropdown) -->
      <label class="block mb-2">Type</label>
      <select v-model="selectedTypeId" class="w-full p-2 border rounded mb-4">
        <option
          v-for="type in assetStore.assetTypes"
          :key="type.uuid"
          :value="type.uuid"
        >
          {{ type.name }}
        </option>
      </select>

      <!-- Size -->
      <label class="block mb-2">Size (sq.m)</label>
      <input
        v-model="editableAsset.size"
        class="w-full p-2 border rounded mb-4"
        type="number"
      />

      <!-- Address -->
      <label class="block mb-2">Address</label>
      <div class="grid grid-cols-3 gap-2 mb-4">
        <input
          v-model="editableAsset.street"
          class="p-2 border rounded"
          placeholder="Street"
        />
        <input
          v-model="editableAsset.street_number"
          class="p-2 border rounded"
          placeholder="Number"
        />
        <input
          v-model="editableAsset.postal_code"
          class="p-2 border rounded"
          placeholder="Postal Code"
        />
      </div>

      <!-- Description -->
      <label class="block mb-2">Description</label>
      <textarea
        v-model="editableAsset.description"
        class="w-full p-2 border rounded mb-4"
      ></textarea>

      <!-- Created & Updated (Read-Only) -->
      <div class="grid grid-cols-2 gap-2 mb-4">
        <div>
          <label class="block mb-2">Created</label>
          <input
            :value="new Date(editableAsset.created_at).toLocaleDateString()"
            class="w-full p-2 border rounded bg-gray-100"
            disabled
          />
        </div>
        <div>
          <label class="block mb-2">Updated</label>
          <input
            :value="new Date(editableAsset.updated_at).toLocaleDateString()"
            class="w-full p-2 border rounded bg-gray-100"
            disabled
          />
        </div>
      </div>
      <LoadingSpinner v-if="assetStore.loading" />

      <!-- Action Buttons -->
      <div class="flex justify-end gap-2">
        <button
          @click="emit('close')"
          class="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
        <button
          @click="saveChanges"
          class="px-4 py-2 rounded flex items-center gap-2 transition-colors"
          :class="{
            'bg-green-500 text-white': isChanged && !assetStore.loading,
            'bg-gray-300 text-gray-600 cursor-not-allowed':
              !isChanged || assetStore.loading,
          }"
          :disabled="!isChanged"
        >
          {{ assetStore.loading ? "Saving..." : "Save" }}
        </button>
      </div>
    </div>
  </div>
</template>
