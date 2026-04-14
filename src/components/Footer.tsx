import React from 'react'

export default function Footer() {

  return (
    <footer className='w-full py-3 sm:py-4 text-center'>
      <div className='space-y-1.5 sm:space-y-2 pt-2 border-t border-border-soft'>
        <div className='text-xs text-text-tertiary'>
          <p>
            Hecho por{' '}
            <a
              href='https://github.com/pipegoods'
              target='_blank'
              rel='noopener noreferrer'
              className='font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 focus-ring rounded-sm px-1'
            >
              pipegoods
            </a>
          </p>
          <p className='mt-0.5'>&copy; {new Date().getFullYear()} Who Knows U</p>
        </div>
      </div>
    </footer>
  )
}
