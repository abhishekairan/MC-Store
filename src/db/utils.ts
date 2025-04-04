import { db } from "@/db";
import {
  productTable,
  categoryTable,
  transactionTable,
  serverActionTable,
  discountTable,
  couponTable,
  userTable,
  serverTable,
  votingSiteTable,
  siteSettingsTable,
} from "@/db/schema";
import { eq, inArray, and, gte, lte } from "drizzle-orm";

// Utility to fetch foreign key data
async function fetchForeignKey(table: any, id: number | null) {
  if (!id) return null;
  const result = await db.select().from(table).where(eq(table.id, id)).execute();
  if (result.length === 0) return null;

  // Add "value" attribute for discounts
  if (table === discountTable) {
    return { ...result[0], value: `${result[0].amount}${result[0].type}` };
  }

  return result[0];
}

// Product Table Getters and Setters
export const productUtils = {
  async getAll() {
    const products = await db.select().from(productTable).execute();
    return Promise.all(
      products.map(async (product) => {
        const category = await fetchForeignKey(categoryTable, product.categoryId);
        const discount = await fetchForeignKey(discountTable, product.discountId);
        const serverActions = await db.select().from(serverActionTable).where(eq(serverActionTable.product, product.id)).execute();
        return { ...product, category, discount, serverActions };
      })
    );
  },

  async getById(id: number) {
    const product = await db.select().from(productTable).where(eq(productTable.id, id)).execute();
    if (product.length === 0) return null;

    const category = await fetchForeignKey(categoryTable, product[0].categoryId);
    const discount = await fetchForeignKey(discountTable, product[0].discountId);
    const serverActions = await db.select().from(serverActionTable).where(eq(serverActionTable.product, id)).execute();
    return { ...product[0], category, discount, serverActions };
  },

  async getByIds(ids: number[]) {
    const products = await db.select().from(productTable).where(inArray(productTable.id, ids)).execute();
    return Promise.all(
      products.map(async (product) => {
        const category = await fetchForeignKey(categoryTable, product.categoryId);
        const discount = await fetchForeignKey(discountTable, product.discountId);
        const serverActions = await db.select().from(serverActionTable).where(eq(serverActionTable.product, product.id)).execute();
        return { ...product, category, discount, serverActions };
      })
    );
  },

  async getByRange(start: number, end: number) {
    const products = await db
      .select()
      .from(productTable)
      .where(and(gte(productTable.id, start), lte(productTable.id, end)))
      .execute();
    return Promise.all(
      products.map(async (product) => {
        const category = await fetchForeignKey(categoryTable, product.categoryId);
        const discount = await fetchForeignKey(discountTable, product.discountId);
        const serverActions = await db.select().from(serverActionTable).where(eq(serverActionTable.product, product.id)).execute();
        return { ...product, category, discount, serverActions };
      })
    );
  },

  async create(data: any) {
    console.log("Data being inserted:", data); // Log the data being inserted
    const discount = await discountUtils.getById(data.discountId);
    const category = await categoryUtils.getById(data.categoryId);
    return db.insert(productTable).values([
      {
        name: data.name,
        price: data.price,
        discountId: data.discountId,
        stock: data.stock,
        description: data.description,
        image: data.image,
        categoryId: category?.id,
      },
    ]).execute();
  },

  async update(id: number, data: any) {
    return db.update(productTable).set(data).where(eq(productTable.id, id)).execute();
  },

  async delete(id: number) {
    return db.delete(productTable).where(eq(productTable.id, id)).execute();
  },
};

