<script setup lang="ts">
/**
 * Test page with shorter ISR TTL (30 seconds).
 */

const { data } = await useFetch('/api/timestamp')
const serverRenderTime = new Date().toISOString()
</script>

<template>
  <div style="max-width: 800px; margin: 2rem auto; padding: 2rem; font-family: system-ui;">
    <h1>ISR Cache Test Page (Short TTL)</h1>
    
    <div style="background: #fff9c4; padding: 1rem; margin: 1rem 0; border-radius: 8px;">
      <h2>Configuration</h2>
      <p><strong>ISR TTL:</strong> 30 seconds (shorter for faster testing)</p>
    </div>
    
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
