
import React from "react";
import { Form , FormField} from "@/components/dashboard/form_coupon";

const Page =  ({ params }: { params: { id: string } }) => {
    const { id } = params;
    if (id === "new") {
        const data = {
            id: "0",
            name: "This is product 1",
            price:"400",
            type: "%",
            code:"f466g5h",
            
            actions: []
        };
        return (
            <>
                
       
                <Form/>

            </>
        );
    }
    return (
        <div>
            {/* Handle other cases here */}
        </div>
    );
};

export default Page;