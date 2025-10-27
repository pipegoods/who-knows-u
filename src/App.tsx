import { useState } from 'react'
import {
  COUNTRIES_PHONE,
  COUNTRY_CO,
  getCurrentCountry,
} from '@/data/countries-phone'
import Footer from '@/components/Footer'
import { validatePhone } from '@/utils/validateNumberPhone'

export const API_WHATSAPP_URL = 'https://api.whatsapp.com/send?phone='

export default function App() {
  const [phone, setPhone] = useState<Phone>({
    dialCode: COUNTRY_CO.dial_code,
    number: '',
  })

  const [open, setOpen] = useState<boolean>(false)

  const currentCountry = getCurrentCountry(phone.dialCode)

  const removePlus = (dialCode: string) => dialCode.replace('+', '')

  return (
    <div className='container px-3 md:px-0 grid place-content-center min-h-screen text-center mx-auto'>
      <h1 className='text-3xl md:text-6xl font-bold font-dyna'>Who Knows U</h1>
      <h2 className='mt-5 text-sm md:text-lg'>
        Escribe mensajes de WhatsApp sin agregar el número a los contactos
      </h2>

      <div className='flex mb-1 mt-10 items-center gap-1 border rounded-full'>
        <aside
          className='relative inline-block ml-5'
          onClick={() => setOpen(!open)}
        >
          <section className='cursor-pointer flex items-center justify-between p-2 border border-transparent rounded-sm'>
            <img
              className='w-8 h-8'
              src={currentCountry?.image}
              alt={'Bandera de' + currentCountry?.name}
            />
            <svg
              viewBox='0 0 24 24'
              className='w-4 h-4 inline-block dark:fill-white'
            >
              <path d='m12.707 15.293 4.44-4.44a.5.5 0 0 0-.354-.853H7.207a.5.5 0 0 0-.353.854l4.439 4.439a1 1 0 0 0 1.414 0Z' />
            </svg>
          </section>
          <section
            className={`${
              open ? 'block' : 'hidden'
            } absolute w-96 px-4 py-3 z-10 border h-60 overflow-y-auto bg-white dark:bg-gray-800`}
          >
            <ul className='flex flex-col p-2 rounded-sm '>
              {COUNTRIES_PHONE.map((country) => (
                <li
                  key={country.code}
                  className='flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 dark:hover:gb-gray-800 dark:hover:text-gray-800 rounded-sm'
                  onClick={() =>
                    setPhone((prev) => ({
                      ...prev,
                      dialCode: country.dial_code,
                    }))
                  }
                >
                  <img
                    className='w-8 h-8'
                    src={country.image}
                    alt={'Bandera de ' + country.name}
                  />
                  <span>{country.name}</span>

                  <span className='text-gray-500'>{country.dial_code}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
        <span>{phone.dialCode}</span>
        <input
          className='text-sm md:text-lg flex-1 bg-transparent p-3 border border-transparent max-w-full  focus:outline-hidden '
          type='tel'
          pattern='[0-9]*'
          placeholder='Número de WhatsApp'
          onChange={(e) =>
            setPhone((prev) => ({
              ...prev,
              number: e.target.validity.valid ? e.target.value : prev.number,
            }))
          }
          value={phone.number}
        />
      </div>

      {validatePhone(phone.number) && (
        <a
          href={`${API_WHATSAPP_URL}${removePlus(phone.dialCode)}${
            phone.number
          }`}
          className='max-w-max mx-auto flex gap-2 items-center mt-5 px-10 py-2 bg-green-500 text-white rounded-full'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlSpace='preserve'
            className='inline-block w-4 h-4 fill-current'
            viewBox='0 0 52 52'
          >
            <path d='M26 0C11.663 0 0 11.663 0 26c0 4.891 1.359 9.639 3.937 13.762C2.91 43.36 1.055 50.166 1.035 50.237a.996.996 0 0 0 .27.981c.263.253.643.343.989.237l10.306-3.17A25.936 25.936 0 0 0 26 52c14.337 0 26-11.663 26-26S40.337 0 26 0zm0 50a23.94 23.94 0 0 1-12.731-3.651 1 1 0 0 0-.825-.108l-8.999 2.77a991.452 991.452 0 0 1 2.538-9.13c.08-.278.035-.578-.122-.821A23.907 23.907 0 0 1 2 26C2 12.767 12.767 2 26 2s24 10.767 24 24-10.767 24-24 24z' />
            <path d='M42.985 32.126c-1.846-1.025-3.418-2.053-4.565-2.803-.876-.572-1.509-.985-1.973-1.218-1.297-.647-2.28-.19-2.654.188a1 1 0 0 0-.125.152c-1.347 2.021-3.106 3.954-3.621 4.058-.595-.093-3.38-1.676-6.148-3.981-2.826-2.355-4.604-4.61-4.865-6.146C20.847 20.51 21.5 19.336 21.5 18c0-1.377-3.212-7.126-3.793-7.707-.583-.582-1.896-.673-3.903-.273a1.01 1.01 0 0 0-.511.273c-.243.243-5.929 6.04-3.227 13.066 2.966 7.711 10.579 16.674 20.285 18.13 1.103.165 2.137.247 3.105.247 5.71 0 9.08-2.873 10.029-8.572a.996.996 0 0 0-.5-1.038zm-12.337 7.385c-10.264-1.539-16.729-11.708-18.715-16.87-1.97-5.12 1.663-9.685 2.575-10.717.742-.126 1.523-.179 1.849-.128.681.947 3.039 5.402 3.143 6.204 0 .525-.171 1.256-2.207 3.293A.996.996 0 0 0 17 22c0 5.236 11.044 12.5 13 12.5 1.701 0 3.919-2.859 5.182-4.722a.949.949 0 0 1 .371.116c.36.181.984.588 1.773 1.104 1.042.681 2.426 1.585 4.06 2.522-.742 3.57-2.816 7.181-10.738 5.991z' />
          </svg>
          Abrir chat
        </a>
      )}

      <Footer />
    </div>
  )
}
