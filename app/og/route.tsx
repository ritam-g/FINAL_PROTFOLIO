import { ImageResponse } from 'next/og'

export const runtime = 'edge'

/**
 * Dynamic OG image — mirrors the health-check status card aesthetic from the Hero.
 * Served at GET /og and referenced in layout.tsx openGraph.images.
 *
 * Must be a named HTTP-method export (GET) to satisfy App Router route types.
 * The alt/size/contentType named exports are only valid in the file-based
 * opengraph-image.tsx convention — not in route.tsx.
 */
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: '#08100D',
          padding: '72px 80px',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        {/* Background grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(92,219,149,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(92,219,149,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Card container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #2E4535',
            borderRadius: '12px',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '780px',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#101A15',
              borderBottom: '1px solid #1F2D24',
              padding: '16px 24px',
              fontSize: '14px',
              color: '#7E8D86',
              fontFamily: 'monospace',
            }}
          >
            <span style={{ color: '#5CDB95', fontWeight: 700 }}>200 OK</span>
            <span>/</span>
            <span>GET /api/ritam/status</span>
            <span style={{ marginLeft: 'auto', opacity: 0.5 }}>14ms</span>
          </div>

          {/* Body */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              padding: '28px 24px',
              backgroundColor: '#172110',
            }}
          >
            {[
              { key: 'name', value: 'Ritam Maty', color: '#F0EDE4' },
              { key: 'role', value: 'Backend & Full-Stack Engineer', color: '#F0EDE4' },
              { key: 'org', value: 'iPROTECHS Commercial Solutions', color: '#F0EDE4' },
              { key: 'stack', value: 'Node.js · K8s · RAG · Redis · TypeScript', color: '#5CDB95' },
              { key: 'status', value: '● OPEN TO OPPORTUNITIES', color: '#5CDB95' },
            ].map(({ key, value, color }) => (
              <div
                key={key}
                style={{ display: 'flex', gap: '0', fontSize: '15px', fontFamily: 'monospace' }}
              >
                <span style={{ color: '#7E8D86', minWidth: '100px' }}>{key}</span>
                <span style={{ color: '#2E4535', marginRight: '8px' }}>│</span>
                <span style={{ color }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: large logotype */}
        <div
          style={{
            position: 'absolute',
            right: '80px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              fontSize: '96px',
              fontWeight: 700,
              color: '#F0EDE4',
              lineHeight: 1,
              letterSpacing: '-4px',
              fontFamily: 'sans-serif',
            }}
          >
            RM.
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#7E8D86',
              fontFamily: 'monospace',
              marginTop: '8px',
              letterSpacing: '2px',
            }}
          >
            HYDERABAD, IN
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