// Category Table Getters and Setters
export const categoryUtils = {
  async getAll() {
    const categories = await db.select().from(categoryTable).execute();
    return Promise.all(
      categories.map(async (category) => {
        const discount = await fetchForeignKey(discountTable, category.discountId);
        return { ...category, discount };
      })
    );
  },

  async getById(id: number) {
    const category = await db.select().from(categoryTable).where(eq(categoryTable.id, id)).execute();
    if (category.length === 0) return null;

    const discount = await fetchForeignKey(discountTable, category[0].discountId);

    return { ...category[0], discount };
  },

  async getByIds(ids: number[]) {
    const categories = await db.select().from(categoryTable).where(inArray(categoryTable.id, ids)).execute();
    return Promise.all(
      categories.map(async (category) => {
        const discount = await fetchForeignKey(discountTable, category.discountId);
        return { ...category, discount };
      })
    );
  },

  async getByRange(start: number, end: number) {
    const categories = await db
      .select()
      .from(categoryTable)
      .where(and(gte(categoryTable.id, start), lte(categoryTable.id, end)))
      .execute();
    return Promise.all(
      categories.map(async (category) => {
        const discount = await fetchForeignKey(discountTable, category.discountId);
        return { ...category, discount };
      })
    );
  },

  async create(data: any) {
    return db.insert(categoryTable).values(data).execute();
  },

  async update(id: number, data: any) {
    return db.update(categoryTable).set(data).where(eq(categoryTable.id, id)).execute();
  },

  async delete(id: number) {
    return db.delete(categoryTable).where(eq(categoryTable.id, id)).execute();
  },
};

