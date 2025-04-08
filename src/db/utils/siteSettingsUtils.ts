import { db } from "@/db";
import { siteSettingsTable } from "@/db/schema";
import { eq, inArray, and, gte, lte } from "drizzle-orm";

export const siteSettingsUtils = {
  async getAll() {
    return db.select().from(siteSettingsTable).execute();
  },

  async create(data: any) {
    return db.insert(siteSettingsTable).values(data).execute();
  },

  async update(id: number, data: any) {
    return db.update(siteSettingsTable).set(data).where(eq(siteSettingsTable.id, id)).execute();
  },

  async delete(id: number) {
    return db.delete(siteSettingsTable).where(eq(siteSettingsTable.id, id)).execute();
  },
};