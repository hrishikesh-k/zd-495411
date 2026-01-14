/**
 * Ce plugin Nitro permet de personaliser le comportement de Nitro sur Netlify.
 */

import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { getResponseStatus, setResponseHeader, getResponseHeaders } from 'h3'
import type { H3Event } from 'h3'
import type { CacheOptions } from 'nitropack'
import { getRouteRules } from '#imports'

export default defineNitroPlugin((nitroApp) => {
  const defaultStaleMaxAgeSeconds = 60 * 60 * 24 * 7 // 7 jours

  /**
   * Valeur maximale qu'une cache doit retourner si l'un de ses calculs 'overflow'.
   * S'applique à toute utilisation de "Age" dans les headers.
   */
  const maxStaleAge = 2 ** 31

  /**
   * Ajoute le header Netlify-CDN-Cache-Control pour les pages avec ISR
   * Normalement, le preset 'netlify' devrait le prendre en charge, mais il n'ajoute pas la portion
   * `stale-while-revalidate`, qui est attendu pour atteindre nos objectifs de performance.
   * Si la valeur de maxStaleAge est définie à -1, alors on utilise la valeur de 2**31.
   *
   * @see {@link https://docs.netlify.com/platform/caching/#stale-while-revalidate-directive}
   */
  nitroApp.hooks.hook('beforeResponse', async (event: H3Event) => {
    const routeRules = await getRouteRules(event)
    const statusCode = getResponseStatus(event)
    const matchedPath = event.context.matchedRoute?.path

    if (statusCode !== 200 && routeRules?.isr) {
      console.log('Netlify-caching - TTL:', routeRules?.isr)
      console.log(getResponseHeaders(event))
      console.log(event?.req?.url)
    }

    if (statusCode === 200 && matchedPath && matchedPath !== '/__nuxt_error') {
      /**
       * Ajoute un cookie pour éviter des problèmes liées à PRGATE-2554.
       *
       * @see {@link https://github.com/unjs/nitro/issues/1938}
       */
      setResponseHeader(event, 'Set-Cookie', 'appCookie=1; Path=/;')
      setResponseHeader(event, 'set-Cookie', 'appCookie=1; Path=/;')

      console.log('Netlify-caching: Vérifier si route rule est ISR')

      if (routeRules?.isr) {
        const { staleMaxAge, maxAge } = routeRules.cache as CacheOptions
        const headerMaxAge = (maxAge ?? routeRules.isr === true) ? 0 : routeRules.isr
        const headerStaleMaxAge = staleMaxAge === -1 ? maxStaleAge : (staleMaxAge ?? defaultStaleMaxAgeSeconds)

        console.log(`Netlify-caching: Setting Netlify-CDN-Cache-Control ${matchedPath}`)
        setResponseHeader(
          event,
          'Netlify-CDN-Cache-Control',
          `public, max-age=${headerMaxAge}, stale-while-revalidate=${headerStaleMaxAge}`,
        )
      }
    }
  })
})
