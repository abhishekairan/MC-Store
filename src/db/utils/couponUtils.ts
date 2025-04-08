import { db } from "@/db";
import { couponTable } from "@/db/schema";
import { eq, inArray, and, gte, lte } from "drizzle-orm";

export const couponUtils = {
  async getAll() {
    return db.select().from(couponTable).execute();
  },

  async getById(id: number) {
    const coupon = await db.select().from(couponTable).where(eq(couponTable.id, id)).execute();
    return coupon.length > 0 ? coupon[0] : null;
  },

  async getByIds(ids: number[]) {
    return db.select().from(couponTable).where(inArray(couponTable.id, ids)).execute();
  },

  async getByRange(start: number, end: number) {
    return db
      .select()
      .from(couponTable)
      .where(and(gte(couponTable.id, start), lte(couponTable.id, end)))
      .execute();
  },

  async create(data: any) {
    return db.insert(couponTable).values(data).execute();
  },

  async update(id: number, data: any) {
    return db.update(couponTable).set(data).where(eq(couponTable.id, id)).execute();
  },

  async delete(id: number) {
    return db.delete(couponTable).where(eq(couponTable.id, id)).execute();
  },
};