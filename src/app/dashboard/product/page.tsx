import React from "react";
import ListViewLayout from "@/components/dashboard/ListViewLayout";
import { productUtils } from "@/db/utils";

const Page: React.FC = async () => {

  const dbData = await productUtils.getAll() 

  // Sample product list
  const products = dbData.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category?.name,
    image: product.image
  }));

  const data = {
    head: ['ID', 'Name', 'Price', 'Category','Image', 'Actions'],
    body: products.map((product) => [product.id, product.name, product.price, product.category, product.image]),
    actions: true
  }

  const ListViewLayoutdata = {
    data: data,
    name: "Product",
    addbtn: true
  }

  return (
    <ListViewLayout props={ListViewLayoutdata}></ListViewLayout>
  );
};

export default Page;