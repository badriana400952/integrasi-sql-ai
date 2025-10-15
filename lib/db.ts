import { Pool } from "pg";

const isProd = process.env.NODE_ENV === "production";

export const Pools = new Pool(
  isProd
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        user: "postgres",
        host: "localhost",
        database: "warungMakan",
        password: "123456789",
        port: 5432,
      }
);

export default Pools;
