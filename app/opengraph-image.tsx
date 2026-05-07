import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Velória Imóveis — Alto Padrão em Belo Horizonte'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #09111F 0%, #0D1826 60%, #091522 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gold top accent bar */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '5px',
          background: 'linear-gradient(90deg, #9A7A34, #C9A84C, #E2C06A, #C9A84C, #9A7A34)',
        }} />

        {/* Right glow */}
        <div style={{
          position: 'absolute',
          top: '-120px', right: '-120px',
          width: '560px', height: '560px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.13) 0%, transparent 70%)',
        }} />

        {/* Bottom-left glow */}
        <div style={{
          position: 'absolute',
          bottom: '-80px', left: '-80px',
          width: '360px', height: '360px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }} />

        {/* Grid dots pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(201,168,76,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        {/* Logo + CRECI badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '44px' }}>
          {/* Diamond logo */}
          <div style={{
            width: '56px', height: '56px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1.5px solid rgba(201,168,76,0.5)',
            borderRadius: '12px',
            background: 'rgba(201,168,76,0.08)',
          }}>
            <svg width="34" height="34" viewBox="0 0 38 38" fill="none">
              <polygon points="19,4 34,20 19,28 4,20" fill="none" stroke="#C9A84C" strokeWidth="1.8"/>
              <polygon points="19,10 29,20 19,25 9,20" fill="#C9A84C" opacity=".3"/>
              <line x1="19" y1="4" x2="19" y2="34" stroke="#C9A84C" strokeWidth="1.2" opacity=".5"/>
            </svg>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: '999px',
            padding: '6px 16px',
          }}>
            <div style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: '#C9A84C',
            }} />
            <span style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '3px', fontFamily: 'sans-serif', fontWeight: 600 }}>
              IMÓVEIS DE ALTO PADRÃO
            </span>
          </div>
        </div>

        {/* Main title */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
          <span style={{
            color: '#F5F0E8',
            fontSize: '86px',
            fontWeight: 700,
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
            letterSpacing: '-1px',
          }}>
            Velória
          </span>
          <span style={{
            color: '#C9A84C',
            fontSize: '86px',
            fontWeight: 700,
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
            letterSpacing: '-1px',
          }}>
            Imóveis
          </span>
        </div>

        {/* Subtitle */}
        <div style={{
          color: '#8A97A8',
          fontSize: '22px',
          marginBottom: '56px',
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          letterSpacing: '0.5px',
        }}>
          Conectando pessoas aos melhores imóveis de Belo Horizonte.
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '40px' }}>
          {[
            { valor: '340+',   label: 'Imóveis' },
            { valor: '15 anos', label: 'de Mercado' },
            { valor: '2.800+', label: 'Clientes' },
            { valor: '98%',    label: 'Satisfação' },
          ].map(stat => (
            <div key={stat.label} style={{
              display: 'flex', flexDirection: 'column',
              borderLeft: '2px solid rgba(201,168,76,0.35)',
              paddingLeft: '18px',
            }}>
              <span style={{
                color: '#C9A84C',
                fontSize: '26px',
                fontWeight: 700,
                fontFamily: 'Georgia, serif',
                lineHeight: 1,
              }}>
                {stat.valor}
              </span>
              <span style={{
                color: '#8A97A8',
                fontSize: '12px',
                marginTop: '5px',
                fontFamily: 'sans-serif',
                letterSpacing: '1px',
              }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div style={{
          position: 'absolute',
          bottom: '44px', right: '80px',
          color: 'rgba(138,151,168,0.6)',
          fontSize: '15px',
          fontFamily: 'sans-serif',
          letterSpacing: '2px',
        }}>
          veloriaimoveis.com.br
        </div>
      </div>
    ),
    { ...size }
  )
}
