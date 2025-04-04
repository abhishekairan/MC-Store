import { NextRequest, NextResponse } from "next/server";
import { productUtils } from "@/db/utils";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Data received in API route:", data); // Log the received data

    const result = await productUtils.create(data);
    console.log("Insert result:", result); // Log the result of the insert operation

    return NextResponse.json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}