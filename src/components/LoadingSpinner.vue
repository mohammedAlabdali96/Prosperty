<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-[300]">
      <div class="flex flex-col items-center">
        <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <p class="mt-3 text-gray-700 text-sm">Loading...</p>
      </div>
    </div>
  </template>
  
  <style scoped>
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  </style>
  