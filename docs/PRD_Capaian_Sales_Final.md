# Product Requirements Document (PRD) - Menu Capaian Sales (Final)

## 1. Pendahuluan
Menu **Capaian Sales** adalah modul pelaporan performa tingkat lanjut dalam **NUP Management Portal** yang dirancang untuk memberikan visibilitas mendalam bagi pihak manajemen terhadap efektivitas penjualan, arus kas (CIT/CIR), dan kontribusi peran sales secara *real-time*.

## 2. Role-Based Access Control (RBAC)
Sistem ini mengimplementasikan pembatasan akses data berdasarkan tingkatan otorisasi pengguna:
- **Administrator / Manager**: Akses penuh seluruh data & fungsi ekspor.
- **Sales / Memorial Officer**: Hanya akses data transaksi pribadi.
- **Sales Leader**: Akses data diri sendiri dan seluruh anggota tim di bawahnya.

## 3. Metrik Summary (Dashboard Cards)
Dashboard dibagi menjadi dua baris utama metrik untuk memberikan ringkasan performa cepat:

### 3.1. Baris Utama (Primary Metrics)
- **Total CIT (Cash In Transit)**: Akumulasi nilai transaksi yang sedang berjalan.
- **Total CIR (Cash In Received)**: Akumulasi nilai transaksi yang sudah resmi diterima/cair.
- **Akad Unit (KPI Utama)**: 
    - Menampilkan angka besar jumlah unit yang sudah mencapai tahap Akad Selesai.
    - Sub-informasi: Rerata nilai CIT per Akad dan Total Unit yang terlibat.

### 3.2. Baris Operasional (Secondary Metrics)
Terdapat 4 kartu metrik progres:
1. **Registrasi**: Jumlah pelanggan baru yang mendaftar.
2. **NUP (Nomor Urut Pemesanan)**: Jumlah pelanggan yang sudah membayar NUP.
3. **Booking Fee**: Jumlah pelanggan yang sudah membayar tanda jadi unit.
4. **Akad Prosesi**: Jumlah unit yang sedang dalam proses persiapan akad.

*Setiap kartu di Baris Operasional (kecuali Akad Prosesi) memiliki tombol aksi "Lihat Rincian" untuk membuka rincian performa berdasarkan peran sales.*

## 4. Spesifikasi Teknis Tabel Penjualan

### 4.1. Struktur Kolom
1. **No & Chevron**: Nomor urut + Ikon panah (rotasi 180° saat terbuka).
2. **Customer & NUP**: Nama Pelanggan (Bold) + Nomor NUP (Small/Muted).
3. **Unit Properti**: Menampilkan badge unit. Jika > 2 unit, tampilkan badge `+X` dan link "Lihat unit".
4. **Detail Finansial**: 
    - Label "Total Transaksi" + Nilai Nominal.
    - Label "Total Komisi" + Nilai Nominal (Warna kontras/Biru).
5. **Disetujui**: Tanggal transaksi disetujui (Format: DD MMM YYYY).

### 4.2. Milestone Dropdown (Expanded Row)
Menampilkan 3 kartu progres komisi:
- **Label**: Nama Tahapan + Persentase dalam kurung, misal: `Daftar (2%)`.
- **Value**: Nilai nominal komisi tahap tersebut.
- **Petugas**: Nama & Tanggal eksekusi tahap tersebut.

## 5. Wireframe & Tata Letak (ASCII Version)

### 5.1. Main Layout
```text
+--------------------------------------------------------------------------+
|  [Header: Laporan Performa Sales]                [Button: Export Data]   |
+--------------------------------------------------------------------------+
|  [Tab: Semua] [Tab: Kuartal Ini] [Tab: Kuartal Sebelumnya]               |
+--------------------------------------------------------------------------+
|                                                                          |
|  [ Card: Total CIT ]    [ Card: Total CIR ]    [ Card: AKAD UNIT (KPI) ] |
|  | Rp 12.450.000.000 |  | Rp 8.120.000.000 |  | 50 Akad Selesai      | |
|  +-------------------+  +-------------------+  +-----------------------+ |
|                                                                          |
|  [ Reg ] [ NUP ] [ Booking Fee ] [ Akad Prosesi ]  <-- (Secondary Row)   |
|                                                                          |
+--------------------------------------------------------------------------+
|  [ Search: Cari pelanggan... ]                                           |
+--------------------------------------------------------------------------+
|  NO | CUSTOMER & NUP     | UNIT PROPERTI   | FINANSIAL      | DISETUJUI  |
|-----+--------------------+-----------------+----------------+------------|
| > 01| SAPTO PRATOLO      | [Unit A] [Unit B] | T. Transaksi:  | 23 Apr 2026|
|     | INS-0326039        | [+2] Lihat unit   | Rp 1.119M      |            |
|     |                    |                 | T. Komisi:     |            |
|     |                    |                 | Rp 76.6M       |            |
+--------------------------------------------------------------------------+
```

### 5.2. Breakdown Modal (Role/Unit)
```text
+-------------------------------------------------------+
|  Rincian Capaian [Role/Unit]                      [X]  |
|  Total: 124 Data                                      |
+-------------------------------------------------------+
|                                                       |
|  Item A (misal: Memorial Officer)        60 Data      |
|  [========================----------]     48%          |
|                                                       |
|  Item B (misal: Memorial Promotor)       40 Data      |
|  [================------            ]     32%          |
|                                                       |
+-------------------------------------------------------+
```

## 6. Detail Data & Teknis
- **Format Mata uang**: Rupiah (IDR) dengan pemisah titik (.), misal: `Rp 1.500.000`.
- **Sorting Default**: Berdasarkan tanggal "Disetujui" terbaru (Descending).
- **Search Scope**: Nama Pelanggan dan Nomor NUP.
- **Export**: Menghasilkan file Excel yang mencakup seluruh kolom tabel utama dan rincian nominal per tahapan.

---
**Status Dokumen**: Final (Ready for Implementation)
