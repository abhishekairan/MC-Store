import React from "react";
import ListViewLayout from "@/components/dashboard/ListViewLayout";
import { categoryUtils } from "@/db/utils";

const Page: React.FC = async () => {
  
  const dbData = await categoryUtils.getAll()
  // Sample product list
  const Categories = dbData.map((Category) => [Category.id, Category.name, Category.description, Category.image]);

  const data = {
    head: ['ID', 'Name', 'Description', 'Image', 'Actions'],
    body: Categories,
    actions: true
  };

  const listViewLayoutData = {
    name: 'Category',
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