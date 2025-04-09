import { NextResponse, NextRequest } from "next/server";
import { couponUtils } from "@/db/utils";

export async function GET() {
  try {
    // Fetch all coupons from the database
    const coupons = await couponUtils.getAll();

    // Return the coupons as a JSON response
    return NextResponse.json(coupons);
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json(
      { error: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Data received in API route:", data); // Log the received data

    // Check if the coupon ID exists
    if (data.id) {
      // Update the existing coupon
      const result = await couponUtils.update(Number(data.id), data);
      console.log("Update result:", result); // Log the result of the update operation
      return NextResponse.json({ message: "Coupon updated successfully" });
    } else {
      // Create a new coupon
      const result = await couponUtils.create(data);
      console.log("Insert result:", result); // Log the result of the insert operation
      return NextResponse.json({ message: "Coupon created successfully" });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Failed to process coupon" }, { status: 500 });
  }
}