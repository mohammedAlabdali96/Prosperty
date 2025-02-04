<script setup>
const message = "Welcome to Prosperty App!";
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold text-red-600">{{ message }}</h1>
    <button class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
      Click Me!
    </button>
  </div>
</template>
