import React from "react";
import ProductLayout from "@/components/dashboard/ProductLayout";

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
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
    return (
        <div>
            {/* Handle other cases here */}
        </div>
    );
};

export default page;