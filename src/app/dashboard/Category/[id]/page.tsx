import React from "react";
import CategoryLayout from "@/components/dashboard/CategoryLayout";
import { categoryUtils } from "@/db/utils";

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    if (id === "new") {
        const data = {
            id: "0",
            name: "This is Category 1",
            description: "",
            image: "",
            discount: 0,
        };
        return (
            <>
                <CategoryLayout props={data} />
            </>
        );
    }
    const dbData = await categoryUtils.getById(Number(id));
    console.log(dbData);
    if (!dbData) {
        return <div>Category not found</div>;
    }
    const data = {
        id: dbData.id.toString(),
        name: dbData.name,
        description: dbData.description,
        image: dbData.image,
        discount: Number(dbData.discountId),
    }
    return (
        <>
            <CategoryLayout props={data} />
        </>
    );
};

export default page;