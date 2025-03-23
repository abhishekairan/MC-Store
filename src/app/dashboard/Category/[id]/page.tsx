import React from "react";
import CategoryLayout from "@/components/dashboard/CategoryLayout";

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
    return (
        <div>
            {/* Handle other cases here */}
        </div>
    );
};

export default page;