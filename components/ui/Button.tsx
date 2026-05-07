import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  children: ReactNode
  className?: string
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }

type Props = ButtonProps | AnchorProps

const VARIANT_STYLES: Record<Variant, string> = {
  primary: 'bg-gold text-deep hover:bg-gold-light',
  outline: 'border border-border text-gold hover:bg-gold/10 hover:border-gold',
  ghost:   'text-muted hover:text-gold',
}

const SIZE_STYLES: Record<Size, string> = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-7 py-3.5',
}

export function Button({ variant = 'primary', size = 'md', icon, children, className = '', ...props }: Props) {
  const base = `inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`

  if ((props as AnchorProps).as === 'a') {
    const { as: _, ...rest } = props as AnchorProps
    return <a className={base} {...rest}>{icon}{children}</a>
  }

  const { as: _, ...rest } = props as ButtonProps
  return <button className={base} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>{icon}{children}</button>
}
