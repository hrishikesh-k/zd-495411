/**
 * Simple API endpoint that returns the current timestamp.
 * This simulates fetching dynamic data that should be cached via ISR.
 */
export default defineEventHandler(() => {
  const now = new Date()
  console.log(`[API] Timestamp requested at: ${now.toISOString()}`)
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/a07115fa-84f8-430b-ab1f-d560bedf0a72',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'timestamp.ts:10',message:'API timestamp called',data:{timestamp:now.toISOString(),unixTime:now.getTime()},timestamp:Date.now(),sessionId:'debug-session',runId:'initial',hypothesisId:'H2'})}).catch(()=>{});
  // #endregion
  
  return {
    timestamp: now.toISOString(),
    unixTime: now.getTime(),
    message: 'This timestamp was generated on the server',
  }
})
