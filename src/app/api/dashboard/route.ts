import { NextRequest, NextResponse } from "next/server";
import { categoryUtils, productUtils,discountUtils,couponUtils } from "@/db/utils";

export async function DELETE(req: NextRequest) {
  try {
    const { id,type } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Category ID is required." }, { status: 400 });
    }

    // Call the delete function from utils
    let dbResult;
    if (type === "product") {
      dbResult = await productUtils.delete(id);
    }else if (type === "category") {
      dbResult = await categoryUtils.delete(id);
    }else if (type === "discount") {
      dbResult = await discountUtils.delete(id);
    }else if (type === "coupon") {
      dbResult = await couponUtils.delete(id);
    }else {
      return NextResponse.json({ error: "Invalid type provided." }, { status: 400 });
    }
    // Check if the deletion was successful
    // if (!dbResult) {
    //   return NextResponse.json({ error: "Failed to delete Category." }, { status: 500 });
    // }
    // Return a success response

    return NextResponse.json({ message: "Category deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Category:", error);
    return NextResponse.json({ error: "Failed to delete Category." }, { status: 500 });
  }
}