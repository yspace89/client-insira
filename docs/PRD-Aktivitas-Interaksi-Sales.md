# Product Requirements Document (PRD): Aktivitas & Interaksi Sales

**Version:** 2.1 (Multi-platform Focus)  
**Status:** Ready for Development  
**Owner:** Product Team  
**Last Updated:** 2026-05-08  

---

## 1. Summary
Modul ini memberikan visibilitas penuh kepada Manajemen terhadap produktivitas harian tim penjualan (Aktivitas) dan kualitas komunikasi dengan calon pembeli (Interaksi).

---

## 2. Struktur Pengguna & Hak Akses (RBAC)
- **Lead Agensi & Manager:** Keduanya memiliki akses penuh untuk **mengambil** dan melihat seluruh data aktivitas dan interaksi nasional tanpa pembatasan filter.

---

## 3. Logika Data & Sumber Informasi

### 3.1. Mekanisme Pengambilan Data (Lark Bitable)
- **Aktivitas Sales:** **Mengambil** seluruh data kegiatan tanpa filter. [Link Lark Aktivitas](https://base.larksuite.com/base/MsQab2WT4aBNAnsALxcljyaXg5c?table=tbl9cZIFTTjExFJy)
- **Interaksi Sales:** **Mengambil** data dengan kriteria filter status `Follow Up = Yes` dan mengecualikan akun `Base Assistant`. [Link Lark Interaksi](https://base.larksuite.com/base/MsQab2WT4aBNAnsALxcljyaXg5c?table=tblw2971Y4p6Fbxq)

---

## 4. Kebutuhan Data (Data Fields)

### 4.1. Data Aktivitas
- **Primary:** Submitted on, Sales Name, Jenis Kegiatan, Nama Kegiatan.
- **Secondary:** Kondisi, Diminta proposal? (Ya/Tidak), Catatan, Lokasi, Foto.

### 4.2. Data Interaksi
- **Primary:** Nama Sales, Nama Leads, Status.
- **Secondary:** Kendala, Catatan, Tanggal Interaksi.

---

## 5. Spesifikasi UI/UX (Visualisasi Komponen)

### 5.1. Definisi Komponen "Table Arrow Narrow"
- **Narrow (Desain Ringkas):** Tinggi baris tabel dibuat minimalis (compact padding) agar informasi padat dan tidak banyak membuang ruang vertikal di layar.
- **Arrow (Panah Ekspansi):** Terdapat icon panah (chevron) di sisi kanan setiap baris. Saat baris diklik, icon akan berputar dan baris akan melebar ke bawah untuk menampilkan data detail (Catatan, Lokasi, Foto).

---

## 6. Standar Interaksi & Perilaku UX (Panduan Engineer)
1.  **Copywriting Initiative:** Engineer (utamanya Frontend) wajib memberikan inisiatif *copywriting* yang komunikatif dan sesuai agar produk memiliki UX yang bagus serta mudah dipahami oleh pengguna.
2.  **Search:** Tersedia fasilitas pencarian berdasarkan **Nama Sales** di atas masing-masing tabel.
3.  **Sorting:** Data wajib diurutkan berdasarkan **Waktu Terbaru di posisi Paling Atas (DESC)** dengan acuan kolom:
    *   **Tabel Aktivitas:** Kolom `Submitted on`.
    *   **Tabel Interaksi:** Kolom `Tanggal Interaksi`.
4.  **Format Tabel:** Gunakan sistem *Expandable Row* untuk menampilkan data *Secondary*.
5.  **Handling Foto:** Thumbnail yang dapat di-klik untuk membuka modal *Full Preview*.
6.  **Handling Lokasi:** Link aktif yang membuka Google Maps di tab baru.
7.  **Pagination:** Default **5 baris** per halaman.

---

## 7. Acceptance Criteria (AC)

### 7.1. Data & Search Integrity
- Data yang ditarik dari Lark harus 100% akurat sesuai filter yang ditentukan.
- Pencarian Nama Sales harus bersifat **Case-Insensitive** dan mendukung **Partial Match**.

### 7.2. Behavior & State Management
- **Single Expansion:** Hanya diperbolehkan satu baris yang terbuka (expanded) dalam satu waktu. Jika baris lain dibuka, baris sebelumnya otomatis tertutup (collapse).
- **Image Functionality Test:** Wajib dilakukan pengujian pada foto dokumentasi; saat thumbnail di-klik, sistem harus berhasil menampilkan *Full Review/Preview* gambar secara sempurna tanpa error.
- **Error Handling:** Jika API gagal/timeout, sistem harus menampilkan **Error State** yang jelas atau *Toast Message*.
- **Empty State:** Jika hasil pencarian atau data Lark kosong, tampilkan icon "No Data" sesuai Design System.

### 7.3. Multi-platform Responsiveness
- **Adaptive Layout:** Produk harus dapat diakses dengan baik di berbagai platform, terutama **Tablet** dan Desktop.
- **Table Behavior:** Tabel harus memiliki *Horizontal Scroll* yang mulus pada layar kecil agar struktur baris data tetap terjaga dan mudah dibaca.

---
*End of Document*
