'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

interface Props {
  images: string[]
  onChange: (images: string[]) => void
}

interface LocalImage {
  id: string
  preview: string
  status: 'uploading' | 'done' | 'error'
  url?: string
  error?: string
}

export function ImageUpload({ images, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [local, setLocal] = useState<LocalImage[]>([])

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    if (!res.ok) {
      const d = await res.json()
      throw new Error(d.error || 'Erro no upload')
    }
    const { url } = await res.json()
    return url
  }

  async function handleFiles(files: FileList) {
    const newLocals: LocalImage[] = Array.from(files).map((f) => ({
      id: `${Date.now()}-${Math.random()}`,
      preview: URL.createObjectURL(f),
      status: 'uploading' as const,
    }))

    setLocal((prev) => [...prev, ...newLocals])

    const uploaded: string[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const local = newLocals[i]
      try {
        const url = await uploadFile(file)
        uploaded.push(url)
        setLocal((prev) =>
          prev.map((l) => (l.id === local.id ? { ...l, status: 'done', url } : l))
        )
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erro'
        setLocal((prev) =>
          prev.map((l) => (l.id === local.id ? { ...l, status: 'error', error: msg } : l))
        )
      }
    }

    if (uploaded.length > 0) {
      onChange([...images, ...uploaded])
    }
  }

  function removeExisting(url: string) {
    onChange(images.filter((u) => u !== url))
  }

  function removeLocal(id: string) {
    setLocal((prev) => prev.filter((l) => l.id !== id))
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files)
  }

  return (
    <div className="space-y-3">
      {/* Existing images */}
      {(images.length > 0 || local.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((url) => (
            <div key={url} className="relative aspect-video rounded-lg overflow-hidden border border-border group">
              <Image src={url} alt="" fill className="object-cover" sizes="200px" />
              <button
                type="button"
                onClick={() => removeExisting(url)}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500/90 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}

          {local.map((l) => (
            <div key={l.id} className="relative aspect-video rounded-lg overflow-hidden border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.preview} alt="" className="w-full h-full object-cover" />
              {l.status === 'uploading' && (
                <div className="absolute inset-0 bg-deep/70 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                </div>
              )}
              {l.status === 'error' && (
                <div className="absolute inset-0 bg-red-900/70 flex flex-col items-center justify-center p-1">
                  <span className="text-red-300 text-[10px] text-center leading-tight">{l.error}</span>
                  <button
                    type="button"
                    onClick={() => removeLocal(l.id)}
                    className="mt-1 text-red-300 text-[10px] underline"
                  >
                    Remover
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-gold/40 transition-colors cursor-pointer"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" className="mx-auto mb-3 opacity-60">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <p className="text-muted text-sm">
          Clique ou arraste imagens aqui
        </p>
        <p className="text-muted/60 text-xs mt-1">JPG, PNG, WebP — múltiplas imagens</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>
    </div>
  )
}
