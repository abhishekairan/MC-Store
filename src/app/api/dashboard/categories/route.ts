import { NextResponse, NextRequest } from "next/server";
import { categoryUtils } from "@/db/utils"; // Import your product utils

export async function GET() {
  try {
    // Fetch categories from the database
    const categories = await categoryUtils.getAll();

    // Return the categories as a JSON response
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Data received in API route:", data); // Log the received data

    const result = await categoryUtils.create(data);
    console.log("Insert result:", result); // Log the result of the insert operation

    return NextResponse.json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}