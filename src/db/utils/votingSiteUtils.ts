import { db } from "@/db";
import { votingSiteTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const votingSiteUtils = {
  async getAll() {
    return db.select().from(votingSiteTable).execute();
  },

  async clearAll() {
    return db.delete(votingSiteTable).execute();
  },

  async bulkInsert(votingSites: { name: string; url: string }[]) {
    return db.insert(votingSiteTable).values(votingSites).execute();
  },
};