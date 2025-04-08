import { db } from "@/db";
import { eq } from "drizzle-orm";
import { discountTable } from "@/db/schema";

export async function fetchForeignKey(table: any, id: number | null) {
  if (!id) return null;
  const result = await db.select().from(table).where(eq(table.id, id)).execute();
  if (result.length === 0) return null;

  // Add "value" attribute for discounts
  if (table === discountTable) {
    return { ...result[0], value: `${result[0].amount}${result[0].type}` };
  }

  return result[0];
}