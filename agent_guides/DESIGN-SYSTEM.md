# YESTOYA PORTFOLIO — Design System v2
Working title tetap **TILEBOARD** (bento-Metro). Dokumen ini adalah **update** dari `design_md.txt` awal kamu, disesuaikan dengan hasil desain Figma (Home, Skills & Tools expanded, Projects, Project Detail, Experience) yang sudah lebih matang dari draf Google Stitch pertama.

Baca bareng `INTERACTION-SPEC.md` (behavior detail tiap komponen) dan `constants.js` (struktur data). Ini bukan pengganti `design_md.txt` — anggap sebagai lapisan "v2" di atasnya.

---

## 0. Ringkasan Perubahan dari Draf Awal

| Area | Draf awal (`design_md.txt`) | v2 (dari Figma) |
|---|---|---|
| Warna | 8 warna | +4 warna baru: Paper, Ink, Coral Gelap, Falu Terang |
| Font | Clash Display + Switzer/Manrope | JetBrains Mono, SF Pro Rounded, Inter, AKIRA EXPANDED, SF Pro |
| Tagline | "Crafting immersive UX..." | "crafting immersive, user-friendly experiences" |
| Role | "Fullstack Developer" | "Software Engineer" |
| Skills & Tools | Nav tile → board baru | Tile **expand-in-place** (tap → reveal, bukan navigasi) |
| Contact | Nav tile → board baru | Tile **expand-in-place**, sama seperti Skills & Tools |
| Projects | Grid statis | + sistem kategori (ALL/WEB/MOBILE/PERSONAL), area list yang scroll independen dari header/kategori |
| Project detail | Board terpisah | State **in-place** di dalam board Projects (area kategori → jadi "Close" + nama project, grid → jadi detail) |
| GitHub stats | Placeholder "grafik mini" | Harus **live-fetch** grafik kontribusi asli, bukan screenshot |
| Mode baru | — | **Puzzle Mode** (drag-reorder ala puzzle) & **Fun Mode** (chaos) — keduanya belum ada di draf awal |

---

## 1. Konsep Inti (tetap dari draf awal)

Diambil dari DNA visual Windows Phone / Windows 8–10 "Metro": papan tile berwarna solid, tipografi besar, nyaris tanpa chrome, murni papan tile (board) fullscreen yang scrollable & clickable.

Aturan mainnya tetap:
- Fullscreen, edge-to-edge, per-board mengisi 100% viewport, tanpa navbar/topbar/footer konvensional.
- Minim whitespace, maksimal kotak — ruang kosong diisi tile (warna solid, tipografi besar, pola, kutipan).
- Grid modular ketat, satu unit persegi dasar, tile lain kelipatannya.
- Navigasi hidup di dalam tile, bukan bar terpisah.
- Desktop-first — mobile dipikirkan belakangan, cukup pastikan sistem tile bisa diciutkan nanti.

---

## 2. Palet Warna (v2)

| Nama | Hex | Peran |
|---|---|---|
| Lemon | `#FFF0C2` | Base background terang, tile terang |
| Paper | `#FFFBF0` | **(baru)** Nyaris putih — pengganti/varian dari "lemon-50" di draf awal, teks di atas tile paling gelap |
| Charcoal | `#25424C` | Ink utama, tile gelap netral |
| Ink | `#16262B` | **(baru)** Nyaris hitam — pengganti "charcoal-950", grout line antar tile gelap, background board alternate |
| Coral | `#FD8451` | Accent utama — CTA, tile Projects (catatan: hex sedikit beda dari draf awal `#FF8552`, pakai `#FD8451` sebagai official) |
| Sienna | `#942911` | Accent gelap 1 — tile Experience |
| Falu | `#772014` | Accent gelap 2 — tile Contact |
| Coral Gelap | `#C05640` | **(baru)** Hover/pressed state dari Coral, atau accent tile Experience varian |
| Falu Terang | `#C05640` | **(baru)** ⚠️ **Sama persis dengan hex Coral Gelap** — kemungkinan besar typo waktu kamu kirim ke aku. Cek lagi di Figma, nilai ini harusnya beda (mungkin varian terang dari Falu, semacam `#9A3D2C`-ish). Aku pakai placeholder ini di `constants.js` dengan flag TODO. |

Aturan mosaic tetap berlaku: dua tile bersebelahan tidak boleh warna solid yang sama.

Mapping per board tetap seperti draf awal (Home = mosaic semua warna, Projects = coral+charcoal, Skills = charcoal+lemon, Experience = sienna+lemon/paper, Contact = falu+coral) — di screenshot Home terlihat mosaic charcoal/coral/sienna/falu/lemon persis seperti yang direncanakan.

