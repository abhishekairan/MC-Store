import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq, inArray, and, gte, lte } from "drizzle-orm";

export const userUtils = {
  async getAll() {
    return db.select().from(userTable).execute();
  },

  async create(data: any) {
    return db.insert(userTable).values(data).execute();
  },

  async update(id: number, data: any) {
    return db.update(userTable).set(data).where(eq(userTable.id, id)).execute();
  },

  async delete(id: number) {
    return db.delete(userTable).where(eq(userTable.id, id)).execute();
  },
};