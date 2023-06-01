'use client'

import { api } from "@/app/lib/api";
import { FormEvent } from "react";
import { FaPhone } from "react-icons/fa";
import { useRouter } from 'next/navigation'

export function PhoneForm() {
    const router = useRouter()
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
        console.log({ data })
        router.push('login')
    }


    return (
        <form
            onSubmit={handleVerifyPhone}
            className='flex flex-col space-y-4'
        >
            <div className=''>
                <p className='font-medium'>Telefone</p>
                <div className='relative border'>
                    <span className='absolute flex inset-y-0 items-center pl-4 text-gray-400'>
                        <FaPhone />
                    </span>
                    <textarea
                        name='phone'
                        spellCheck={false}
                        className='flex flex-1 w-full border shadow-[4px_4px_0px_1px_rgba(0,0,0,0.3)] border-black outline-none placeholder-gray-400 pl-9 pr-4 p-2 rounded-sm transition focus:ring-2 focus:ring-emerald-950-300'
                        placeholder=' Telefone...' />
                </div>
            </div>

            <button
                className='border shadow-[4px_4px_0px_1px_rgba(0,0,0,0.3)] shadow-black  border-black bg-blue-500 font-medium inline-flex items-center px-3 py-1 justify-center text-white transition hover:bg-green-500'
                type='submit'
            >
                Continuar
            </button>
        </form>
    )
}