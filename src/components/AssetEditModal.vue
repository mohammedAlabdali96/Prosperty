<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAssetStore } from "../stores/assetStore";
import type { Asset } from "../types";

const props = defineProps<{ asset: Asset }>();
const emit = defineEmits(["close"]);

const assetStore = useAssetStore();

onMounted(() => {
  assetStore.loadAssetTypes();
});

const editableAsset = ref<Asset>({ ...props.asset });
const route = useRoute();

watch(
  () => props.asset,
  (newAsset) => {
    editableAsset.value = { ...newAsset };
  }
);

const saveChanges = async () => {
  if (!editableAsset.value) return;

  try {
    const updatedAsset = {
      ...editableAsset.value,
      type_id: editableAsset.value.type.uuid,
    };
    console.log(updatedAsset);

    await assetStore.updateAssetDetails(updatedAsset.uuid, updatedAsset);

    await assetStore.loadAssets(route.query);

    editableAsset.value.type =
      assetStore.assetTypes.find((t) => t.uuid === updatedAsset.type_id) ||
      editableAsset.value.type;

    emit("close");
  } catch (error) {
    console.error("Error updating asset:", error);
  }
};
</script>

<template>
  <div
    class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
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
      <select
        v-model="editableAsset.type.uuid"
        class="w-full p-2 border rounded mb-4"
      >
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
          class="px-4 py-2 bg-green-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
