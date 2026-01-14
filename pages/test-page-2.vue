<script setup lang="ts">
/**
 * Second test page for ISR caching.
 * This helps verify that ISR works consistently across multiple pages.
 */

const { data } = await useFetch('/api/timestamp')
const serverRenderTime = new Date().toISOString()
</script>

<template>
  <div style="max-width: 800px; margin: 2rem auto; padding: 2rem; font-family: system-ui;">
    <h1>ISR Cache Test Page - Server-Side Data</h1>
    
    <div style="background: #e8f5e9; padding: 1rem; margin: 1rem 0; border-radius: 8px;">
      <h2>Server-Side Data</h2>
      <p><strong>Page rendered at:</strong> {{ serverRenderTime }}</p>
      <p><strong>API timestamp:</strong> {{ data?.timestamp }}</p>
    </div>

    <NuxtLink to="/test-page" style="color: #2196f3; text-decoration: none;">
      ← Back to Test Page - Server + Client-Side Data
    </NuxtLink>
  </div>
</template>
