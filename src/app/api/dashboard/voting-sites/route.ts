import { NextResponse, NextRequest } from "next/server";
import { votingSiteUtils } from "@/db/utils";

export async function GET() {
  try {
    // Fetch all voting sites from the database
    const votingSites = await votingSiteUtils.getAll();
    return NextResponse.json(votingSites);
  } catch (error) {
    console.error("Error fetching voting sites:", error);
    return NextResponse.json(
      { error: "Failed to fetch voting sites" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { votingSites } = await req.json();
    console.log("Voting sites received in API route:", votingSites);

    // Clear existing voting sites and insert new ones
    await votingSiteUtils.clearAll(); // Clear all existing voting sites
    const result = await votingSiteUtils.bulkInsert(votingSites); // Insert new voting sites
    console.log("Insert result:", result);

    return NextResponse.json({ message: "Voting sites updated successfully" });
  } catch (error) {
    console.error("Error updating voting sites:", error);
    return NextResponse.json(
      { error: "Failed to update voting sites" },
      { status: 500 }
    );
  }
}