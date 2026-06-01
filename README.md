# Dewi Naziyah - Personal Portfolio Website

Website portofolio pribadi modern yang responsif dan interaktif, dirancang menggunakan HTML5 semantik, CSS3 murni, dan JavaScript vanila (tanpa framework). Proyek ini dirancang dengan standar kualitas Front-End mahasiswa Informatika semester 2 untuk menampilkan keahlian pemrograman kepada perekrut atau dosen.

## 🚀 Fitur Utama

- **Desain Modern & Profesional**: Didominasi oleh warna biru tua dan putih, bersih, minimalis, dan sangat estetis.
- **Tampilan Responsif (Mobile-Friendly)**: Menggunakan CSS Flexbox dan Grid untuk memastikan tampilan sempurna di perangkat seluler, tablet, hingga desktop.
- **Dark Mode Toggle**: Fitur peralihan tema gelap/terang secara mulus yang menyimpan preferensi pengguna secara otomatis di `localStorage`.
- **Typing Effect (Hero Section)**: Efek animasi mengetik dinamis untuk status pekerjaan/studi.
- **Scroll Reveal Animation**: Transisi animasi kemunculan elemen secara halus saat halaman di-scroll menggunakan `IntersectionObserver`.
- **Animated Skill Progress Bar**: Bar kompetensi yang teranimasi otomatis saat area Skills mulai terlihat di layar.
- **Validasi Form Kontak**: Validasi input form secara real-time sebelum pengiriman, terlindungi dari celah keamanan web umum.
- **Tombol Back To Top**: Tombol navigasi cepat untuk kembali ke atas halaman saat pengguna men-scroll ke bawah.
- **Custom Modals**: Pengganti dialog browser bawaan (`alert`) untuk unduhan CV yang lebih ramah pengguna dan non-blocking.

## 📁 Struktur Folder

```text
portfolio/
│
├── index.html          # File struktur utama HTML5
│
├── css/
│   └── style.css       # File styling CSS dengan sistem variabel (Light & Dark theme)
│
├── js/
│   └── script.js       # Logika interaktif JavaScript murni (XSS safe)
│
├── images/             # Folder aset gambar proyek (telah digenerasi AI)
│   ├── profile.jpg     # Foto profil berbentuk lingkaran
│   ├── project1.jpg    # Gambar visual untuk Project 1
│   ├── project2.jpg    # Gambar visual untuk Project 2
│   └── project3.jpg    # Gambar visual untuk Project 3
│
└── README.md           # Dokumentasi proyek (file ini)
```

## 💻 Cara Menjalankan

1. Clone atau unduh direktori `portfolio/`.
2. Klik ganda pada file `index.html` untuk langsung membukanya di browser favorit Anda (Chrome, Edge, Firefox, Safari).
3. Alternatif lainnya, gunakan ekstensi seperti **Live Server** di VS Code untuk menjalankan server lokal.

## 🛡️ Kebijakan Keamanan Web (XSS Prevention)

Proyek ini dibuat dengan mematuhi prinsip secure coding frontend:
- **Zero `innerHTML`**: Semua modifikasi DOM menggunakan properti aman seperti `textContent` atau metode `document.createElement()` + `appendChild()` untuk menghindari kerentanan *Cross-Site Scripting (XSS)* dari input pengguna.
- **Sanitasi Form**: Data dari form kontak divalidasi dengan regex aman di sisi klien sebelum diproses.
- **Thread Safety**: Tidak menggunakan fungsi `alert()` bawaan browser yang memblokir utas utama (main thread), melainkan menggunakan modal berbasis DOM dinamis.
