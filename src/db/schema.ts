import {
  int,
  mysqlTable,
  varchar,
  text,
  float,
  boolean,
  uniqueIndex,
  foreignKey,
} from 'drizzle-orm/mysql-core';

// Product Table
export const productTable = mysqlTable('product', {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 255 }).notNull(),
  actionsId: int().references(() => serverActionTable.id), // Foreign Key to ServerAction.id
  price: float().notNull(),
  discountId: int().references(() => discountTable.id), // Optional Foreign Key to Discount.id
  stock: int().notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  categoryId: int().references(() => categoryTable.id), // Foreign Key to Category.id
});

// Category Table
export const categoryTable = mysqlTable('category', {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  discountId: int().references(() => discountTable.id), // Optional Foreign Key to Discount.id
});

// Transaction Table
export const transactionTable = mysqlTable('transaction', {
  id: int().primaryKey().autoincrement(),
  clientId: int().references(() => userTable.id), // Foreign Key to User.id
  ign: varchar({ length: 255 }).notNull(),
  productId: int().references(() => productTable.id), // Foreign Key to Product.id
  quantity: int().notNull(),
  couponId: int().references(() => couponTable.id), // Optional Foreign Key to Coupons.id
  amount: float().notNull(),
});

// ServerAction Table
export const serverActionTable = mysqlTable('server_action', {
  id: int().primaryKey().autoincrement(),
  serverId: int().references(() => serverTable.id), // Foreign Key to Server.id
  command: text().notNull(),
});

// Discount Table
export const discountTable = mysqlTable('discount', {
  id: int().primaryKey().autoincrement(),
  amount: float().notNull(),
  type: varchar({ length: 1 }).notNull(), // "₹" or "%"
});

// Coupons Table
export const couponTable = mysqlTable('coupon', {
  id: int().primaryKey().autoincrement(),
  code: varchar({ length: 255 }).notNull().unique(),
  amount: float().notNull(),
  type: varchar({ length: 1 }).notNull(), // "₹" or "%"
});

// User Table
export const userTable = mysqlTable('user', {
  id: int().primaryKey().autoincrement(),
  discordId: varchar({ length: 255 }).notNull(),
  discordUsername: varchar({ length: 255 }).notNull(),
  accessToken: text().notNull(),
  refreshToken: text().notNull(),
  minecraftUsername: varchar({ length: 255 }).notNull(),
});

// Server Table
export const serverTable = mysqlTable('server', {
  id: int().primaryKey().autoincrement(),
  uuid: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  ip: varchar({ length: 255 }).notNull(),
});

// Voting Site Table
export const votingSiteTable = mysqlTable('voting_site', {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 255 }).notNull(),
});

// Site Settings Table
export const siteSettingsTable = mysqlTable('site_settings', {
  id: int().primaryKey().autoincrement(),
  siteName: varchar({ length: 255 }).notNull(),
  siteLogo: varchar({ length: 255 }),
  serverIp: varchar({ length: 255 }).notNull(),
  pteroAppApi: text().notNull(),
  pteroClientApi: text().notNull(),
});