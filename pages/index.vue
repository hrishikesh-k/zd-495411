<script setup lang="ts">
/**
 * Home page - NOT cached with ISR.
 * This serves as a control to compare with ISR-cached pages.
 */

const serverRenderTime = new Date().toISOString()
</script>

<template>
  <div style="max-width: 800px; margin: 2rem auto; padding: 2rem; font-family: system-ui;">
    <h1>ISR Test Home Page</h1>
    
    <div style="background: #ffebee; padding: 1rem; margin: 1rem 0; border-radius: 8px;">
      <h2>This Page is NOT Cached</h2>
      <p><strong>Page rendered at:</strong> {{ serverRenderTime }}</p>
      <p>This page should show a new timestamp on every refresh.</p>
    </div>

    <div style="background: #e3f2fd; padding: 1rem; margin: 1rem 0; border-radius: 8px;">
      <h2>Test ISR Pages</h2>
      <ul style="list-style: none; padding: 0;">
        <li style="margin: 0.5rem 0;">
          <NuxtLink to="/test-page" style="color: #2196f3; text-decoration: none;">
            → Test Page - Server + Client-Side Data (120s ISR)
          </NuxtLink>
        </li>
        <li style="margin: 0.5rem 0;">
          <NuxtLink to="/test-page-2" style="color: #2196f3; text-decoration: none;">
            → Test Page - Server-Side Data (120s ISR)
          </NuxtLink>
        </li>
        <li style="margin: 0.5rem 0;">
          <NuxtLink to="/test-page-short" style="color: #2196f3; text-decoration: none;">
            → Test Page Short (30s ISR)
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div style="background: #f5f5f5; padding: 1rem; margin: 1rem 0; border-radius: 8px;">
      <h2>About This Reproduction</h2>
      <p>This minimal reproduction demonstrates the ISR cache mechanic used in lq-web-apps:</p>
      <ul>
        <li>Nuxt 3 with Nitro (netlify preset)</li>
        <li>Custom Netlify plugin to set cache headers</li>
        <li>Route-based ISR configuration</li>
        <li>stale-while-revalidate strategy</li>
      </ul>
    </div>
  </div>
</template>
