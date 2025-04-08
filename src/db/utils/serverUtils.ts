import { db } from "@/db";
import { serverTable } from "@/db/schema";
import { eq, inArray, and, gte, lte } from "drizzle-orm";

export const serverUtils = {
  async getAll() {
    return db.select().from(serverTable).execute();
  },

  async create(data: any) {
    return db.insert(serverTable).values(data).execute();
  },

  async update(id: number, data: any) {
    return db.update(serverTable).set(data).where(eq(serverTable.id, id)).execute();
  },

  async delete(id: number) {
    return db.delete(serverTable).where(eq(serverTable.id, id)).execute();
  },
};