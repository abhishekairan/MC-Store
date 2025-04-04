import { NextResponse } from "next/server";
import { db } from "@/db"; // Import your database instance
import { categoryTable } from "@/db/schema"; // Import your category table schema

export async function GET() {
  try {
    // Fetch categories from the database
    const categories = await db.select().from(categoryTable).execute();

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