// Transaction Table Getters and Setters
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
    const transaction = await db
      .select()
      .from(transactionTable)
      .where(eq(transactionTable.id, id))
      .execute();
    if (transaction.length === 0) return null;

    const client = await fetchForeignKey(userTable, transaction[0].clientId);
    const product = await fetchForeignKey(productTable, transaction[0].productId);
    const coupon = await fetchForeignKey(couponTable, transaction[0].couponId);

    return { ...transaction[0], client, product, coupon };
  },

  async getByIds(ids: number[]) {
    const transactions = await db
      .select()
      .from(transactionTable)
      .where(inArray(transactionTable.id, ids))
      .execute();
    return Promise.all(
      transactions.map(async (transaction) => {
        const client = await fetchForeignKey(userTable, transaction.clientId);
        const product = await fetchForeignKey(productTable, transaction.productId);
        const coupon = await fetchForeignKey(couponTable, transaction.couponId);
        return { ...transaction, client, product, coupon };
      })
    );
  },

  async getByRange(start: number, end: number) {
    const transactions = await db
      .select()
      .from(transactionTable)
      .where(and(gte(transactionTable.id, start), lte(transactionTable.id, end)))
      .execute();
    return Promise.all(
      transactions.map(async (transaction) => {
        const client = await fetchForeignKey(userTable, transaction.clientId);
        const product = await fetchForeignKey(productTable, transaction.productId);
        const coupon = await fetchForeignKey(couponTable, transaction.couponId);
        return { ...transaction, client, product, coupon };
      })
    );
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

export const serverActionUtils = {
    async getAll() {
      const serverActions = await db.select().from(serverActionTable).execute();
      return Promise.all(
        serverActions.map(async (serverAction) => {
          const server = await fetchForeignKey(serverTable, serverAction.serverId);
          return { ...serverAction, server};
        })
      );
    },

    async getByProductID(productId: number) {
      const serverActions = await db.select().from(productTable).where(eq(productTable.id, productId)).execute();
      return Promise.all(
        serverActions.map(async (serverAction) => {
          const server = await fetchForeignKey(serverTable, serverAction.id);
          return { ...serverAction, server };
        })
      );

    },
  
    async getById(id: number) {
      const serverAction = await db
        .select()
        .from(serverActionTable)
        .where(eq(serverActionTable.id, id))
        .execute();
      if (serverAction.length === 0) return null;
  
      const server = await fetchForeignKey(couponTable, serverAction[0].serverId);
  
      return { ...serverAction[0], server };
    },
  
    async getByIds(ids: number[]) {
      const serverAction = await db
        .select()
        .from(serverActionTable)
        .where(inArray(serverActionTable.id, ids))
        .execute();
      return Promise.all(
        serverAction.map(async (serverAction) => {
          const server = await fetchForeignKey(serverActionTable, serverAction.serverId);
          return { ...serverAction, server };
        })
      );
    },
  
    async getByRange(start: number, end: number) {
      const serverAction = await db
        .select()
        .from(serverActionTable)
        .where(and(gte(serverActionTable.id, start), lte(serverActionTable.id, end)))
        .execute();
      return Promise.all(
        serverAction.map(async (serverAction) => {
          const server = await fetchForeignKey(serverActionTable, serverAction.serverId);
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

export const discountUtils = {
    async getAll() {
        return db.select().from(discountTable).execute();
    },

    async getById(id: number) {
        const discount = await db.select().from(discountTable).where(eq(discountTable.id, id)).execute();
        return discount.length > 0 ? { ...discount[0], value: `${discount[0].amount}${discount[0].type}` } : null;
    },

    async getByIds(ids: number[]) {
        const discounts = await db.select().from(discountTable).where(inArray(discountTable.id, ids)).execute();
        return discounts.map(discount => ({ ...discount, value: `${discount.amount}${discount.type}` }));
    },

    async getByRange(start: number, end: number) {
        const discounts = await db
            .select()
            .from(discountTable)
            .where(and(gte(discountTable.id, start), lte(discountTable.id, end)))
            .execute();
        return discounts.map(discount => ({ ...discount, value: `${discount.amount}${discount.type}` }));
    },

    async create(data: any) {
        return db.insert(discountTable).values(data).execute();
    },

    async update(id: number, data: any) {
        return db.update(discountTable).set(data).where(eq(discountTable.id, id)).execute();
    },

    async delete(id: number) {
        return db.delete(discountTable).where(eq(discountTable.id, id)).execute();
    },
};

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

export const userUtils = {
    async getAll() {
        return db.select().from(userTable).execute();
    },

    async getById(id: number) {
        const user = await db.select().from(userTable).where(eq(userTable.id, id)).execute();
        return user.length > 0 ? user[0] : null;
    },

    async getByIds(ids: number[]) {
        return db.select().from(userTable).where(inArray(userTable.id, ids)).execute();
    },

    async getByRange(start: number, end: number) {
        return db
            .select()
            .from(userTable)
            .where(and(gte(userTable.id, start), lte(userTable.id, end)))
            .execute();
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

export const serverUtils = {
    async getAll() {
        return db.select().from(serverTable).execute();
    },

    async getById(id: number) {
        const server = await db.select().from(serverTable).where(eq(serverTable.id, id)).execute();
        return server.length > 0 ? server[0] : null;
    },

    async getByIds(ids: number[]) {
        return db.select().from(serverTable).where(inArray(serverTable.id, ids)).execute();
    },

    async getByRange(start: number, end: number) {
        return db
            .select()
            .from(serverTable)
            .where(and(gte(serverTable.id, start), lte(serverTable.id, end)))
            .execute();
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

export const votingSiteUtils = {
    async getAll() {
        return db.select().from(votingSiteTable).execute();
    },

    async getById(id: number) {
        const site = await db.select().from(votingSiteTable).where(eq(votingSiteTable.id, id)).execute();
        return site.length > 0 ? site[0] : null;
    },

    async getByIds(ids: number[]) {
        return db.select().from(votingSiteTable).where(inArray(votingSiteTable.id, ids)).execute();
    },

    async getByRange(start: number, end: number) {
        return db
            .select()
            .from(votingSiteTable)
            .where(and(gte(votingSiteTable.id, start), lte(votingSiteTable.id, end)))
            .execute();
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

export const siteSettingsUtils = {
    async getAll() {
        return db.select().from(siteSettingsTable).execute();
    },

    async getById(id: number) {
        const settings = await db.select().from(siteSettingsTable).where(eq(siteSettingsTable.id, id)).execute();
        return settings.length > 0 ? settings[0] : null;
    },

    async getByIds(ids: number[]) {
        return db.select().from(siteSettingsTable).where(inArray(siteSettingsTable.id, ids)).execute();
    },

    async getByRange(start: number, end: number) {
        return db
            .select()
            .from(siteSettingsTable)
            .where(and(gte(siteSettingsTable.id, start), lte(siteSettingsTable.id, end)))
            .execute();
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

// Repeat similar utilities for other tables (serverActionTable, userTable, etc.)