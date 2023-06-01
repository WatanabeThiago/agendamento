import Image from 'next/image'
import { FaPhone, FaLock } from 'react-icons/fa'
import Link from 'next/link';
import Head from 'next/head';
import { SubmitButton } from '@/components/SubmitButton';
import { FormEvent } from 'react'
import { api } from './lib/api';
import { PhoneForm } from '@/components/PhoneForm';


export default function Home() {

  async function handleVerifyPhone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    formData.get('phone')
    console.table({ phone: formData.get('phone') })

    const { data } = await api.get(
      '/users',
      {
        params: {
          phone: formData.get('phone')
        }
      }
    )
    // router.push('login') 
  }

  return (
    <>
      {/* container */}
      <div className='bg-zinc-200 h-screen items-center -justify-center p-4 md:flex'>
        {/* Login Card */}
        <div className='border border-black bg-cover gap-y-64 bg-center bg-image flex flex-col items-center max-w-screen-lg overflow-hidden rounded-sm shadow-lg text-gray-600 w-full md:flex-row'>
          {/* Logo */}
          <div className='backdrop-filter flex flex-col items-center justify-center p-36 text-white w-full md:w-1/2'>

          </div>
          {/* form */}
          <div className='bg-white flex flex-col p-4 space-y-8 w-full md:w-1/2'>
            {/* Welcome */}
            <div className='flex flex-col items-start'>
              <h1 className='font-extrabold text-black text-xl'>Para quem atende com amor ❤️</h1>
              <p className='font-extralight'>Você não vende estética, você vende autoestima.</p>
            </div>

            {/* Inputs */}
            {/* Inputs */}
            <PhoneForm />
          </div>
        </div>
      </div>

    </>
  )
}
