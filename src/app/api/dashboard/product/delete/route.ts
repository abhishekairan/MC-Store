import { NextRequest, NextResponse } from "next/server";
import { productUtils } from "@/db/utils";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    // Call the delete function from utils
    await productUtils.delete(id);

    return NextResponse.json({ message: "Product deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product." }, { status: 500 });
  }
}