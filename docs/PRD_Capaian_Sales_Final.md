# Product Requirements Document (PRD) - Menu Capaian Sales (Final)

## 1. Pendahuluan
Menu **Capaian Sales** adalah modul pelaporan performa tingkat lanjut dalam **NUP Management Portal** yang dirancang untuk memberikan visibilitas mendalam bagi pihak manajemen terhadap efektivitas penjualan, arus kas (CIT/CIR), dan kontribusi peran sales secara *real-time*.

## 2. Role-Based Access Control (RBAC)
Sistem ini mengimplementasikan pembatasan akses data berdasarkan tingkatan otorisasi pengguna:
- **Administrator / Manager**: 
    - Akses penuh terhadap seluruh data penjualan perusahaan.
    - Dapat melihat performa lintas tim dan lintas individu.
    - Memiliki akses untuk mengekspor seluruh data.
- **Sales / Memorial Officer**:
    - Hanya dapat melihat data penjualan yang terkait langsung dengan dirinya (Personal Achievement).
    - Grafik dan metrik KPI di-filter secara otomatis hanya untuk mencakup transaksi pribadi.
- **Sales Leader**:
    - Dapat melihat data penjualan diri sendiri dan seluruh anggota tim yang berada di bawah supervisinya.

## 3. Spesifikasi Teknis Tabel Penjualan
Tabel ini dirancang untuk kepadatan informasi tinggi dengan kemampuan ekspansi baris untuk detail milestone.

### 3.1. Struktur Kolom (Main Table)
1.  **Indikator Arrow & No**:
    - Berada di sisi paling kiri.
    - Menampilkan nomor urut (01, 02, dst).
    - Memiliki ikon Chevron yang berubah arah (rotasi) saat baris diklik untuk ekspansi.
2.  **Data Pelanggan (Customer & NUP)**:
    - Informasi primer: Nama Pelanggan (Font Bold).
    - Informasi sekunder: Nomor identitas NUP (Font abu-abu/kecil).
3.  **Unit Properti (Inventory Tracking)**:
    - Menampilkan unit yang dibeli dalam bentuk *Badge/Chip*.
    - **Multi-Unit Logic**: Maksimal menampilkan 2 badge pertama. Jika pelanggan memiliki lebih dari 2 unit, tampilkan indikator `+X` (misal: `+2`).
    - Terdapat tombol/link **"Lihat unit"** jika jumlah unit > 2 untuk menampilkan seluruh daftar unit dalam modal terpisah.
4.  **Detail Finansial (Revenue & Commission)**:
    - **Total Transaksi**: Menampilkan nilai nominal bruto transaksi pembelian.
    - **Total Komisi**: Menampilkan nilai komisi yang didapat (format mata uang, diletakkan di bawah nominal transaksi).
5.  **Status Approval (Disetujui)**:
    - Menampilkan tanggal persetujuan atau tanggal transaksi terakhir tanpa menggunakan ikon tambahan.

### 3.2. Logika Ekspansi Baris (Milestone Tracking)
Saat baris tabel diklik, sistem akan menampilkan rincian tahapan penjualan yang mencakup:
- **Tahapan & Persentase**: Nama tahapan diikuti dengan nilai persentase komisinya dalam judul (Contoh: **Daftar (2%)**, **NUP (5%)**, **Booking Fee (10%)**).
- **Value Milestone**: Nilai nominal komisi untuk masing-masing tahapan.
- **Audit Trail**: Nama petugas (User) yang memproses tahapan tersebut beserta tanggal eksekusinya.

### 3.3. Interaksi & Filter
- **Periode Filter**: Mendukung pemfilteran berdasarkan rentang waktu (Kuartal ini, Kuartal Sebelumnya, atau Semua).
- **Trend Indicator**: Menampilkan perbandingan performa (+/- %) dibandingkan periode sebelumnya (disembunyikan jika filter "Semua" aktif).

## 4. Fitur Breakdown (Modal Systems)
Sistem menyediakan rincian data melalui jendela modal untuk:
1.  **Breakdown Role**: Distribusi capaian berdasarkan peran (Officer, Promotor, Associate).
2.  **Breakdown Unit**: Distribusi penjualan berdasarkan tipe properti (Single, Couple, Family, dsb).
3.  **Detail Unit Pelanggan**: Daftar inventaris lengkap untuk pelanggan dengan unit jamak.

---
**Status Dokumen**: Final (Untuk Tim Eksternal)
**Penyusunan**: Fokus pada Fungsionalitas & Spesifikasi Data
