import { db } from "@/db";
import { votingSiteTable } from "@/db/schema";
import { eq, inArray, and, gte, lte } from "drizzle-orm";

export const votingSiteUtils = {
  async getAll() {
    return db.select().from(votingSiteTable).execute();
  },

  async create(data: any) {
    return db.insert(votingSiteTable).values(data).execute();
  },

  async update(id: number, data: any) {
    return db.update(votingSiteTable).set(data).where(eq(votingSiteTable.id, id)).execute();
  },

  async delete(id: number) {
    return db.delete(votingSiteTable).where(eq(votingSiteTable.id, id)).execute();
  },
};