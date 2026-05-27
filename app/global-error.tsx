'use client'

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          background: '#070F1C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 36,
              height: 36,
              border: '2px solid rgba(201,168,76,0.2)',
              borderTopColor: '#C9A84C',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 20px',
            }}
          />
          <p style={{ color: '#9CA3AF', fontSize: 14, marginBottom: 20 }}>
            Carregando...
          </p>
          <button
            onClick={reset}
            style={{
              background: '#C9A84C',
              color: '#070F1C',
              border: 'none',
              borderRadius: 8,
              padding: '10px 28px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Tentar novamente
          </button>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </body>
    </html>
  )
}