---

## 3. Tipografi (v2 — BERUBAH TOTAL dari draf awal)

Font list baru: **JetBrains Mono, SF Pro Rounded, Inter, AKIRA EXPANDED, SF Pro**.

Mapping di bawah ini adalah **tebakan berdasar visual screenshot** — tolong dikonfirmasi karena tidak semua font bisa dibedakan 100% dari gambar:

| Font | Kemungkinan dipakai untuk |
|---|---|
| **AKIRA EXPANDED** | Display headline besar & all-caps: "HELLO, I'M YESTO", judul board ("PROJECTS", "EXPERIENCES"), label nav tile besar ("SKILLS & TOOLS", "CONTACT") — bentuk hurufnya lebar/expanded & block, cocok sama gaya nama font ini |
| **JetBrains Mono** | Elemen ber-"nuansa data/monospace": jam "18:23 WIB", tag kategori kecil ("FLUTTER", "MOBILE", "WEB"), tanggal ("JAN 2025 — JUN 2025"), label "STATUS:" |
| **SF Pro Rounded** | Body text yang lebih santai: tagline "crafting immersive, user-friendly experiences", quote tile ("Build with Code and Curiosity", "STILL LEARNING, ALWAYS SHIPPING") |
| **SF Pro** | UI text reguler: label tombol ("Home", "Close", "Visit"), nama entitas (nama universitas, nama company) |
| **Inter** | Fallback / body text panjang (deskripsi project, bullet experience) kalau SF Pro tidak tersedia di platform user (SF Pro technically font Apple, butuh fallback web-safe) |

> ⚠️ **Perlu dikonfirmasi**: buka file Figma-nya dan cek langsung font apa yang dipakai di tiap layer teks, lalu update tabel ini. Jangan asal pakai tebakan di atas untuk production.

Konvensi label tile (dari draf awal, masih relevan): teks rata kiri-bawah tile untuk label kategori, huruf kapital untuk label kategori, huruf normal untuk judul.

---

## 4. Sistem Grid (tetap dari draf awal — perlu verifikasi span presisi di Figma)

- Grid dasar: 8 kolom di lebar 1280–1599px, 10 kolom di ≥1600px.
- Tiap sel persegi (`aspect-ratio: 1`), gap **10px** (bukan 6px seperti draf awal — kamu sebutkan 10px di request terbaru, pakai ini sebagai nilai final).
- CSS: `grid-template-columns: repeat(8, 1fr)`, tile pakai `grid-column: span N` + `grid-row: span N`.

Taksonomi ukuran tile (tetap):

| Ukuran | Span | Isi tipikal |
|---|---|---|
| Small | 1×1 | Ikon sosial, jam, angka statistik |
| Medium | 2×1 / 1×2 | Label + ikon, quote pendek, status |
| Square | 2×2 | Nav tile (Projects/Skills/Experience/Contact), foto profil |
| Wide | 4×1 / 4×2 | Tagline besar, project unggulan, grafik kontribusi GitHub |
| Banner | 4×1 full-bleed | Big-type filler tile |

> Span persis per tile di layout aktual (Home, Projects, Experience) sebaiknya diambil langsung dari file Figma (pakai Dev Mode / MCP Figma — lihat `TECH-NOTES.md` §7) daripada dihitung ulang dari screenshot, karena screenshot bisa sedikit meleset dari grid asli.

---

## 5. Board-by-Board — Spesifikasi v2

### A. Home
Isi tile yang terkonfirmasi dari screenshot:
- Foto profil (2×2)
- "HELLO, I'M YESTO" + role "Software Engineer" + tagline "crafting immersive, user-friendly experiences" (tile wide)
- Jam real-time "18:23 WIB" (1×1, live, update tiap menit/detik, zona WIB)
- Lokasi "Surabaya, Indonesia" (1×1)
- Petra Christian University — Informatics Engineering (medium)
- Status "Open to Work" dengan indikator titik hijau (medium)
- GitHub (ikon, link ke profil GitHub)
- LinkedIn — "Connect with me!" (CTA tile, warna coral)
- Download CV (tile dengan ikon panah-download)
- Tagline besar filler: "Build with Code and Curiosity" (banner)
- 4 nav tile besar (2×2): **PROJECTS** (sienna/coral), **SKILLS & TOOLS** (charcoal), **EXPERIENCE** (coral muda), **CONTACT** (falu) — masing-masing punya ikon panah kecil pojok kanan-atas
- GitHub contribution graph — **live**, bukan screenshot (lihat `TECH-NOTES.md` §1)
- 2 tile mode: **Puzzle Mode**, **Fun Mode** (lihat §6 di bawah)

