import { NextResponse, NextRequest } from "next/server";
import { siteSettingsUtils } from "@/db/utils";

export async function GET() {
  try {
    // Fetch site settings from the database
    const settings = await siteSettingsUtils.getAll();
    return NextResponse.json(settings[0]); // Return the first row (assuming single settings row)
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch site settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Data received in API route:", data);

    // Update the site settings
    const result = await siteSettingsUtils.update(1, data); // Assuming settings row has ID 1
    console.log("Update result:", result);

    return NextResponse.json({ message: "Site settings updated successfully" });
  } catch (error) {
    console.error("Error updating site settings:", error);
    return NextResponse.json(
      { error: "Failed to update site settings" },
      { status: 500 }
    );
  }
}