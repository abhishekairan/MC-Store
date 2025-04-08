import { db } from "@/db";
import { categoryTable, discountTable } from "@/db/schema";
import { eq, inArray, and, gte, lte } from "drizzle-orm";
import { fetchForeignKey } from "./fetchForeignKey";

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

  async create(data: any) {
    // Check if the category with the given ID already exists
    const existingCategory = await db.select().from(categoryTable).where(eq(categoryTable.id, data.id)).execute();

    if (existingCategory.length > 0) {
      // If the category exists, update it
      console.log(`Updating category with ID: ${data.id}`);
      return db
        .update(categoryTable)
        .set({
          name: data.name,
          description: data.description,
          image: data.image,
          discountId: data.discountId,
        })
        .where(eq(categoryTable.id, data.id))
        .execute();
    } else {
      // If the category does not exist, insert a new one
      console.log("Creating a new category");
      return db
        .insert(categoryTable)
        .values({
          name: data.name,
          description: data.description,
          image: data.image,
          discountId: data.discountId,
        })
        .execute();
    }
  },

  async update(id: number, data: any) {
    return db.update(categoryTable).set(data).where(eq(categoryTable.id, id)).execute();
  },

  async delete(id: number) {
    return db.delete(categoryTable).where(eq(categoryTable.id, id)).execute();
  },
};