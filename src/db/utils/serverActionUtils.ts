import { db } from "@/db";
import { serverActionTable, serverTable } from "@/db/schema";
import { eq, inArray, and, gte, lte } from "drizzle-orm";
import { fetchForeignKey } from "./fetchForeignKey";

export const serverActionUtils = {
  async getAll() {
    const serverActions = await db.select().from(serverActionTable).execute();
    return Promise.all(
      serverActions.map(async (serverAction) => {
        const server = await fetchForeignKey(serverTable, serverAction.serverId);
        return { ...serverAction, server };
      })
    );
  },

  async create(data: any) {
    return db.insert(serverActionTable).values(data).execute();
  },

  async update(id: number, data: any) {
    return db.update(serverActionTable).set(data).where(eq(serverActionTable.id, id)).execute();
  },

  async delete(id: number) {
    return db.delete(serverActionTable).where(eq(serverActionTable.id, id)).execute();
  },
};