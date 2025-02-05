<script setup lang="ts">
import { ref, defineEmits, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAssetStore } from "../stores/assetStore";

const emit = defineEmits(["close", "propertyAdded"]);
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

onMounted(() => {
  assetStore.loadAssetTypes();
  assetStore.loadAmenities();
});

// ✅ Validation logic
const validateProperty = () => {
  if (
    !newProperty.value.title ||
    !newProperty.value.type_id ||
    !newProperty.value.size
  ) {
    return "Title, Type, and Size are required.";
  }
  if (!newProperty.value.price) {
    return "Price is required.";
  }
  if (newProperty.value.bathrooms < 0 || newProperty.value.bathrooms > 10) {
    return "Bathrooms must be between 0 and 10.";
  }
  if (newProperty.value.bedrooms < 0) {
    return "Bedrooms must be at least 0.";
  }
  if (!newProperty.value.amenities.length) {
    return "At least one amenity must be selected.";
  }
  if (
    newProperty.value.description.length < 50 ||
    newProperty.value.description.length > 500
  ) {
    return "Description must be between 50 and 500 characters.";
  }

  const today = new Date();
  today.setDate(today.getDate() + 1);
  const selectedDate = new Date(newProperty.value.available_from);
  if (selectedDate < today) {
    return "Available From date must be at least one day from today.";
  }

  return null;
};

const saveProperty = async () => {
  error.value = validateProperty();
  if (error.value) return;

  try {
    await assetStore.addAsset(newProperty.value);

    emit("propertyAdded");

    await assetStore.loadAssets(route.query);

    emit("close");

  } catch (err: any) {
    console.error("Error adding property:", err);
    error.value = err.response?.data?.message || "Failed to add property.";
  }
};
</script>

<template>
  <!-- ✅ Backdrop to prevent background interaction -->
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200]"
    @click.self="emit('close')"
  >
    <!-- ✅ Modal Box -->
    <div class="bg-white p-6 rounded-lg shadow-xl w-[50rem] relative z-50">
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
        class="w-full p-2 border rounded"
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
          class="px-4 py-2 bg-green-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
