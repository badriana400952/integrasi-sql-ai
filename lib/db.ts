import { Pool } from "pg";

export const Pools = new Pool({
  user: "postgres",
  host: "localhost",
  database: "warungMakan",
  password: "123456789",
  port: 5432,
});

export default Pools;
