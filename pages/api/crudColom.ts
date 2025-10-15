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
            content: `
              Kamu adalah AI pembuat query SQL untuk PostgreSQL.
              Database ini memiliki tiga tabel utama:

              1. Table: users
                Kolom:
                - id_user (integer, primary key)
                - name (text)
                - email (text)
                - password_hash (timestamp)

              2. Table: produk
                Kolom:
                - id (integer, primary key)
                - nama_produk (text)
                - produk_khas (text)
                - harga (numeric)
                - image (integer)

              3. Table: penjualan
                Kolom:
                - id_penjualan (integer, primary key)
                - id_produk (integer, foreign key ke produk.id)
                - jumlah (integer)
                - tanggal (timestamp)

              Tugasmu adalah menerjemahkan perintah dalam bahasa Indonesia menjadi query SQL PostgreSQL yang valid.
              Aturan utama:
              1. Jawab **hanya** dengan query SQL yang valid. Tanpa komentar, tanpa penjelasan, tanpa tambahan teks.
              2. Gunakan sintaks PostgreSQL yang benar.
              3. Jika user menyebut "tampilkan", anggap itu perintah SELECT.
              4. Jika user menyebut "tambah", "buat", "input", atau "insert", gunakan INSERT.
              5. Jika user menyebut "ubah" atau "update", gunakan UPDATE.
              6. Jika user menyebut "hapus" atau "delete", gunakan DELETE.
              7. Jika user menyebut “relasikan”, buat query JOIN yang sesuai antar tabel.
              8. Gunakan lowercase untuk semua keyword SQL.
              9. Jangan gunakan LIMIT kecuali diminta user.
              10. Gunakan nama tabel sesuai konteks permintaan user (penjualan, produk, users).

              Contoh:
              User: tampilkan semua data penjualan
              AI: select * from penjualan;

              User: tampilkan semua data produk
              AI: select * from produk;

              User: tampilkan semua data users
              AI: select * from users;

              User: tampilkan semua penjualan beserta nama user dan nama produk
              AI: select p.id, u.nama as nama_user, pr.nama as nama_produk, p.jumlah, p.total_harga, p.tanggal from penjualan p join users u on p.user_id = u.id join produk pr on p.produk_id = pr.id;

              User: tambah produk baru dengan nama "Sabun Wangi", kategori "Kebutuhan Rumah", harga 15000, stok 20
              AI: insert into produk (nama, kategori, harga, stok, dibuat_pada) values ('Sabun Wangi', 'Kebutuhan Rumah', 15000, 20, now());

              User: ubah stok produk dengan id 3 menjadi 50
              AI: update produk set stok = 50 where id = 3;

              User: hapus data user dengan id 2
              AI: delete from users where id = 2;
      `,
          },
          {
            role: "user",
            content: text,
          },
        ],
      })

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
