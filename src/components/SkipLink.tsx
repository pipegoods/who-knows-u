import React from 'react'

export function SkipLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className='skip-link'
      onClick={(e) => {
        e.preventDefault()
        const target = document.querySelector(href)
        target?.scrollIntoView({ behavior: 'smooth' })
        target?.setAttribute('tabindex', '-1')
        ;(target as HTMLElement).focus()
      }}
    >
      {children}
    </a>
  )
}

export default SkipLink
