import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const dbCredentials = {
  host: process.env.DB_HOST, // Add this
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
};

console.log(dbCredentials);

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'mysql',
  dbCredentials,
});