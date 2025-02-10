<script setup lang="ts">
import { ref, defineEmits, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useAssetStore } from "../stores/assetStore";
import LoadingSpinner from "./LoadingSpinner.vue";

const emit = defineEmits(["close"]);
const assetStore = useAssetStore();
const route = useRoute();

const newProperty = ref({
  title: "",
  type_id: "",
  size: 0,
  street: "",
  street_number: "",
  postal_code: "",
  description: "",
  bathrooms: 0,
  bedrooms: 0,
  floor: 0,
  price: 0,
  amenities: [],
  available_from: "",
});

const error = ref<string | null>(null);

const validateProperty = () => {
  if (!newProperty.value.title) return "Title is required.";
  if (!newProperty.value.type_id) return "Type is required.";
  if (!newProperty.value.size || newProperty.value.size <= 0)
    return "Size must be greater than 0.";

  if (!newProperty.value.price || isNaN(Number(newProperty.value.price))) {
    return "Price is required and must be a valid number.";
  }

  if (
    !newProperty.value.bathrooms ||
    newProperty.value.bathrooms <= 0 ||
    newProperty.value.bathrooms > 10
  ) {
    return "Bathrooms must be an integer between 0 and 10.";
  }

  if (
    newProperty.value.description.length < 50 ||
    newProperty.value.description.length > 500
  ) {
    return "Description must be between 50 and 500 characters.";
  }

  if (!newProperty.value.street) return "Street field is required.";
  if (!newProperty.value.street_number)
    return "Street number field is required.";
  if (!newProperty.value.postal_code) return "Postal code field is required.";

  if (!newProperty.value.available_from)
    return "Available from field is required.";

  // Ensure the date format is YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(newProperty.value.available_from)) {
    return "Available From date must be in YYYY-MM-DD format.";
  }

  const today = new Date();
  today.setDate(today.getDate() + 1);
  const selectedDate = new Date(newProperty.value.available_from);
  if (selectedDate < today) {
    return "Available From date must be at least one day from today.";
  }

  if (
    !newProperty.value.amenities ||
    newProperty.value.amenities.length === 0
  ) {
    return "At least one amenity must be selected.";
  }

  return null;
};

const saveProperty = async () => {
  if (assetStore.loading) return;

  error.value = validateProperty();
  if (error.value) return;

  try {
    await assetStore.addAsset(newProperty.value);

    await assetStore.loadAssets(route.query);

    emit("close");
  } catch (err: any) {
    console.error("Error adding property:", err);
    error.value = err.response?.data?.message || "Failed to add property.";
  }
};

defineExpose({
  newProperty,
});

</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200] p-4"
    @click.self="emit('close')"
  >
    <div
      class="bg-white p-6 rounded-lg shadow-xl w-full max-w-[45rem] md:w-3/4 lg:w-1/2 xl:w-[40rem] h-auto max-h-[80vh] flex flex-col overflow-y-auto"
    >
      <h2 class="text-xl font-bold mb-4">Add New Property</h2>

      <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

      <div class="grid grid-cols-2 gap-4">
        <!-- Title -->
        <div>
          <label class="block mb-2">Title</label>
          <input
            v-model="newProperty.title"
            class="w-full p-2 border rounded"
          />
        </div>

        <!-- Type -->
        <div>
          <label class="block mb-2">Type</label>
          <select
            v-model="newProperty.type_id"
            class="w-full p-2 border rounded"
          >
            <option
              v-for="type in assetStore.assetTypes"
              :key="type.uuid"
              :value="type.uuid"
            >
              {{ type.name }}
            </option>
          </select>
        </div>

        <!-- Size -->
        <div>
          <label class="block mb-2">Size (sq.m)</label>
          <input
            v-model="newProperty.size"
            type="number"
            class="w-full p-2 border rounded"
          />
        </div>

        <!-- Price -->
        <div>
          <label class="block mb-2">Price (€)</label>
          <input
            v-model="newProperty.price"
            type="number"
            class="w-full p-2 border rounded"
          />
        </div>

        <!-- Bedrooms -->
        <div>
          <label class="block mb-2">Bedrooms</label>
          <input
            v-model="newProperty.bedrooms"
            type="number"
            class="w-full p-2 border rounded"
          />
        </div>

        <!-- Bathrooms -->
        <div>
          <label class="block mb-2">Bathrooms</label>
          <input
            v-model="newProperty.bathrooms"
            type="number"
            class="w-full p-2 border rounded"
          />
        </div>

        <!-- Floor -->
        <div>
          <label class="block mb-2">Floor</label>
          <input
            v-model="newProperty.floor"
            type="number"
            class="w-full p-2 border rounded"
          />
        </div>

        <!-- Available From -->
        <div>
          <label class="block mb-2">Available From</label>
          <input
            v-model="newProperty.available_from"
            type="date"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>

      <!-- Address -->
      <label class="block mt-4 mb-2">Address</label>
      <div class="grid grid-cols-2 gap-4">
        <input
          v-model="newProperty.street"
          class="p-2 border rounded"
          placeholder="Street"
        />
        <input
          v-model="newProperty.street_number"
          class="p-2 border rounded"
          placeholder="Number"
        />
      </div>
      <div class="mt-2">
        <input
          v-model="newProperty.postal_code"
          class="w-full p-2 border rounded"
          placeholder="Postal Code"
        />
      </div>

      <!-- Description -->
      <label class="block mt-4 mb-2">Description</label>
      <textarea
        v-model="newProperty.description"
        class="w-full p-2 border rounded h-32 min-h-[120px]"
        rows="4"
        placeholder="Enter a detailed description..."
      ></textarea>

      <!-- Amenities -->
      <label class="block mt-4 mb-2">Amenities</label>
      <div class="grid grid-cols-2 gap-2">
        <label
          v-for="amenity in assetStore.amenities"
          :key="amenity"
          class="flex items-center space-x-2"
        >
          <input
            type="checkbox"
            v-model="newProperty.amenities"
            :value="amenity"
          />
          <span>{{ amenity }}</span>
        </label>
      </div>

      <div class="flex justify-end gap-2 mt-6">
        <button
          @click="emit('close')"
          class="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
        <button
          @click="saveProperty"
          class="px-4 py-2 rounded flex items-center gap-2 transition-colors"
          :class="{
            'bg-green-500 text-white': !assetStore.loading,
            'bg-gray-300 text-gray-600 cursor-not-allowed': assetStore.loading,
          }"
          :disabled="assetStore.loading"
        >
          {{ assetStore.loading ? "Saving..." : "Save" }}
        </button>
        <LoadingSpinner v-if="assetStore.loading" class="w-5 h-5" />
      </div>
    </div>
  </div>
</template>
