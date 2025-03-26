import React from 'react'
import ListViewLayout from '@/components/dashboard/ListViewLayout';

const page = () => {

  const coupons = [
    { id: '001', name: 'Coupons 1', description: '---', quantity: 100 },
    { id: '002', name: 'Coupons 2', description: '---', quantity: 200 },
    { id: '003', name: 'Coupons 3', description: '---', quantity: 300 },
  ]

  const data = {
    head: ['ID', 'Name', 'Description', 'Quantity', 'Actions'],
    body: coupons.map((coupon) => [coupon.id, coupon.name, coupon.description, coupon.quantity]),
    actions: true
  };

  const ListViewLayoutData = {
    name: 'Coupon',
    addbtn: true,
    data: data
  }

  return (
    <>
      <ListViewLayout props={ListViewLayoutData}></ListViewLayout>
    </>
  )
}

export default page