import React from "react";
import CouponLayout from "@/components/dashboard/CouponLayout";
import { couponUtils } from "@/db/utils";

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;

    if (id === "new") {
        // Default data for creating a new coupon
        const data = {
            id: "0",
            code: "",
            amount: 0,
            type: "%",
        };
        return (
            <div>
                <CouponLayout props={data} />
            </div>
        );
    }

    // Fetch coupon data from the database
    const dbData = await couponUtils.getById(Number(id));
    if (!dbData) {
        return <div>Coupon not found</div>;
    }

    // Map database data to the layout props
    const data = {
        id: dbData.id.toString(),
        code: dbData.code,
        amount: dbData.amount,
        type: dbData.type,
    };

    return (
        <div>
            <CouponLayout props={data} />
        </div>
    );
};

export default page;