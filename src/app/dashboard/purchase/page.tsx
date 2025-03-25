"use client";
import React, { useState, ChangeEvent } from "react";
import { useSidebar } from "@/context/context";
import { useUpdateSidebarItems } from "@/components/dashboard/MainLayout";
import ListViewLayout from "@/components/dashboard/ListViewLayout";


const Page = () => {

  const purchases = [
    { id: "001", client: "001", IGN: "Fammy001", product: "Key x 1", quantity: "1", coupon: "None", date: "24-03-2025", amount: "10" },
    { id: "002", client: "010", IGN: "MyMADmAX", product: "Rank - VIP", quantity: "1", coupon: "DIS10", date: "24-03-2025", amount: "100" },
    { id: "003", client: "015", IGN: "HEHEXD", product: "MVP", quantity: "1", coupon: "None", date: "24-03-2025", amount: "1000" },
  ];

  const data = {
    head: ["ID", "Date", "Client", "IGN", "Product", "Amount"],
    body: purchases.map((purchase) => [
      purchase.id,
      purchase.date,
      purchase.client,
      purchase.IGN,
      purchase.product,
      purchase.amount,
    ]),
    actions: false,
  };

  const listViewLayoutData = {
    name: "Purchase",
    addbtn: true,
    data: data,
  }

  return (
    <>
      <ListViewLayout props={listViewLayoutData}></ListViewLayout>
      </>
  );
};

export default Page;