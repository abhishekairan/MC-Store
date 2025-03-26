import React from "react";
import ListViewLayout from "@/components/dashboard/ListViewLayout";
import { discountUtils } from "@/db/utils";

const Page: React.FC = async () => {
  
  const dbData = await discountUtils.getAll()

  // Sample product list
  const products = dbData.map((product) => ({
    id: product.id,
    price: product.amount,
    discount: product.type
  }));

  const data = {
    head: ['ID', 'Price', 'Type', 'Actions'],
    body: products.map((product) => [product.id, product.price, product.discount]),
    actions: true
  }
  
  const listViewLayoutData = {
    name: 'Discount',
    addbtn: true,
    data: data
  }


  return (
    <>
      <ListViewLayout props={listViewLayoutData}></ListViewLayout>
      </>
  );
};

export default Page;

