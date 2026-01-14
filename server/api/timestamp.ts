/**
 * Simple API endpoint that returns the current timestamp.
 * This simulates fetching dynamic data that should be cached via ISR.
 */
export default defineEventHandler(() => {
  const now = new Date()
  console.log(`[API] Timestamp requested at: ${now.toISOString()}`)

  return {
    timestamp: now.toISOString(),
    unixTime: now.getTime(),
    message: 'This timestamp was generated on the server',
  }
})
