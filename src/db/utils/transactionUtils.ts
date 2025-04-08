import { db } from "@/db";
import { transactionTable, userTable, productTable, couponTable } from "@/db/schema";
import { eq, inArray, and, gte, lte } from "drizzle-orm";
import { fetchForeignKey } from "./fetchForeignKey";

export const transactionUtils = {
  async getAll() {
    const transactions = await db.select().from(transactionTable).execute();
    return Promise.all(
      transactions.map(async (transaction) => {
        const client = await fetchForeignKey(userTable, transaction.clientId);
        const product = await fetchForeignKey(productTable, transaction.productId);
        const coupon = await fetchForeignKey(couponTable, transaction.couponId);
        return { ...transaction, client, product, coupon };
      })
    );
  },

  async getById(id: number) {
    const transaction = await db.select().from(transactionTable).where(eq(transactionTable.id, id)).execute();
    if (transaction.length === 0) return null;

    const client = await fetchForeignKey(userTable, transaction[0].clientId);
    const product = await fetchForeignKey(productTable, transaction[0].productId);
    const coupon = await fetchForeignKey(couponTable, transaction[0].couponId);

    return { ...transaction[0], client, product, coupon };
  },

  async create(data: any) {
    return db.insert(transactionTable).values(data).execute();
  },

  async update(id: number, data: any) {
    return db.update(transactionTable).set(data).where(eq(transactionTable.id, id)).execute();
  },

  async delete(id: number) {
    return db.delete(transactionTable).where(eq(transactionTable.id, id)).execute();
  },
};