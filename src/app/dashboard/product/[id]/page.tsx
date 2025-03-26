import React from "react";
import ProductLayout from "@/components/dashboard/ProductLayout";
import { productUtils } from "@/db/utils";

const page = async ({ params }: { params: { id: string } }) => {
    const { id } =await params;
    if (id === "new") {
        const data = {
            id: "0",
            name: "This is product 1",
            price: 0,
            discount: 0,
            stock: 0,
            description: "",
            image: "",
            category: 0,
            actions: []
        };
        return (
            <>
                <ProductLayout props={data} />
            </>
        );
    }
    const dbData = await productUtils.getById(Number(id));
    if (!dbData) {
        return <div>Product not found</div>;
    }
    const data = {
        id: dbData.id.toString(),
        name: dbData.name,
        price: dbData.price,
        discount: dbData.discountId,
        stock: dbData.stock,
        description: dbData.description,
        image: dbData.image,
        category: dbData.categoryId,
        actions: dbData.serverActions.map((action: { serverId: any; id: any; command: any; product: any; }) => ({
            id: action.id,
            serverId: action.serverId ?? 0,
            command: action.command,
            product: action.product
        }))
    }
    console.log(data);
    return (
        <div>
            <ProductLayout props={data} />
        </div>
    );
};

export default page;