### B. Skills & Tools — *expand-in-place, bukan nav ke board lain*
Tap tile → tile ini **melebar/reveal** menampilkan:
- Grid ikon skill (lihat daftar di `constants.js` — beberapa ikon di screenshot belum teridentifikasi 100%, cek §8 Open Questions)
- "Software Unrelated Skills:" — Video Editing (DaVinci, CapCut), Graphic Design (Figma, Photoshop), Music

### C. Contact — *expand-in-place, sama seperti Skills & Tools*
Tap tile → reveal CTA "LET'S BUILD SOMETHING" + email `yestoya.lumenchristo@gmail.com`.

### D. Projects
- Header "PROJECTS" (fixed, tidak ikut scroll)
- Tab kategori: **ALL / WEB / MOBILE / PERSONAL** + 1 tile deskripsi kategori (fixed, tidak ikut scroll)
- Area grid project — **scroll independen**, hanya area ini yang scroll kalau project bertambah banyak
- Isi grid: 8 project (lihat `constants.js`), 1 tile "Open GitHub", 1 tile "Currently working on: [nama project]" (dengan indikator titik hijau), tile filler kosong kalau perlu genap-in grid
- 4 tile "terlihat berbeda (lebih panjang)" = project **featured/highlighted** — **belum ditandai di screenshot saat ini** (semua 8 project masih terlihat ukuran sama), jadi ini keputusan yang perlu kamu tentukan tile mana yang featured (lihat §8)

### E. Project Detail — *state in-place di dalam board Projects, bukan board terpisah*
Saat project di-klik, area kategori (tab ALL/WEB/dst) berubah jadi **"Close" + nama project**, dan area grid project berubah jadi:
- Deskripsi project (paragraf)
- Tombol "Open GitHub" (atau bisa "Visit", atau kosong — tergantung project, lihat field `cta` di `constants.js`)
- Daftar detail berupa bullet points ("Project Details")
- Project media — **carousel yang jalan otomatis terus** (bukan carousel manual)
- Tombol "Close" untuk kembali ke grid project

### F. Experience
Layout 3 kolom:
- **Kiri**: tile "← Home", tile Settings (Stop Carousel, Carousel Speed, Reverse, Fun Mode — lihat catatan di §8 soal Fun Mode di sini), tile quote "STILL LEARNING, ALWAYS SHIPPING"
- **Tengah**: list role experience, **default auto-scroll carousel pelan**, kecepatan/arah/stop diatur dari panel Settings di kiri
- **Kanan**: header "EXPERIENCES", tile Education (Petra Christian University — Informatics Engineering, 2022–2026), tile "Software Unrelated Experience" (Administrative Assistant Internship, School of Business and Management, Petra Christian University, Aug 2023–Apr 2024)

---

## 6. Puzzle Mode & Fun Mode (baru, hanya ada di Home)

### Puzzle Mode
- Toggle (radio-style) di Home.
- ON → muncul notifikasi bahwa semua tile sekarang draggable.
- Semua tile jadi bisa diangkat & disusun ulang; tile di sekitarnya ikut bergerak/reflow mengikuti posisi baru, seperti puzzle geser.
- OFF → kembali ke layout normal (perlu diputuskan: kembali ke urutan default, atau tetap simpan urutan terakhir user).

### Fun Mode
- Toggle. ON → **semua** komponen bergerak random & chaos terus-menerus.
- Perlu dipastikan toggle-nya sendiri tetap bisa diakses/diklik meski semua tile lain chaos (supaya user bisa matiin lagi).
- Hormati `prefers-reduced-motion`.

Detail teknis & rekomendasi library ada di `TECH-NOTES.md` §2–3.

---

## 7. Aturan Universal

- Fullscreen edge-to-edge untuk desktop; mobile menyusul.
- Gap antar tile: **10px** (perlu dicek apakah nilai sama dipakai juga untuk mobile nanti).
- Padding luar board: disesuaikan (belum ada angka pasti dari screenshot — ambil dari Figma langsung).
- **Setiap** perubahan state/board wajib ada animasi masuk DAN keluar — tidak ada perubahan instan/tanpa transisi, termasuk toggle expand Skills&Tools/Contact, filter kategori Projects, buka/tutup Project Detail, ganti board.
- Prioritas utama: **jangan terlihat AI slop** — checklist di §8 (dari draf awal) tetap berlaku penuh.

