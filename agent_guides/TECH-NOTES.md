# TECH-NOTES.md — Catatan Implementasi & Tips Figma-to-Code

## 1. Live GitHub Contribution Graph
Opsi, dari yang paling cepat ke paling fleksibel:
- **`react-github-calendar`** — paling gampang, fetch dari GitHub public contribution page tanpa perlu token, render sebagai SVG grid persis kotak-kotak hijau, tinggal styling ulang warnanya. Cocok buat ganti screenshot jadi komponen React langsung tanpa banyak setup.
- **`github-calendar`** (vanilla JS, tanpa React) kalau stack-nya bukan React.
- **Custom fetch via GitHub GraphQL API** (`contributionsCollection`) pakai personal access token, taruh di server route (mis. Next.js `/app/api/github-contributions/route.ts`) supaya token tidak ke-expose ke client, lalu render grid sendiri pakai `COLORS` dari `constants.js`. Ini kalau kamu mau warna kotaknya persis lemon/charcoal, bukan hijau default GitHub.

**Saran**: mulai dari `react-github-calendar` biar cepat jalan, upgrade ke custom fetch kalau nanti butuh kontrol warna penuh.

## 2. Puzzle Mode (drag & reorder)
- **`dnd-kit`** (`@dnd-kit/core` + `@dnd-kit/sortable`) — library drag-drop paling aktif di-maintain saat ini, support grid reorder, aksesibel (keyboard drag juga jalan). Lebih kuat buat drag 2D dengan tile yang span berbeda-beda (1×1, 2×2, 4×2, dst).
- **Framer Motion `Reorder`** (`Reorder.Group` + `Reorder.Item`) — lebih ringan & cepat diimplementasi, animasi tile lain "mengalir" otomatis pas satu tile digeser (built-in layout animation). Tapi didesain untuk list 1D, jadi kalau grid-mu 2D dengan span campur-campur, behavior-nya bisa terasa kurang natural.

**Saran**: mulai dari Framer Motion `Reorder` untuk v1 (implementasinya cepat, animasinya sudah pas dengan "feel" puzzle), upgrade ke `dnd-kit` kalau butuh constraint grid 2D yang lebih presisi.

## 3. Fun Mode (chaos)
- Pakai Framer Motion `animate()` per tile dengan target `x` / `y` / `rotate` random, di-refresh tiap 1–3 detik (`setInterval`), `transition: { type: 'spring' }` supaya gerakannya smooth, bukan teleport.
- **Wajib** cek `window.matchMedia('(prefers-reduced-motion: reduce)')` — kalau aktif, skip animasi chaos atau ganti jadi efek yang jauh lebih ringan (misal cuma ganti warna, bukan posisi).
- Toggle Fun Mode sendiri harus tetap di posisi fixed / tidak ikut dianimasikan, supaya user selalu bisa matiin.

## 4. Transisi antar board (GSAP Flip vs Framer Motion `layoutId`)
- **GSAP Flip plugin**: rekam posisi & ukuran tile sebelum/sesudah state berubah, animasikan otomatis dari state lama ke baru. Sekarang gratis (sudah termasuk paket GSAP core terbaru, tidak perlu Club GreenSock lagi). Powerful tapi API-nya lebih manual (butuh `Flip.getState()` / `Flip.from()`).
- **Framer Motion `layoutId`**: kasih `layoutId` yang sama di tile Home dan versi "expanded"-nya di board tujuan, Framer otomatis animasikan transisi shared-element. Lebih simpel & native untuk React.

**Saran**: pakai Framer Motion `layoutId` untuk transisi board utama (Home → Projects/Experience). Simpan GSAP buat animasi timeline-based yang lebih kompleks (entrance stagger tile, live tile flip).

## 5. Live tile flip (opsional, dari `design_md.txt` §8)
- `rotateY`/`rotateX` 180° pakai CSS `transform-style: preserve-3d` + `backface-visibility: hidden`. Dua "face" (front/back) ditumpuk `position: absolute`, toggle class/state tiap interval (5–8 detik).

## 6. Struktur Folder yang Disarankan (contoh Next.js App Router)

```
/app
  page.tsx                    -> Home board
  /projects/page.tsx          -> Projects board (grid + detail in-place)
  /experience/page.tsx        -> Experience board
/components
  /tiles/                     -> Tile primitives (Square, Wide, Banner, NavTile, ...)
  /boards/                    -> Layout tiap board
  /modes/PuzzleMode.tsx
  /modes/FunMode.tsx
  /projects/ProjectGrid.tsx
  /projects/ProjectDetail.tsx
  /experience/ExperienceCarousel.tsx
  /experience/SettingsPanel.tsx
/lib
  constants.js                -> file yang barusan dibuat
  github.ts                   -> fetch contribution graph
/public
  /assets/                    -> semua aset manual (cover project, icon, foto profil, CV)
```

## 7. Tips Import Desain Figma ke Code

- Pastikan di Figma semua warna dipakai sebagai **Styles/Variables**, bukan hex manual per layer — supaya waktu export lewat Dev Mode, token-nya konsisten dan gampang di-mapping ke `COLORS` di `constants.js` / Tailwind theme.
- Aktifkan **Figma Dev Mode**, cek CSS yang di-generate per tile (padding, gap, font-size) — jangan asal copy, karena Figma sering generate `px` absolut yang tidak scalable; convert ke `rem`/`clamp()` untuk kebutuhan responsive nanti.
- Untuk grid presisi (8 kolom di 1280–1599px, 10 kolom di ≥1600px), **jangan andalkan auto-layout Figma** buat generate grid CSS — lebih gampang define manual `grid-template-columns: repeat(8, 1fr)` dan tentukan `grid-column: span N` per tile langsung di code, sesuai taksonomi Small/Medium/Square/Wide/Banner di `DESIGN-SYSTEM.md` §4.
- Tools "Figma to code" (Anima, Locofy, plugin Figma-to-React) bisa dipakai sebagai starting point struktur HTML/CSS per tile individual, tapi hasilnya biasanya perlu dirapikan ulang (banyak div nested & inline style). Karena concern utama kamu adalah "jangan AI slop", jangan pakai output-nya mentah-mentah — pakai cuma buat referensi ukuran/spacing, lalu tulis ulang komponennya manual di React + Tailwind biar classname & struktur tetap bersih sesuai design token sendiri.
- Ada **Figma MCP connector** yang bisa dikoneksikan langsung ke chat/editor ini untuk baca node Figma (ukuran, warna, teks, screenshot per frame) tanpa manual copy-paste — kalau kamu mau, aku bisa bantu setup di akhir percakapan ini.

## 8. Checklist Sebelum Mulai Coding

- [ ] Isi semua field kosong/TODO di `constants.js` (URL sosial, GitHub username, deskripsi project, bullet detail, path asset)
- [ ] Konfirmasi mapping font ke tiap elemen (`DESIGN-SYSTEM.md` §3)
- [ ] Konfirmasi 2 ikon skill yang belum teridentifikasi
- [ ] Putuskan scope "Fun Mode" — global atau per-board (`DESIGN-SYSTEM.md` §9.3)
- [ ] Tentukan 4 project yang jadi featured/wide tile, set `featured: true` di `constants.js`
- [ ] Putuskan Puzzle Mode: urutan tersimpan atau reset ke default saat OFF
- [ ] Siapkan token GitHub kalau pakai custom fetch, atau langsung pakai `react-github-calendar`
- [ ] Cek ulang hex "Falu Terang" di Figma (saat ini identik dengan "Coral Gelap")
