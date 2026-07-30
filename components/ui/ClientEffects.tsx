'use client'

import dynamic from 'next/dynamic'

/*
 * CursorSpotlight and ScrollProgress touch browser-only APIs (mousemove,
 * scroll position) and must never render on the server.
 *
 * `dynamic(..., { ssr: false })` is only legal inside a Client Component.
 * layout.tsx has to stay a Server Component — it exports `metadata`, and
 * Next.js throws if a component exporting metadata has 'use client' — so
 * the ssr:false imports live here instead, in a small Client Component
 * that the Server Component layout.tsx can safely render.
 */

const CursorSpotlight = dynamic(
  () => import('@/components/ui/CursorSpotlight').then((m) => ({ default: m.CursorSpotlight })),
  { ssr: false }
)

const ScrollProgress = dynamic(
  () => import('@/components/ui/ScrollProgress').then((m) => ({ default: m.ScrollProgress })),
  { ssr: false }
)

export function ClientEffects() {
  return (
    <>
      <CursorSpotlight />
      <ScrollProgress />
    </>
  )
}