## 8. Anti-AI-Slop Checklist (dari draf awal, tetap berlaku)

| Hindari | Ganti dengan |
|---|---|
| Gradient ungu-biru generik, glassmorphism | Warna flat solid, blok warna tegas (khas Metro) |
| Drop shadow lembut ala Framer/AI-gen di semua elemen | Grout line tipis (garis pemisah warna background) sebagai satu-satunya "pemisah" |
| Ikon stok generik (Font Awesome default) | Ikon custom garis 2px, sudut kotak/semi-tegas, dibuat sendiri |
| Foto stok / ilustrasi 3D blob mengambang | Foto asli kamu (duotone brand color), tipografi besar sebagai elemen visual |
| Layout simetris & center-aligned semua | Ritme asimetris ala mosaic Metro — ukuran tile bervariasi |
| Rounded corner besar (16px+) di mana-mana | Radius kecil (0–6px), tegas, atau tajam penuh (0px) |
| Font default (Inter di semua tempat) | Pairing font berkarakter (§3) — Inter hanya jadi fallback, bukan font utama |

---

## 9. Open Questions / Perlu Dikonfirmasi

1. **Mapping font → elemen** (§3) — tebakan visual, cek langsung ke file Figma (belum diverifikasi lewat MCP, metadata tidak mengembalikan info font).
2. ~~2 ikon skill belum teridentifikasi~~ — **RESOLVED lewat Figma MCP**: layer name-nya `laravel` dan `dart`. Skill list final: Python, JavaScript, TypeScript, React, Next.js, PHP, **Laravel**, **Dart**, Flutter, Kotlin, SQL, VS Code, Figma (13 total). `constants.js` sudah diupdate.
3. **"Fun Mode" muncul dua kali** — sebagai tile toggle di Home, DAN sebagai salah satu opsi di panel Settings board Experience. Metadata Figma mengonfirmasi toggle Puzzle Mode & Fun Mode ada di posisi yang identik persis di board Home/Skill & Tools/Contact (kemungkinan level-Home persistent control) — tapi belum ketemu bukti langsung soal versi di Experience settings itu toggle yang sama atau beda. Masih perlu dikonfirmasi manual.
4. **Warna "Falu Terang"** — hex yang kamu kasih (`#C05640`) sama persis dengan "Coral Gelap". Kemungkinan salah kirim, cek ulang nilai aslinya (tidak ada di metadata Figma, cuma raw geometry/text, bukan warna).
5. **4 project featured/wide** — **sebagian RESOLVED lewat Figma MCP**: strukturnya terkonfirmasi ada persis 4 slot wide (~690×255, 2×2) di atas grid, beda ukuran dari slot square (340×297) di bawahnya. Yang **belum** ke-resolve: project spesifik mana yang masuk ke 4 slot itu (frame-nya kosong di level metadata dasar — kemungkinan diisi lewat image fill/component instance yang perlu `get_design_context` untuk baca lebih dalam). Tentukan manual dan set `featured: true` di `constants.js`.
6. **Ejaan nama project** — `design_md.txt` menyebut "Stellaron Raiders", screenshot menunjukkan "Steallron Raiders". Mana yang benar?
7. **Experience list berisi 3 entri identik** di screenshot (placeholder sama persis) — metadata Figma juga menunjukkan 3 frame terpisah (Frame 24, 29, 30) dengan teks yang identik persis, jadi ini memang 3 instance yang sama, bukan cuma kebetulan render. Apakah mau di-dedupe jadi 1 role, atau nanti diisi beberapa role berbeda di Cross Network Indonesia?
8. **Puzzle Mode: OFF state** — balik ke urutan default, atau simpan urutan terakhir yang user atur (di localStorage/session)?
9. **Teks "Back" berulang di banyak node** — waktu baca metadata Figma, banyak text layer bernama/berisi "Back" di tempat yang seharusnya punya teks lain (misal di dalam tab kategori Projects, atau di tile quote Experience). Ini kemungkinan besar teks default dari base component yang belum di-override secara penuh di level metadata dasar (screenshot yang kamu upload menunjukkan teks asli yang benar) — jangan jadikan nilai "Back" di metadata sebagai sumber kebenaran teks, screenshot tetap lebih akurat untuk itu.

Lihat `FIGMA-REFERENCE.md` untuk peta node ID lengkap per board/tile — berguna kalau nanti mau tarik kode/CSS literal per tile pakai Figma MCP (`get_design_context`).
