import React from "react";
import ListViewLayout from "@/components/dashboard/ListViewLayout";
import { transactionUtils } from "@/db/utils";

const Page: React.FC = async () => {

  const dbData = await transactionUtils.getAll()

  const purchases = dbData.map((purchase) => ({
    id: purchase.id,
    date: purchase.date,
    client: purchase.client,
    IGN: purchase.ign,
    product: purchase.product,
    amount: purchase.amount,
  }));

  const data = {
    head: ["ID", "Date", "Client", "IGN", "Product", "Amount"],
    body: purchases.map((purchase) => [
      purchase.id,
      purchase.date.toDateString(),
      purchase.client?.discordUsername,
      purchase.IGN,
      purchase.product?.name,
      purchase.amount,
    ]),
    actions: false,
  };

  // console.log(data.body);

  const listViewLayoutData = {
    name: "Purchase",
    addbtn: false,
    data: data,
  }

  return (
    <>
      <ListViewLayout props={listViewLayoutData}></ListViewLayout>
      </>
  );
};

export default Page;