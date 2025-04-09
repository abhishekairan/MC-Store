import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Define the upload directory
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate a unique file name
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Save the file to the upload directory
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, fileBuffer);

    // Return the file path (relative to the public directory)
    const relativePath = `/uploads/${fileName}`;
    return NextResponse.json({ filePath: relativePath });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}