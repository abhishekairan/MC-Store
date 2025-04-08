import { db } from "@/db";
import { discountTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const discountUtils = {
  async getAll() {
    return db.select().from(discountTable).execute();
  },

  async getById(id: number) {
    const discount = await db.select().from(discountTable).where(eq(discountTable.id, id)).execute();
    return discount.length > 0 ? { ...discount[0], value: `${discount[0].amount}${discount[0].type}` } : null;
  },

  async findByAmountAndType(amount: number, type: string) {
    const discount = await db
      .select()
      .from(discountTable)
      .where(and(eq(discountTable.amount, amount), eq(discountTable.type, type)))
      .execute();
    return discount.length > 0 ? discount[0] : null;
  },

  async create(data: any) {
    // Check if the discount already exists
    const existingDiscount = await this.findByAmountAndType(data.amount, data.type);
    if (existingDiscount) {
      return existingDiscount; // Return the existing discount
    }

    // Create a new discount
    return db.insert(discountTable).values(data).execute();
  },

  async update(id: number, data: any) {
    return db.update(discountTable).set(data).where(eq(discountTable.id, id)).execute();
  },

  async delete(id: number) {
    return db.delete(discountTable).where(eq(discountTable.id, id)).execute();
  },
};