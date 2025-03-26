import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
let poolInstance: mysql.Pool | null = null;

const getPool = () => {
    if (poolInstance) return poolInstance;
    poolInstance = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    return poolInstance;
};
const pool = getPool();

export const db = drizzle(pool); // Export your database connection
