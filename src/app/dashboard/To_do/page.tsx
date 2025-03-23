"use client"
import React from 'react'
import Link from 'next/link';
const TO_do = () => {
  return (
    <div className='container p-10 ml-60  border-x-2 border-y-4 align-middle rounded-xl border-gray-700 w-2/5 h-full mt-10 '>

      <Link href="/dashboard/To_do/discount">  <div className="container animate-pulse   ml-9 border-black  flex-shrink-2 text-center  border-x-1 border-y-2 rounded-md w-60 h-10 mt-8">Discount</div></Link>
      <Link href="/dashboard/To_do/coupon">  <div className="container animate-pulse  ml-9 border-black  text-center  border-x-1 border-y-2 rounded-md w-60 h-10 mt-5">Coupon</div></Link>
    </div>
  )
}

export default TO_do