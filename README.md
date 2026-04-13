# KopiKita.id ☕

Sebuah website profil dan pemesanan UMKM Kopi yang dibangun menggunakan HTML, CSS (Bootstrap 5), dan Vanilla JavaScript. Project ini dibuat untuk memenuhi tugas Ujian Tengah Semester (UTS) Pemrograman Web.

## 🌟 Fitur Utama

- **6 Halaman Terpisah**: Home, Tentang Kami, Menu, Galeri, Testimoni, dan Pemesanan.
- **Desain Responsif**: Tampilan yang rapi dan optimal di berbagai ukuran layar (desktop, tablet, mobile) menggunakan sistem grid Bootstrap.
- **Dark Mode**: Fitur toggle mode gelap dengan preferensi yang disimpan secara persisten di Local Storage.
- **Sistem Pemesanan Dinamis (CRUD)**:
  - Form pemesanan dengan validasi input (semua wajib diisi, jumlah wajib angka positif).
  - Penambahan data langsung ke tabel tanpa reload halaman.
  - Data pesanan tidak hilang saat direfresh (disimpan di Local Storage).
  - Fitur hapus pesanan.
  - Fitur pencarian/filter pesanan berdasarkan nama atau menu.
- **Notifikasi Toast**: Umpan balik visual bergaya modern saat pesanan berhasil ditambahkan atau dihapus.
- **Animasi Scroll**: Elemen yang muncul perlahan saat halaman di-scroll ke bawah.

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur halaman web.
- **CSS3 & Bootstrap 5.3**: Styling, tata letak, dan komponen antarmuka yang cepat dan responsif.
- **JavaScript (ES6+)**: Logika pemesanan, validasi, manipulasi DOM, filter data, dan manajemen state Local Storage.

## 📁 Struktur Direktori

```text
├── css/
│   └── style.css       # File custom CSS (warna tema, mode gelap)
├── js/
│   ├── main.js         # Logika global (navbar, dark mode, animasi scroll)
│   └── order.js        # Logika form pemesanan (CRUD, form validasi, pencarian)
├── assets/             # Berisi gambar-gambar pendukung (hero, menu, galeri)
├── index.html          # Halaman Beranda (Home)
├── about.html          # Halaman Tentang Kami
├── menu.html           # Halaman Menu Produk
├── gallery.html        # Halaman Galeri Foto
├── testimonial.html    # Halaman Review Pelanggan
└── order.html          # Halaman Form Pemesanan
```

## 🚀 Cara Menjalankan Project

1. Pastikan semua file terunduh dengan lengkap di dalam satu folder.
2. Buka file `index.html` menggunakan browser modern pilihan Anda (Google Chrome, Mozilla Firefox, Microsoft Edge, dll).
3. Anda tidak perlu menginstall dependencies tambahan karena Bootstrap sudah menggunakan CDN.
4. (Opsional) Untuk fitur Local Storage bekerja dengan maksimal, disarankan untuk menjalankan file lokal ini dengan *Live Server* (jika menggunakan VS Code).

## 💡 Navigasi Halaman

- **Home (`index.html`)**: Ringkasan singkat produk unggulan dan CTA.
- **Tentang Kami (`about.html`)**: Cerita perjalanan berdirinya KopiKita.id dari tahun 2025 di Surabaya.
- **Menu (`menu.html`)**: Daftar lengkap kopi panas dan dingin dengan harga.
- **Galeri (`gallery.html`)**: Koleksi momen dan foto produk KopiKita.id.
- **Testimoni (`testimonial.html`)**: Ulasan dari pelanggan-pelanggan setia.
- **Pesan (`order.html`)**: Tempat pengguna bisa memesan kopi, melihat data pesanan di dalam tabel, mencari nama pesanan, atau menghapusnya.

---

Dibuat dengan ❤️ untuk Ujian Tengah Semester Pemrograman Web.
