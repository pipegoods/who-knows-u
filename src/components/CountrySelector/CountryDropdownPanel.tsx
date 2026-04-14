import React, { useMemo, useRef, useState } from 'react'
import { CountryList } from './CountryList'
import { CountryDropdownPanelProps } from '@/types'
import CountryDropdownHeader from './CountryDropdownHeader'

export function CountryDropdownPanel({
  dropdownRef,
  dialCode,
  countries,
  onClose,
  onCountrySelect,
  listboxId,
}: CountryDropdownPanelProps) {
  const [query, setQuery] = useState('')
  const [dragOffset, setDragOffset] = useState(0)
  const dragStartY = useRef<number | null>(null)
  const dragStartTime = useRef<number | null>(null)
  const lastMoveY = useRef<number | null>(null)
  const lastMoveTime = useRef<number | null>(null)

  const resetDragState = () => {
    setDragOffset(0)
    dragStartY.current = null
    dragStartTime.current = null
    lastMoveY.current = null
    lastMoveTime.current = null
  }

  const filteredCountries = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return countries

    return countries.filter((country) => {
      const byName = country.name.toLowerCase().includes(normalized)
      const byDialCode = country.dial_code.replace('+', '').includes(normalized.replace('+', ''))
      const byCode = country.code.toLowerCase().includes(normalized)
      return byName || byDialCode || byCode
    })
  }, [countries, query])

  const handleDragStart = (event: React.TouchEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 640) return
    const now = performance.now()
    dragStartY.current = event.touches[0]?.clientY ?? null
    dragStartTime.current = now
    lastMoveY.current = dragStartY.current
    lastMoveTime.current = now
    setDragOffset(0)
  }

  const handleDragMove = (event: React.TouchEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 640) return
    if (dragStartY.current === null) return

    const now = performance.now()
    const currentY = event.touches[0]?.clientY ?? dragStartY.current
    const delta = Math.max(0, currentY - dragStartY.current)
    setDragOffset(Math.min(delta, 220))
    lastMoveY.current = currentY
    lastMoveTime.current = now
  }

  const handleDragEnd = () => {
    const startedAt = dragStartTime.current
    const movedAt = lastMoveTime.current
    const startedY = dragStartY.current
    const movedY = lastMoveY.current

    const elapsed = startedAt !== null && movedAt !== null
      ? Math.max(1, movedAt - startedAt)
      : 1
    const distance = startedY !== null && movedY !== null
      ? Math.max(0, movedY - startedY)
      : dragOffset
    const velocity = distance / elapsed
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
    const distanceThreshold = Math.min(140, Math.max(72, viewportHeight * 0.14))
    const velocityThreshold = viewportHeight < 700 ? 0.5 : 0.6

    const shouldClose =
      dragOffset > distanceThreshold ||
      (dragOffset > 28 && velocity > velocityThreshold)

    if (shouldClose) {
      resetDragState()
      onClose()
      return
    }

    resetDragState()
  }

  const handleDragCancel = () => {
    resetDragState()
  }

  return (
    <div
      ref={dropdownRef}
      role='dialog'
      aria-modal='true'
      aria-label='Selector de país'
      className='fixed inset-x-0 bottom-0 top-auto max-h-[min(82dvh,42rem)] bg-surface border border-border-soft border-b-0 rounded-t-2xl rounded-b-none shadow-lg z-50 overflow-hidden flex flex-col transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] animate-slide-up sm:absolute sm:inset-x-0 sm:top-full sm:bottom-auto sm:mt-2 sm:max-h-[min(70dvh,28rem)] sm:rounded-xl sm:border-b sm:animate-none motion-reduce:transition-none'
      style={{
        transform: `translateY(${dragOffset}px)`,
        transition: dragOffset > 0 ? 'none' : 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <CountryDropdownHeader
        onClose={onClose}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      />

      <div className='border-b border-border-soft p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-3'>
        <label htmlFor='country-search' className='visually-hidden'>
          Buscar país o código
        </label>
        <input
          id='country-search'
          type='text'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete='off'
          placeholder='Buscar país o código'
          className='w-full rounded-lg border border-border-soft bg-surface-subtle px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus-ring'
        />
      </div>

      {filteredCountries.length > 0 ? (
        <CountryList
          listboxId={listboxId}
          selectedDialCode={dialCode}
          onSelect={onCountrySelect}
          onClose={onClose}
          countries={filteredCountries}
        />
      ) : (
        <div className='px-4 py-6 text-sm text-text-secondary text-center'>
          No encontramos países para esa búsqueda.
        </div>
      )}
    </div>
  )
}
