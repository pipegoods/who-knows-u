import { useDarkMode } from '@/hooks/useDarkMode'
import DarkModeIcon from '@/icons/DarkModeIcon'
import LightModeIcon from '@/icons/LightModeIcon'

export default function DarkModeToggle() {
  const { isDark, toggle: toggleDarkMode } = useDarkMode()

  return (
    <button
      onClick={toggleDarkMode}
      className='absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200 z-10'
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
    >
      {isDark ? (
        <LightModeIcon className='w-6 h-6 text-yellow-500' />
      ) : (
        <DarkModeIcon className='w-6 h-6 text-gray-700' />
      )}
    </button>
  )
}

