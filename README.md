# Minimal ISR Cache Reproduction for Netlify

This is a minimal reproduction of the ISR cache mechanic used in the lq-web-apps project.

## The Issue

The ISR cache mechanism should:
1. Set `Netlify-CDN-Cache-Control` header with `stale-while-revalidate` 
2. Regenerate pages after the TTL expires (default: 120 seconds)
3. Serve stale content while revalidating in the background

## What This Repro Demonstrates

- Nuxt 3 with Nitro (netlify preset)
- ISR configuration via routeRules
- Custom Netlify plugin to set cache headers
- Sample API route that fetches dynamic data
- Page that uses ISR caching

## Setup

```bash
pnpm install
```

## Run Locally with Netlify Dev

```bash
pnpm netlify:dev
```

## Build for Netlify

```bash
pnpm netlify:build
```

## Deploy to Netlify

```bash
pnpm netlify:deploy
```

## Testing ISR

1. Visit `/test-page` - note the timestamp
2. Wait > 120 seconds
3. Refresh - you should see stale content immediately
4. Refresh again - you should see updated content (revalidated)

## Key Files

- `nuxt.config.ts` - Nuxt configuration with routeRules
- `server/plugins/netlify.ts` - Custom plugin that sets Netlify-CDN-Cache-Control header
- `server/api/timestamp.ts` - Sample API that returns current time
- `pages/test-page.vue` - Page that uses ISR

## Environment Variables

- `ISR_TIME_SECONDS` - TTL in seconds (default: 120)

## Expected Behavior

When visiting `/test-page`:
1. First request: Page is rendered with current timestamp
2. Subsequent requests (within TTL): Cached version is served
3. After TTL expires: Stale version is served immediately, revalidation happens in background
4. Next request: Updated version is served

## Actual Behavior (Issue)

[Describe the issue you're experiencing with ISR caching on Netlify]
