import { NextApiRequest, NextApiResponse } from "next"
import Pools from "@/lib/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text } = req.query
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Missing text parameter" })
  }

  try {
    const zenmuxRes = await fetch("https://zenmux.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.ZENMUX_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "inclusionai/ling-1t",
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah AI pembuat query SQL untuk PostgreSQL dengan table produk. Jawablah hanya dengan query SQL valid tanpa penjelasan atau tambahan teks. Tidak boleh ada komentar atau penjelasan di luar SQL.",
          },
          {
            role: "user",
            content: text,
          },
        ],
      }),
    })

    const result = await zenmuxRes.json()

    // Tangani error dari ZenMux
    if (!zenmuxRes.ok) {
      return res.status(zenmuxRes.status).json({
        error: result.error || "ZenMux API error",
        details: result,
      })
    }

    let sqlQuery =
      result?.choices?.[0]?.message?.content?.trim() || ""

    // Hapus markdown atau tag SQL jika ada
    sqlQuery = sqlQuery
      .replace(/```sql/gi, "")
      .replace(/```/g, "")
      .replace(/<\/?SQL>/gi, "")
      .trim()

    // Validasi isi SQL
    const allowedStatements = ["select", "insert", "update", "delete"]
    if (!allowedStatements.some((s) => sqlQuery.toLowerCase().startsWith(s))) {
      return res.status(500).json({
        error: "ZenMux did not return a valid SQL statement.",
        raw: sqlQuery,
      })
    }


    const sqlType = sqlQuery.split(" ")[0].toLowerCase()
    if (sqlType === "insert") {
      let finalSql = sqlQuery
      if (!/returning\s/i.test(sqlQuery)) {
        finalSql = sqlQuery.replace(/;*$/, " RETURNING *;")
      }

      const insertResult = await Pools.query(finalSql)
      return res.status(200).json({
        message: "Insert successful",
        sql: finalSql,
        data: insertResult.rows,
        rowsAffected: insertResult.rowCount,
      })
    } else if (sqlType === "select") {
      const finalQuery = sqlQuery.replace(/\bLIKE\b(?!\s*%)/gi, "ILIKE")
      const queryResult = await Pools.query(finalQuery)
      return res.status(200).json({
        message: "Select successful",
        sql: sqlQuery,
        data: queryResult.rows,
      })
    } else if (sqlType === "update") {
      let finalSql = sqlQuery
      if (!/returning\s/i.test(sqlQuery)) {
        finalSql = sqlQuery.replace(/;*$/, " RETURNING *;")
      }
      
      const queryResult = await Pools.query(finalSql)
      return res.status(200).json({
        message: "Update successful",
        sql: sqlQuery,
        data: queryResult.rows,
        rowsAffected: queryResult.rowCount,
      })
    } else if (sqlType === "delete") {
      const queryResult = await Pools.query(sqlQuery)
      return res.status(200).json({
        message: "Delete successful",
        sql: sqlQuery,
        rowsAffected: queryResult.rowCount,
      })
    } else {
      return res.status(400).json({
        error: "Unsupported SQL statement type.",
        sql: sqlQuery,
      })
    }
  } catch (err: any) {
    console.error("Error executing handler:", err)
    return res.status(500).json({ error: err.message })
  }
}
