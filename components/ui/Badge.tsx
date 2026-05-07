import type { BadgeType } from '@/lib/types'

interface BadgeProps {
  type: BadgeType
  className?: string
}

const STYLES: Record<BadgeType, string> = {
  'Venda':      'bg-gold text-deep',
  'Aluguel':    'bg-blue-500/90 text-white',
  'Lançamento': 'bg-emerald-500/85 text-white',
}

export function Badge({ type, className = '' }: BadgeProps) {
  return (
    <span className={`text-[0.68rem] font-semibold tracking-widest uppercase px-3 py-1 rounded-full ${STYLES[type]} ${className}`}>
      {type}
    </span>
  )
}
