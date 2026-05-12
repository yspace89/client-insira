# Product Requirements Document (PRD): Manajemen Anggota Tim (Index Focused)

**Version:** 2.0 (Refined Roles & Logic)  
**Status:** Implementation Complete  
**Owner:** Product Team  
**Last Updated:** 2026-05-08  

---

## 1. Summary
Modul ini merupakan bagian dari portal manajemen yang dirancang untuk memfasilitasi pengelolaan dan pemantauan data anggota tim penjualan secara komprehensif. Fokus utama pengembangan saat ini adalah pada halaman **Index (Daftar Anggota)** untuk memberikan visibilitas terhadap database tim, klasifikasi agensi, serta pencapaian performa finansial yang sesuai dengan standar Design System Client Insira.

---

## 2. Struktur Pengguna & Hak Akses (RBAC)
- **Lead Agensi & Manager:** Memiliki akses penuh untuk melihat seluruh database anggota secara keseluruhan tanpa pembatasan filter.
- **Sales (Selain Manager/Lead), Koordinator, & User PA Lain:** Hanya diperbolehkan melihat data anggota tim yang berada secara hierarki di bawah mereka saja (downline visibility).

---

## 3. Logika Data & Sumber Informasi

### 3.1. Klasifikasi Keanggotaan & Labeling
- **Propertilogi:** Anggota yang berafiliasi langsung dengan agensi utama Propertilogi.
- **PA Lain:** Kategori agensi mitra (Partner Agency) di luar Propertilogi.  
  *Catatan: Label "PA Lain" hanya digunakan pada komponen filter/tab. Pada kolom tabel, nama agensi harus tetap menampilkan identitas aslinya (contoh: MRKR, Future Home, dll).*

### 3.2. Perhitungan Ringkasan (Overview Stats)
- **Status Filter:** Angka yang ditampilkan pada Overview Cards **HANYA** menghitung anggota dengan **Status = Aktif**.
- **Role Labels:**
  - Manager
  - Koordinator
  - Memorial Representative
  - Memorial Officer
  - Memorial Associate

---

## 4. Kebutuhan Data (Spesifikasi Tabel & Kolom)

### 4.1. Tabel: Daftar Database Anggota
Berikut adalah daftar kolom yang wajib didefinisikan sebagai requirement:

| No | Nama Kolom | Deskripsi |
| :--- | :--- | :--- |
| 1 | **No** | Nomor urut daftar (1, 2, 3, dst) |
| 2 | **Nama Anggota** | Identitas nama lengkap anggota |
| 3 | **Jabatan** | Peran/Jabatan spesifik anggota |
| 4 | **Status** | Status keaktifan anggota (Aktif/Non-Aktif) |
| 5 | **Level** | Klasifikasi pencapaian (Silver, Gold, Platinum) |
| 6 | **Nilai CIT** | Akumulasi Cash in Transactions |
| 7 | **Agensi** | Nama asli agensi afiliasi |
| 8 | **Referral** | Kode unik identitas sales |
| 9 | **Aksi** | Navigasi untuk melihat detail anggota |

---

## 5. Spesifikasi UI/UX (Visualisasi Komponen)

### 5.1. Dashboard Overview Grid
- Grid visual 5 kolom yang menampilkan jumlah anggota **Aktif** berdasarkan peran yang didefinisikan pada section 3.2.

### 5.2. Design System Compliance
- Seluruh komponen (Table, Button, Filter, Badge) **WAJIB** mengikuti **Design System Client Insira**.

---

## 6. Standar Interaksi & Perilaku UX (Panduan Engineer)
1.  **Top-Level Filtering:** Tab navigasi cepat: **Semua Anggota**, **Propertilogi**, dan **PA Lain**.
2.  **Dynamic Table Title:** Judul tabel harus berubah secara dinamis sesuai dengan tab yang dipilih.
3.  **Total Count Badge:** Menampilkan jumlah total data tersaring di sebelah judul tabel dengan format "{Jumlah} Anggota Aktif".
4.  **Jabatan Filter:** Dropdown penyaringan berdasarkan jabatan (MR, MO, MA Customer, dll).
5.  **Level Filter:** Dropdown penyaringan berdasarkan level pencapaian (Silver, Gold, Platinum).
6.  **Advanced Search:** Pencarian real-time pada Nama Sales, Nama Agensi, dan Kode Referral.
7.  **Pagination:** Menampilkan **10 baris** data per halaman secara default.

---

## 7. Acceptance Criteria (AC)

### 7.1. Global & Tab Filtering
- [ ] Sistem harus memisahkan data Propertilogi dan PA Lain secara akurat saat tab diklik.
- [ ] Judul header tabel wajib berubah seketika mengikuti filter tab yang aktif.
- [ ] Label "PA Lain" tidak boleh muncul di dalam baris tabel; kolom Agensi harus menampilkan nama vendor/mitra yang sebenarnya.

### 7.2. Advanced Combinatorial Filters
- [ ] Filter Jabatan dan Level harus bekerja secara bersamaan (AND logic) dengan filter tab.
- [ ] Perubahan pada dropdown filter harus memicu pembaruan data secara instan tanpa reload halaman.
- [ ] Count Badge pada header tabel harus selalu sinkron dengan jumlah baris yang tampil di layar.

### 7.3. Search Functionality
- [ ] Pencarian harus bersifat *case-insensitive*.
- [ ] Hasil pencarian harus mencakup kecocokan pada Nama Sales, Nama Agensi, maupun Kode Referral secara simultan.

### 7.4. Overview Stats Accuracy
- [ ] Angka pada Overview Cards hanya boleh mengakumulasi anggota dengan status "Aktif".
- [ ] Anggota dengan status "Non-Aktif" tidak boleh masuk dalam hitungan card meskipun jabatannya sesuai.

### 7.5. RBAC & Visibility (Development Mock)
- [ ] Sistem harus mampu mensimulasikan pembatasan data dimana user non-manager (termasuk Koordinator dan Sales) hanya melihat daftar downline mereka.
- [ ] Manager dan Lead Agensi harus memiliki visibilitas 100% terhadap seluruh database tanpa kecuali.

### 7.6. Formatting & Visuals
- [ ] Nilai CIT wajib ditampilkan dengan format Rupiah (Rp) dan pemisah ribuan titik.
- [ ] Kode Referral ditampilkan sesuai dengan data yang tersedia di database.

---
*End of Document*
