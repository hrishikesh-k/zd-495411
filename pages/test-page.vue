<script setup lang="ts">
/**
 * Test page for ISR caching.
 * This page fetches data during SSR and should be cached according to routeRules.
 */

const config = useRuntimeConfig()
const { data, error } = await useFetch('/api/timestamp')

// Generate a server-side timestamp
const serverRenderTime = new Date().toISOString()
const clientRenderTime = ref('')

onMounted(() => {
  clientRenderTime.value = new Date().toISOString()
})
</script>

<template>
  <div style="max-width: 800px; margin: 2rem auto; padding: 2rem; font-family: system-ui;">
    <h1>ISR Cache Test Page - Server + Client-Side Data</h1>
    
    <div style="background: #f0f0f0; padding: 1rem; margin: 1rem 0; border-radius: 8px;">
      <h2>Configuration</h2>
      <p><strong>ISR TTL:</strong> {{ config.public.isrTtl }} seconds</p>
      <p><strong>Route:</strong> /test-page</p>
    </div>

    <div style="background: #e3f2fd; padding: 1rem; margin: 1rem 0; border-radius: 8px;">
      <h2>Server-Side Data</h2>
      <p><strong>Page rendered at:</strong> {{ serverRenderTime }}</p>
      
      <div v-if="data">
        <p><strong>API timestamp:</strong> {{ data.timestamp }}</p>
        <p><strong>API Unix time:</strong> {{ data.unixTime }}</p>
        <p><em>{{ data.message }}</em></p>
      </div>
      
      <div v-if="error" style="color: red;">
        <p><strong>Error:</strong> {{ error }}</p>
      </div>
    </div>

    <div style="background: #fff3e0; padding: 1rem; margin: 1rem 0; border-radius: 8px;">
      <h2>Client-Side Data</h2>
      <p><strong>Client rendered at:</strong> {{ clientRenderTime || 'Not yet hydrated' }}</p>
    </div>

    <div style="background: #f3e5f5; padding: 1rem; margin: 1rem 0; border-radius: 8px;">
      <h2>How to Test ISR</h2>
      <ol>
        <li>Note the timestamps above</li>
        <li>Refresh the page immediately - timestamps should remain the same (cached)</li>
        <li>Wait for {{ config.public.isrTtl }} seconds</li>
        <li>Refresh again - you should still see the old timestamp (stale-while-revalidate)</li>
        <li>Refresh once more - you should see a new timestamp (revalidated)</li>
      </ol>
      
      <button 
        @click="$router.go(0)" 
        style="background: #2196f3; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; margin-top: 1rem;"
      >
        Force Refresh
      </button>
    </div>

    <div style="margin-top: 2rem;">
      <NuxtLink to="/test-page-2" style="color: #2196f3; text-decoration: none;">
        → Go to Test Page - Server-Side Data (same ISR config)
      </NuxtLink>
      <br>
      <NuxtLink to="/test-page-short" style="color: #2196f3; text-decoration: none;">
        → Go to Test Page Short (30s TTL)
      </NuxtLink>
      <br>
      <NuxtLink to="/" style="color: #2196f3; text-decoration: none;">
        → Go to Home (no ISR)
      </NuxtLink>
    </div>
  </div>
</template>
