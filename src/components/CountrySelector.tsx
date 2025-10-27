import { useState, useCallback, useMemo } from 'react'
import { COUNTRIES_PHONE, getCurrentCountry } from '@/data/countries-phone'
import ChevronDownIcon from '@/icons/ChevronDownIcon'

interface CountrySelectorProps {
  dialCode: string
  onDialCodeChange: (dialCode: string) => void
}

export default function CountrySelector({
  dialCode,
  onDialCodeChange,
}: CountrySelectorProps) {
  const [open, setOpen] = useState<boolean>(false)

  const currentCountry = useMemo(() => getCurrentCountry(dialCode), [dialCode])

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  const handleCountrySelect = useCallback(
    (countryDialCode: string) => {
      onDialCodeChange(countryDialCode)
      setOpen(false)
    },
    [onDialCodeChange]
  )

  return (
    <aside className='relative'>
      <section
        className='cursor-pointer flex items-center gap-1.5 px-2 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-200'
        onClick={handleToggle}
        role='button'
        tabIndex={0}
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-label='Seleccionar país'
      >
        <img
          loading='eager'
          className='w-7 h-7 rounded-sm shadow-sm'
          src={currentCountry?.image}
          alt={'Bandera de ' + currentCountry?.name}
        />
        <ChevronDownIcon
          className={`w-4 h-4 fill-gray-600 dark:fill-gray-400 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </section>

      {open && (
        <div className='absolute top-full left-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-md bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl h-64 overflow-hidden z-50'>
          <div className='p-3 h-full overflow-y-auto'>
            <div className='text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-2 mb-2'>
              Seleccionar país
            </div>
            <ul
              className='flex flex-col gap-1'
              role='listbox'
              aria-label='Lista de países'
            >
              {COUNTRIES_PHONE.map((country) => (
                <li
                  key={country.code}
                  className={`flex items-center gap-3 p-2.5 cursor-pointer rounded-xl transition-all duration-150 ${
                    dialCode === country.dial_code
                      ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800'
                      : 'hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                  onClick={() => handleCountrySelect(country.dial_code)}
                  role='option'
                  aria-selected={dialCode === country.dial_code}
                >
                  <img
                    loading='lazy'
                    className='w-8 h-8 rounded-sm shadow-sm'
                    src={country.image}
                    alt={'Bandera de ' + country.name}
                  />
                  <span className='flex-1 text-gray-900 dark:text-white text-sm font-medium'>
                    {country.name}
                  </span>
                  <span className='text-gray-500 dark:text-gray-400 text-sm font-semibold'>
                    {country.dial_code}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </aside>
  )
}
