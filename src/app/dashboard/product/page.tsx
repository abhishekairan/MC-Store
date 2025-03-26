import React from "react";
import ListViewLayout from "@/components/dashboard/ListViewLayout";

interface FormData {
  name: string;
  email: string;
  id: string;
}

const Page: React.FC = () => {

  // Sample product list
  const products = [
    { id: '001', name: 'Product 1', price: '$10', quantity: 100 },
    { id: '002', name: 'Product 2', price: '$20', quantity: 200 },
    { id: '003', name: 'Product 3', price: '$30', quantity: 300 },
  ];

  const data = {
    head: ['ID', 'Name', 'Price', 'Quantity', 'Actions'],
    body: products.map((product) => [product.id, product.name, product.price, product.quantity]),
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