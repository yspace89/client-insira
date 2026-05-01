# Product Requirements Document (PRD) - Menu Capaian Sales (Final)

## 1. Pendahuluan
Menu **Capaian Sales** adalah modul pelaporan performa tingkat lanjut dalam **NUP Management Portal** yang dirancang untuk memberikan visibilitas mendalam bagi pihak manajemen terhadap efektivitas penjualan, arus kas (CIT/CIR), dan kontribusi peran sales secara *real-time*.

## 2. Standar Visual & UI/UX (Premium Style)
Halaman ini mengikuti standar desain "High-Class" dengan karakteristik berikut:
- **Depth & Dimension**: Menggunakan *Deep Soft Shadows* (`shadow-[0_4px_20px_rgb(0,0,0,0.03)]`) pada kartu statistik agar terlihat melayang secara elegan.
- **Visual Hierarchy**: 
    - Sudut membulat yang halus (`rounded-2xl`).
    - *Padding* yang padat (*compact*) untuk profesionalisme finansial.
- **Premium KPI Card**: Kartu **Akad Unit** menggunakan gradasi mewah (*Indigo-Blue Gradient Mesh*) dengan efek kilau (*shine*) dinamis.
- **Glassmorphism**: Modal rincian menggunakan efek kaca buram yang kuat (`backdrop-blur-md`) untuk memfokuskan perhatian pengguna.

## 3. Struktur Dashboard & Metrik

### 3.1. Baris 1: Metrik Keuangan Utama (Primary)
- **Total CIT & Total CIR**: Menampilkan akumulasi kas dalam format mata uang besar dengan indikator tren persentase.
- **Akad Unit (Blue KPI Card)**: 
    - Menampilkan jumlah **"Akad Selesai"**.
    - Informasi tambahan: **Rerata CIT Akad** dan **Jumlah Unit**.
    - Interaktif: Klik pada "Jumlah Unit" membuka *Breakdown Unit Modal*.

### 3.2. Baris 2: Metrik Operasional (Secondary)
- **Kategori**: Registrasi, NUP, Booking Fee, Akad Prosesi.
- **Interaksi**: Memiliki tombol ikon **"Lihat rincian"** (ikon mata) untuk melihat distribusi capaian berdasarkan role (Memorial Officer, Promotor, Associate).

### 3.3. Logika Filter Periode
- **Pilihan**: `Semua`, `Kuartal ini` (Default), `Kuartal Sebelumnya`.
- **Perilaku**: Jika tab **"Semua"** dipilih, indikator tren ("vs Kuartal Sebelumnya") akan disembunyikan secara otomatis.

## 4. Optimalisasi Tabel Penjualan

### 4.1. Struktur Kolom yang Dimampatkan (Consolidated Columns)
Untuk meningkatkan kepadatan data dan kebersihan tampilan:
1.  **No & Indikator**: Kolom nomor urut yang menyertakan **Arrow Icon (Chevron)** di sisi kiri sebagai petunjuk visual bahwa baris dapat diekspansi.
2.  **Customer & NUP**: Nama Pelanggan (teks utama) dan Nomor NUP (sub-teks abu-abu) dalam satu kolom vertikal.
3.  **Unit Properti**: Menampilkan maksimal 2 badge unit. Jika > 2 unit, tampilkan badge `+X` dan tautan **"Lihat unit"** untuk membuka modal detail unit.
4.  **Detail Finansial**: 
    - **Total Transaksi** (Atas).
    - **Total Komisi:** (Bawah, warna biru).
5.  **Disetujui**: Menampilkan tanggal approval tanpa ikon (bersih).

### 4.2. Expanded Row (Milestone Tracking)
Klik pada baris tabel akan membuka rincian milestone komisi:
- **Card Per Tahap**: Menampilkan persentase langsung pada judul (Contoh: **Daftar (2%)**, **NUP (5%)**, **Booking Fee (10%)**).
- **Detail Petugas**: Menampilkan inisial foto, nama petugas, dan tanggal setiap tahapan.

### 4.3. Footer Tabel (Portal Standard)
Menggunakan format penomoran portal yang seragam:
> **Halaman 01 | Total [x] data**

## 5. Fitur Interaktif Modals
- **Role Breakdown Modal**: Visualisasi progres bar untuk kontribusi Memorial Officer, Promotor, dan Associate.
- **Unit Breakdown Modal**: Rincian jumlah dan persentase untuk 6 tipe unit (Single, Single Premiere, Couple, Couple Premiere, Family, Family Signature).
- **Unit Detail Modal**: Daftar list properti lengkap bagi pelanggan yang memiliki banyak unit.

---
**Status Dokumen**: Final & Terimplementasi
**Target Environment**: Production (Vercel)
