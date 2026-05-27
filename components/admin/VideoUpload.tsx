'use client'

import { useRef, useState } from 'react'

interface Props {
  videos: string[]
  onChange: (videos: string[]) => void
}

interface LocalVideo {
  id: string
  preview: string
  status: 'uploading' | 'done' | 'error'
  url?: string
  error?: string
  isStream?: boolean
}

function isStreamingUrl(url: string) {
  return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com')
}

function VideoThumb({ url, onRemove }: { url: string; onRemove: () => void }) {
  const isStream = isStreamingUrl(url)
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden border border-border group bg-deep">
      {isStream ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3 text-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity={0.7}>
            <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
          </svg>
          <span className="text-muted text-[10px] break-all line-clamp-2">{url}</span>
        </div>
      ) : (
        <video src={url} className="w-full h-full object-cover" preload="metadata" />
      )}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500/90 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs hover:bg-red-600"
      >
        ×
      </button>
    </div>
  )
}

export function VideoUpload({ videos, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [urlInput, setUrlInput] = useState('')
  const [local, setLocal] = useState<LocalVideo[]>([])

  async function uploadFile(file: File): Promise<string> {
    const ext = file.name.split('.').pop()?.toLowerCase() || 'mp4'
    const safeBase = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 40)
    const fileName = `${Date.now()}_${safeBase}.${ext}`

    // Step 1: Get signed upload URL (tiny JSON request — no file body sent here)
    const res = await fetch('/api/admin/upload-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName }),
    })
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      throw new Error(d.error || 'Erro ao preparar upload')
    }
    const { signedUrl, publicUrl } = await res.json()

    // Step 2: Upload directly to Supabase — bypasses Next.js body size limit
    const uploadRes = await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type || 'video/mp4', 'x-upsert': 'false' },
    })
    if (!uploadRes.ok) throw new Error('Erro no upload do vídeo')

    return publicUrl
  }

  async function handleFiles(files: FileList) {
    const newLocals: LocalVideo[] = Array.from(files).map((f) => ({
      id: `${Date.now()}-${Math.random()}`,
      preview: URL.createObjectURL(f),
      status: 'uploading' as const,
    }))
    setLocal((prev) => [...prev, ...newLocals])

    const uploaded: string[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const loc = newLocals[i]
      try {
        const url = await uploadFile(file)
        uploaded.push(url)
        setLocal((prev) => prev.map((l) => l.id === loc.id ? { ...l, status: 'done', url } : l))
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erro'
        setLocal((prev) => prev.map((l) => l.id === loc.id ? { ...l, status: 'error', error: msg } : l))
      }
    }
    if (uploaded.length > 0) onChange([...videos, ...uploaded])
  }

  function addUrl() {
    const url = urlInput.trim()
    if (!url) return
    onChange([...videos, url])
    setUrlInput('')
  }

  function removeExisting(url: string) {
    onChange(videos.filter((v) => v !== url))
  }

  function removeLocal(id: string) {
    setLocal((prev) => prev.filter((l) => l.id !== id))
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files)
  }

  return (
    <div className="space-y-4">
      {/* Existing + uploading thumbnails */}
      {(videos.length > 0 || local.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {videos.map((url) => (
            <VideoThumb key={url} url={url} onRemove={() => removeExisting(url)} />
          ))}
          {local.map((l) => (
            <div key={l.id} className="relative aspect-video rounded-lg overflow-hidden border border-border bg-deep">
              {l.isStream ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted text-xs text-center px-2 break-all">{l.preview}</span>
                </div>
              ) : (
                <video src={l.preview} className="w-full h-full object-cover" preload="metadata" />
              )}
              {l.status === 'uploading' && (
                <div className="absolute inset-0 bg-deep/75 flex flex-col items-center justify-center gap-2">
                  <div className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                  <span className="text-muted text-[10px]">Enviando...</span>
                </div>
              )}
              {l.status === 'error' && (
                <div className="absolute inset-0 bg-red-900/80 flex flex-col items-center justify-center p-2 gap-1">
                  <span className="text-red-200 text-[10px] text-center">{l.error}</span>
                  <button type="button" onClick={() => removeLocal(l.id)} className="text-red-300 text-[10px] underline">Remover</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload de arquivo */}
      <div
        className="border-2 border-dashed border-border rounded-xl p-7 text-center hover:border-gold/40 transition-colors cursor-pointer"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" className="mx-auto mb-2 opacity-60">
          <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
        </svg>
        <p className="text-muted text-sm">Clique ou arraste vídeos aqui</p>
        <p className="text-muted/60 text-xs mt-1">MP4, WebM — múltiplos arquivos — máx 50MB cada</p>
        <input
          ref={inputRef}
          type="file"
          accept="video/mp4,video/webm,video/quicktime"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* URL (YouTube / Vimeo) */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Cole link do YouTube ou Vimeo..."
          className="input-field flex-1 text-sm"
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addUrl() } }}
        />
        <button
          type="button"
          onClick={addUrl}
          className="px-4 py-2.5 bg-gold text-deep font-semibold rounded-lg text-sm hover:bg-gold-light transition-colors whitespace-nowrap"
        >
          + Adicionar URL
        </button>
      </div>
    </div>
  )
}
