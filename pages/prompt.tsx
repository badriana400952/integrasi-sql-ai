import React from "react";
import { cn } from "../lib/utils";
import { HoverEffect } from "./components/ui/card-hover-effect";
import NavbarDemo from "./components/element/navbar";


export default function PromptPage() {

    return (
        <>
            <div className="relative flex h-full w-full items-center justify-center bg-white dark:bg-black">
                <div
                    className={cn(
                        "absolute inset-0",
                        "[background-size:40px_40px]",
                        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                    )}
                />
                {/* Radial gradient for the container to give a faded look */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
                <div className="max-w-5xl mx-auto px-8">
                    <NavbarDemo />
                    <HoverEffect items={prompts} />
                </div>

            </div>
        </>
    );
}

export const prompts = [
    // ==== BASIC SELECT ====
    {
        title: "Lihat Semua Data Produk",
        description: "Menampilkan seluruh data dari tabel produk.",
        prompt: "Tampilkan semua data produk.",
        link: "/tableAi",
    },
    {
        title: "Lihat Semua Data User",
        description: "Menampilkan seluruh data dari tabel users.",
        prompt: "Tampilkan semua data users.",
        link: "/tableAi",
    },
    {
        title: "Lihat Semua Data Penjualan",
        description: "Menampilkan seluruh data dari tabel penjualan.",
        prompt: "Tampilkan semua data penjualan.",
        link: "/tableAi",
    },
    {
        title: "Cari Produk Berdasarkan Nama Produk",
        description: "Mencari produk berdasarkan nama tertentu.",
        prompt: 'Cari produk dengan nama_produk "Risol". mengandung risol',
        link: "/",
    },
    {
        title: "Cari User Berdasarkan Email",
        description: "Mencari data user berdasarkan alamat email.",
        prompt: 'Cari user dengan email "andi@example.com".',
        link: "/tableAi",
    },
    {
        title: "Cari Penjualan Berdasarkan Tanggal",
        description: "Menampilkan data penjualan berdasarkan rentang tanggal tertentu.",
        prompt: "Tampilkan penjualan dari tanggal 2025-01-01 sampai 2025-01-31.",
        link: "/tableAi",
    },

    // ==== INSERT DATA ====
    {
        title: "Tambah Data Produk Baru",
        description: "Menambahkan produk baru ke tabel produk.",
        prompt: 'Tambah produk baru dengan nama_produk= Mie Goreng, produk_khas= Indonesia ,harga = 10000, image= image.jpg.',
        link: "/",
    },
    {
        title: "Tambah Data User Baru",
        description: "Menambahkan user baru ke tabel users.",
        prompt: 'Tambah user baru dengan nama "Bayu" dan email "bayu@example.com".',
        link: "/tableAi",
    },
    {
        title: "Tambah Data Penjualan Baru",
        description: "Menambahkan data penjualan baru ke tabel penjualan.",
        prompt: "Tambah data penjualan dengan user_id 1, produk_id 2, jumlah 3, total_harga 45000.",
        link: "/tableAi",
    },

    // ==== UPDATE DATA ====
    {
        title: "Ubah Harga Produk",
        description: "Mengubah harga produk tertentu.",
        prompt: "Ubah harga produk dengan id 3 menjadi 20000.",
        link: "/",
    },
    {
        title: "Ubah Nama User",
        description: "Mengubah nama user di tabel users.",
        prompt: 'Ubah nama user dengan id 5 menjadi "Rina Kusuma".',
        link: "/tableAi",
    },
    {
        title: "Ubah Jumlah Penjualan",
        description: "Memperbarui jumlah item di tabel penjualan.",
        prompt: "Ubah jumlah pada penjualan dengan id 10 menjadi 4.",
        link: "/tableAi",
    },

    // ==== DELETE DATA ====
    {
        title: "Hapus Produk Berdasarkan ID",
        description: "Menghapus satu produk dari tabel produk.",
        prompt: "Hapus produk dengan id 4.",
        link: "/",
    },
    {
        title: "Hapus User Berdasarkan Email",
        description: "Menghapus user berdasarkan email.",
        prompt: 'Hapus user dengan email "test@example.com".',
        link: "/tableAi",
    },
    {
        title: "Hapus Data Penjualan Lama",
        description: "Menghapus data penjualan yang sudah lama.",
        prompt: "Hapus semua penjualan sebelum tanggal 2024-01-01.",
        link: "/tableAi",
    },

    // ==== JOIN & RELATION ====
    {
        title: "Lihat Penjualan dengan Detail User dan Produk",
        description: "Melihat data penjualan dengan nama user dan nama produk.",
        prompt: "Tampilkan semua penjualan beserta nama user dan produk.",
        link: "/tableAi",
    },
    {
        title: "Hitung Total Penjualan per User",
        description: "Menampilkan total penjualan untuk setiap user.",
        prompt: "Hitung total penjualan per user.",
        link: "/tableAi",
    },
    {
        title: "Hitung Total Pendapatan per Produk",
        description: "Menampilkan jumlah pendapatan dari setiap produk.",
        prompt: "Hitung total pendapatan per produk.",
        link: "/tableAi",
    },

    // ==== FILTERING ====
    {
        title: "Lihat Produk dengan Harga Tertentu",
        description: "Menampilkan produk dengan harga lebih dari nilai tertentu.",
        prompt: "Tampilkan produk dengan harga lebih dari 50000.",
        link: "/",
    },
    {
        title: "Lihat User yang Baru Bergabung",
        description: "Menampilkan user yang baru mendaftar bulan ini.",
        prompt: "Tampilkan user yang dibuat bulan ini.",
        link: "/tableAi",
    },
    {
        title: "Cari Penjualan Berdasarkan User",
        description: "Menampilkan semua penjualan oleh user tertentu.",
        prompt: 'Tampilkan semua penjualan oleh user bernama "Andi".',
        link: "/tableAi",
    },

    // ==== AGGREGATION ====
    {
        title: "Hitung Jumlah Produk",
        description: "Menampilkan total jumlah produk yang ada.",
        prompt: "Hitung jumlah total harga produk.",
        link: "/",
    },
    {
        title: "Hitung Jumlah User",
        description: "Menampilkan total user di sistem.",
        prompt: "Hitung jumlah user yang terdaftar.",
        link: "/tableAi",
    },
    {
        title: "Hitung Jumlah Transaksi",
        description: "Menampilkan total transaksi penjualan.",
        prompt: "Hitung jumlah transaksi penjualan.",
        link: "/tableAi",
    },

    // ==== TABLE STRUCTURE ====
    {
        title: "Tambah Kolom Baru ke Produk",
        description: "Menambahkan kolom baru di tabel produk.",
        prompt: 'Tambah kolom "berat" bertipe float ke tabel produk.',
        link: "/",
    },
    {
        title: "Hapus Kolom dari Produk",
        description: "Menghapus kolom dari tabel produk.",
        prompt: 'Hapus kolom "berat" dari tabel produk.',
        link: "/",
    },
    {
        title: "Buat Tabel Baru Supplier",
        description: "Membuat tabel baru bernama supplier.",
        prompt: "Buat tabel baru bernama supplier dengan kolom id, nama, alamat.",
        link: "/",
    },
    {
        title: "Ubah Nama Tabel",
        description: "Mengubah nama tabel yang sudah ada.",
        prompt: 'Ubah nama tabel "penjualan" menjadi "transaksi".',
        link: "/",
    },

    // ==== ADVANCED QUERY ====
    {
        title: "Produk Paling Laku",
        description: "Menampilkan produk dengan jumlah penjualan terbanyak.",
        prompt: "Tampilkan produk dengan jumlah penjualan terbanyak.",
        link: "/",
    },
    {
        title: "User dengan Pembelian Terbanyak",
        description: "Menampilkan user dengan total pembelian paling banyak.",
        prompt: "Tampilkan user dengan total pembelian tertinggi.",
        link: "/tableAi",
    },
    {
        title: "Produk Tidak Pernah Terjual",
        description: "Menampilkan produk yang belum pernah dijual.",
        prompt: "Tampilkan produk yang belum pernah muncul di tabel penjualan.",
        link: "/tableAi",
    },
    {
        title: "User Tanpa Transaksi",
        description: "Menampilkan user yang belum pernah melakukan pembelian.",
        prompt: "Tampilkan user yang belum memiliki data penjualan.",
        link: "/tableAi",
    },
    {
        title: "Pendapatan Bulanan",
        description: "Menampilkan total pendapatan per bulan.",
        prompt: "Tampilkan total pendapatan per bulan dari tabel penjualan.",
        link: "/tableAi",
    },
    {
        title: "Rata-Rata Harga Produk",
        description: "Menampilkan harga rata-rata dari seluruh produk.",
        prompt: "Tampilkan rata-rata harga produk.",
        link: "/",
    },
    {
        title: "5 Produk Termahal",
        description: "Menampilkan lima produk dengan harga tertinggi.",
        prompt: "Tampilkan 5 produk dengan harga tertinggi.",
        link: "/",
    },
    {
        title: "5 User Terbaru",
        description: "Menampilkan lima user yang paling baru mendaftar.",
        prompt: "Tampilkan 5 user terbaru berdasarkan tanggal pembuatan.",
        link: "/tableAi",
    },
    {
        title: "Penjualan Hari Ini",
        description: "Menampilkan semua penjualan yang terjadi hari ini.",
        prompt: "Tampilkan semua penjualan hari ini.",
        link: "/tableAi",
    },

    // ==== ALTER TABLE / SCHEMA ====
    {
        title: "Ubah Tipe Data Kolom",
        description: "Mengubah tipe data kolom tertentu di tabel.",
        prompt: 'Ubah tipe data kolom "harga" di tabel produk menjadi bigint.',
        link: "/",
    },
    {
        title: "Tambah Foreign Key",
        description: "Menambahkan relasi antar tabel menggunakan foreign key.",
        prompt: "Tambahkan foreign key produk_id di tabel penjualan yang mereferensikan tabel produk(id).",
        link: "/",
    },
    {
        title: "Hapus Foreign Key",
        description: "Menghapus foreign key dari tabel.",
        prompt: "Hapus foreign key produk_id dari tabel penjualan.",
        link: "/",
    },
    {
        title: "Lihat Struktur Tabel Produk",
        description: "Menampilkan struktur kolom tabel produk.",
        prompt: "Tampilkan struktur tabel produk.",
        link: "/",
    },

    // ==== DATA MANAGEMENT ====
    {
        title: "Backup Tabel Produk",
        description: "Membuat salinan tabel produk dengan nama baru.",
        prompt: 'Buat salinan tabel produk menjadi produk_backup.',
        link: "/",
    },
    {
        title: "Kosongkan Tabel Penjualan",
        description: "Menghapus semua data dari tabel penjualan tanpa menghapus struktur tabel.",
        prompt: "Kosongkan semua data di tabel penjualan.",
        link: "/",
    },
    {
        title: "Reset ID Auto Increment",
        description: "Mengatur ulang urutan ID pada tabel tertentu.",
        prompt: "Reset urutan id di tabel produk ke 1.",
        link: "/",
    },

    // ==== VIEW & INDEX ====
    {
        title: "Buat View Penjualan Detail",
        description: "Membuat view yang menampilkan gabungan penjualan, user, dan produk.",
        prompt: "Buat view bernama view_penjualan_detail dengan join penjualan, user, dan produk.",
        link: "/",
    },
    {
        title: "Hapus View Penjualan Detail",
        description: "Menghapus view dari database.",
        prompt: "Hapus view view_penjualan_detail.",
        link: "/",
    },
    {
        title: "Buat Index pada Kolom",
        description: "Meningkatkan performa pencarian dengan membuat index.",
        prompt: 'Buat index pada kolom "nama" di tabel produk.',
        link: "/",
    },
    {
        title: "Hapus Index dari Kolom",
        description: "Menghapus index dari kolom tertentu.",
        prompt: "Hapus index pada kolom nama di tabel produk.",
        link: "/",
    },

    // ==== STATISTIK & ANALYTIC ====
    {
        title: "Hitung Total Stok Produk",
        description: "Menjumlahkan total stok dari semua produk.",
        prompt: "Hitung total stok produk.",
        link: "/tableAi",
    },
    {
        title: "Produk dengan Stok Sedikit",
        description: "Menampilkan produk yang stoknya di bawah 10.",
        prompt: "Tampilkan produk dengan stok kurang dari 10.",
        link: "/tableAi",
    },
    {
        title: "Total Pembelian per User",
        description: "Menampilkan total nilai transaksi setiap user.",
        prompt: "Hitung total pembelian per user.",
        link: "/tableAi",
    },
    {
        title: "Produk dengan Harga Tertinggi",
        description: "Menampilkan produk dengan harga paling tinggi.",
        prompt: "Tampilkan produk dengan harga tertinggi.",
        link: "/tableAi",
    },
    {
        title: "Pendapatan Tahunan",
        description: "Menampilkan total pendapatan per tahun.",
        prompt: "Tampilkan total pendapatan per tahun dari penjualan.",
        link: "/tableAi",
    },

    // ==== UTILITY ====
    {
        title: "Export Data Produk",
        description: "Mengekspor seluruh data produk ke format CSV.",
        prompt: "Export semua data produk ke file CSV.",
        link: "/",
    },
    {
        title: "Import Data User",
        description: "Mengimpor data user dari file eksternal.",
        prompt: "Import data user dari file CSV users.csv.",
        link: "/",
    },
    {
        title: "Hitung Total Kategori Unik",
        description: "Menghitung berapa banyak kategori unik di tabel produk.",
        prompt: "Hitung jumlah kategori unik di tabel produk.",
        link: "/tableAi",
    },
    {
        title: "Lihat 10 Transaksi Terakhir",
        description: "Menampilkan sepuluh transaksi terakhir.",
        prompt: "Tampilkan 10 penjualan terakhir.",
        link: "/tableAi",
    },
    {
        title: "Cari Produk Berdasarkan Kategori",
        description: "Menampilkan produk berdasarkan kategori tertentu.",
        prompt: 'Tampilkan produk dalam kategori "Elektronik".',
        link: "/tableAi",
    },
];

