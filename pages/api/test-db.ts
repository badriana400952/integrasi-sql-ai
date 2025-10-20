// pages/api/test-db.ts
import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json({ time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "DB connection failed", details: err });
  }
}
