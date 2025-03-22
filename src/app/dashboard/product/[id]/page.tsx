
import React from "react";
import ProductLayout from "@/components/dashboard/ProductLayout";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id
    if (id === "new") {
        const data = {
            id: "0",
            name: "This is product 1",
        }
      return <>
        <ProductLayout props={data}/>
      </>
    }
    return( 
    <div>

    </div>
  )
};

export default page;
