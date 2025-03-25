"use client"

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface data {
    head: string[],
    body: (string | number)[][],
    actions: boolean
}

const Table: React.FC<{props: data}>= ({props}) => {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <div className="flex flex-col mt-5">
    <table className="mx-auto w-full text-left gap-6 border-separate border-spacing-y-5">
      <thead>
        <tr key="headofthetable" className="text-2xl" >
            {props.head.map((head) => (
                <th className="border-gray-600 border-y first:border-l last:border-r p-2">{head}</th>
            ))}
        </tr>
      </thead>
      <tbody className="">
        {props.body.map((row) => (
          <tr key={row[0]}>
            {row.map((cell) => (
                <td className="text-gray-300 border-y first:border-l last:border-r border-gray-600 p-2">{cell}</td>
            ))}
            {props.actions && <td className="border-y border-r border-gray-600 p-2">
              <button onClick={() => {router.push(`${pathname}/${row[0]}`)}} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Table
