import React from 'react'
import ListViewLayout from '@/components/dashboard/ListViewLayout';
import { couponUtils } from '@/db/utils';

const page: React.FC = async () => {

  const dbData = await couponUtils.getAll()

  const coupons = dbData.map((coupon) => ({
    id: coupon.id,
    name: coupon.code,
    description: coupon.amount,
    quantity: coupon.type
  }));

  const data = {
    head: ['ID', 'Name', 'Amount', 'Type', 'Actions'],
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