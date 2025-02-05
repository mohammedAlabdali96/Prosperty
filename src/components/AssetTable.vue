<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Asset } from "../types";

const props = defineProps<{ assets: Asset[]; selectedAsset: Asset | null }>();
const emit = defineEmits(["select"]);
console.log(props);
</script>

<template>
  <div class="overflow-x-auto w-full my-8">
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2">Title</th>
          <th class="border border-gray-300 px-4 py-2">Type</th>
          <th class="border border-gray-300 px-4 py-2">Size</th>
          <th class="border border-gray-300 px-4 py-2">Address</th>
          <th class="border border-gray-300 px-4 py-2 w-56">Description</th>
          <th class="border border-gray-300 px-4 py-2">Created</th>
          <th class="border border-gray-300 px-4 py-2">Updated</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="asset in props.assets"
          :key="asset.uuid"
          :class="{ 'bg-blue-100': selectedAsset?.uuid === asset.uuid }"
          class="cursor-pointer hover:bg-gray-200"
          @click="emit('select', asset)"
        >
          <td class="border border-gray-300 px-4 py-2">{{ asset.title }}</td>
          <td class="border border-gray-300 px-4 py-2">
            {{ asset.type.name }}
          </td>
          <td class="border border-gray-300 px-4 py-2">
            {{ asset.size }} sq.m
          </td>
          <td class="border border-gray-300 px-4 py-2">
            {{ asset.street }} {{ asset.street_number }},
            {{ asset.postal_code }}
          </td>

          <!-- 🔥 Shortened description with tooltip -->
          <td class="border border-gray-300 px-4 py-2 w-56 relative group">
            <span v-if="asset.description.length > 30">
              {{ asset.description.substring(0, 30) }}...
            </span>
            <span v-else>
              {{ asset.description }}
            </span>

            <!-- Tooltip -->
            <div
              class="absolute left-0 top-0 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
              style="
                white-space: nowrap;
                z-index: 100;
                max-width: 250px;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              {{ asset.description }}
            </div>
          </td>

          <td class="border border-gray-300 px-4 py-2">
            {{ new Date(asset.created_at).toLocaleDateString() }}
          </td>
          <td class="border border-gray-300 px-4 py-2">
            {{ new Date(asset.updated_at).toLocaleDateString() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
