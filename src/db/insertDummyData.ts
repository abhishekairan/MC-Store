import { db } from "@/db"; // Import your database connection
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
} from "@/db/schema"; // Import all table schemas

export async function resetDummyData() {
  try {
    console.log("Deleting existing data...");

    // Delete data in reverse order of dependencies to avoid foreign key conflicts
    await db.delete(transactionTable).execute();
    await db.delete(serverActionTable).execute();
    await db.delete(productTable).execute();
    await db.delete(categoryTable).execute();
    await db.delete(discountTable).execute();
    await db.delete(couponTable).execute();
    await db.delete(userTable).execute();
    await db.delete(serverTable).execute();
    await db.delete(votingSiteTable).execute();
    await db.delete(siteSettingsTable).execute();

    console.log("Inserting new dummy data...");

    // Insert into Discount Table
    const [discount1, discount2] = await Promise.all([
      db.insert(discountTable).values({ amount: 10, type: "%" }),
      db.insert(discountTable).values({ amount: 100, type: "₹" }),
    ]);

    // Insert into Category Table
    const [category1, category2] = await Promise.all([
      db.insert(categoryTable).values({
        name: "Electronics",
        description: "Category for electronic products",
        image: "electronics.jpg",
        discountId: discount1[0].insertId,
      }),
      db.insert(categoryTable).values({
        name: "Books",
        description: "Category for books",
        image: "books.jpg",
        discountId: discount2[0].insertId,
      }),
    ]);

    // Insert into Product Table
    const [product1, product2] = await Promise.all([
      db.insert(productTable).values({
        name: "Smartphone",
        actionsId: null,
        price: 500,
        discountId: discount1[0].insertId,
        stock: 100,
        description: "A high-end smartphone",
        image: "smartphone.jpg",
        categoryId: category1[0].insertId,
      }),
      db.insert(productTable).values({
        name: "Novel",
        actionsId: null,
        price: 20,
        discountId: discount2[0].insertId,
        stock: 50,
        description: "A best-selling novel",
        image: "novel.jpg",
        categoryId: category2[0].insertId,
      }),
    ]);

    // Insert into User Table
    const [user1, user2] = await Promise.all([
      db.insert(userTable).values({
        discordId: "123456789",
        discordUsername: "User1",
        accessToken: "access_token_1",
        refreshToken: "refresh_token_1",
        minecraftUsername: "MinecraftUser1",
      }),
      db.insert(userTable).values({
        discordId: "987654321",
        discordUsername: "User2",
        accessToken: "access_token_2",
        refreshToken: "refresh_token_2",
        minecraftUsername: "MinecraftUser2",
      }),
    ]);

    // Insert into Transaction Table
    await Promise.all([
      db.insert(transactionTable).values({
        clientId: user1[0].insertId,
        ign: "IGN1",
        productId: product1[0].insertId,
        quantity: 2,
        couponId: null,
        amount: 1000,
      }),
      db.insert(transactionTable).values({
        clientId: user2[0].insertId,
        ign: "IGN2",
        productId: product2[0].insertId,
        quantity: 1,
        couponId: null,
        amount: 20,
      }),
    ]);

    // Insert into Server Table
    const [server1, server2] = await Promise.all([
      db.insert(serverTable).values({
        uuid: "server-uuid-1",
        name: "Server 1",
        ip: "192.168.1.1",
      }),
      db.insert(serverTable).values({
        uuid: "server-uuid-2",
        name: "Server 2",
        ip: "192.168.1.2",
      }),
    ]);

    // Insert into ServerAction Table
    await Promise.all([
      db.insert(serverActionTable).values({
        serverId: server1[0].insertId,
        command: "start",
      }),
      db.insert(serverActionTable).values({
        serverId: server2[0].insertId,
        command: "stop",
      }),
    ]);

    // Insert into Coupons Table
    const [coupon1, coupon2] = await Promise.all([
      db.insert(couponTable).values({
        code: "DISCOUNT10",
        amount: 10,
        type: "%",
      }),
      db.insert(couponTable).values({
        code: "FLAT100",
        amount: 100,
        type: "₹",
      }),
    ]);

    // Insert into Voting Site Table
    await Promise.all([
      db.insert(votingSiteTable).values({
        name: "Voting Site 1",
        url: "https://votingsite1.com",
      }),
      db.insert(votingSiteTable).values({
        name: "Voting Site 2",
        url: "https://votingsite2.com",
      }),
    ]);

    // Insert into Site Settings Table
    await db.insert(siteSettingsTable).values({
      siteName: "My Store",
      siteLogo: "logo.jpg",
      serverIp: "192.168.1.1",
      pteroAppApi: "ptero_app_api_key",
      pteroClientApi: "ptero_client_api_key",
    });

    console.log("Dummy data reset successfully!");
  } catch (error) {
    console.error("Error resetting dummy data:", error);
  }
}

resetDummyData();