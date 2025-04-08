import { db } from "@/db";
import { productTable, categoryTable, discountTable, serverActionTable } from "@/db/schema";
import { eq, inArray, and, gte, lte } from "drizzle-orm";
import { fetchForeignKey } from "./fetchForeignKey";
import { discountUtils } from "./discountUtils";

export const productUtils = {
  async getAll() {
    const products = await db.select().from(productTable).execute();
    return Promise.all(
      products.map(async (product) => {
        const category = await fetchForeignKey(categoryTable, product.categoryId);
        const discount = await fetchForeignKey(discountTable, product.discountId);
        const serverActions = await db
          .select()
          .from(serverActionTable)
          .where(eq(serverActionTable.product, product.id))
          .execute();
        return { ...product, category, discount, serverActions };
      })
    );
  },

  async getById(id: number) {
    const product = await db.select().from(productTable).where(eq(productTable.id, id)).execute();
    if (product.length === 0) return null;

    const category = await fetchForeignKey(categoryTable, product[0].categoryId);
    const discount = await fetchForeignKey(discountTable, product[0].discountId);
    const serverActions = await db
      .select()
      .from(serverActionTable)
      .where(eq(serverActionTable.product, id))
      .execute();
    return { ...product[0], category, discount, serverActions };
  },

  async create(data: any) {
    console.log("Data being processed:", data);

    // Handle discount logic
    let discountId = null;
    if (data.discountAmount && data.discountType) {
      const existingDiscount = await discountUtils.findByAmountAndType(data.discountAmount, data.discountType);
      if (existingDiscount) {
        discountId = existingDiscount.id;
      } else {
        const newDiscount = await discountUtils.create({
          amount: data.discountAmount,
          type: data.discountType,
        });
        discountId = newDiscount?.id;
      }
    }

    // Check if the product already exists
    const existingProduct = await db.select().from(productTable).where(eq(productTable.id, data.id)).execute();

    if (existingProduct.length > 0) {
      console.log(`Updating product with ID: ${data.id}`);
      return db
        .update(productTable)
        .set({
          name: data.name,
          price: data.price,
          discountId: discountId,
          stock: data.stock,
          description: data.description,
          image: data.image,
          categoryId: data.categoryId,
        })
        .where(eq(productTable.id, data.id))
        .execute();
    } else {
      console.log("Creating a new product");
      return db
        .insert(productTable)
        .values([
          {
            name: data.name,
            price: data.price,
            discountId: discountId,
            stock: data.stock,
            description: data.description,
            image: data.image,
            categoryId: data.categoryId,
          },
        ])
        .execute();
    }
  },

  async update(id: number, data: any) {
    return db.update(productTable).set(data).where(eq(productTable.id, id)).execute();
  },

  async delete(id: number) {
    return db.delete(productTable).where(eq(productTable.id, id)).execute();
  },
};