// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-13',

  devtools: { enabled: true },

  nitro: {
    preset: 'netlify',
  },

  /**
   * Route rules for ISR
   * The 'isr' property defines the time in seconds before regeneration
   */
  routeRules: {
    '/test-page': {
      isr: parseInt(process.env.ISR_TIME_SECONDS ?? '', 10) || 120,
    },
    '/test-page-2': {
      isr: parseInt(process.env.ISR_TIME_SECONDS ?? '', 10) || 120,
    },
    // Test with different TTL
    '/test-page-short': {
      isr: 30, // 30 seconds
    },
  },

  runtimeConfig: {
    public: {
      isrTtl: parseInt(process.env.ISR_TIME_SECONDS ?? '', 10) || 120,
    },
  },
})
