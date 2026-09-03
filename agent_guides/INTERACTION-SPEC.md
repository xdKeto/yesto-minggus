# INTERACTION-SPEC.md — Behavior Detail Tiap Komponen

Dokumen ini melengkapi `DESIGN-SYSTEM.md` (yang fokus visual) dengan detail **state, trigger, dan animasi** tiap komponen — supaya lebih gampang diterjemahkan langsung jadi komponen React/Vue.

Prinsip umum yang berlaku ke SEMUA komponen di bawah:
- Setiap state change = animasi **masuk** (enter) DAN **keluar** (exit). Tidak ada perubahan instan.
- Hormati `prefers-reduced-motion`: kalau aktif, ganti animasi jadi cross-fade cepat/tanpa gerakan fisik besar (terutama penting untuk Fun Mode).
- Semua tile interaktif butuh state: `default`, `hover`, `pressed/active`, `focus` (keyboard nav — jangan lupa aksesibilitas dasar meski desainnya "tile board").

---

## 1. Home Board

### 1.1 Tile statis (foto, jam, lokasi, education, status)
- Jam: update tiap menit (atau detik kalau mau terasa "hidup"), format `HH:mm` + label "WIB".
- Tidak butuh interaksi klik, kecuali foto (opsional: bisa jadi trigger micro-tilt sesuai posisi kursor, dari draf awal §8).

### 1.2 Nav tile (Projects, Experience) — 2 dari 4 nav tile yang benar-benar pindah board
- Trigger: klik.
- Animasi: tile yang diklik membesar mengisi layar (shared-element / `layoutId`), board baru "unfold" dari situ. Board lama exit dengan stagger fade/scale tile-nya.
- Tile kecil "← Home" muncul di pojok kiri-atas board tujuan, sebagai satu-satunya jalan balik.

### 1.3 Skills & Tools tile — expand-in-place
- Trigger: **tap/klik** (bukan hover — penting, karena target device termasuk yang tidak punya hover state, dan supaya konsisten dengan Contact).
- State: `collapsed` (default, cuma label "SKILLS & TOOLS" + ikon panah) ↔ `expanded` (grid ikon skill + software unrelated skills muncul).
- Saat expand: tile ini bertambah ukuran (grid-span berubah, tile lain di sekitarnya reflow), isi grid ikon muncul dengan stagger fade+scale-in.
- Saat collapse (tap lagi / tap di luar tile / tombol close kecil): reverse animasi, tile kembali ke ukuran semula, tile lain reflow balik.
- **Hanya 1 tile expand-in-place yang aktif dalam satu waktu** disarankan (kalau Contact sedang expanded lalu user tap Skills & Tools, Contact auto-collapse dulu) — supaya layout tidak berantakan dengan 2 tile besar sekaligus. *(asumsi desain, konfirmasi ke user kalau mau keduanya bisa expand bersamaan)*

### 1.4 Contact tile — expand-in-place
- Behavior identik dengan Skills & Tools (§1.3), isi berbeda: reveal CTA "LET'S BUILD SOMETHING" + email.
- Klik/tap pada email → copy-to-clipboard (opsional) atau `mailto:` link.

### 1.5 GitHub Contribution Graph tile
- Live-fetch saat board Home mount (lihat `TECH-NOTES.md` §1 untuk pilihan library).
- Tampilkan skeleton/loading state (bukan spinner generic — misal shimmer warna charcoal/ink) selagi fetch.
- Kalau fetch gagal (rate limit, network): fallback tampilkan pesan singkat atau grid kosong, JANGAN biarkan tile kosong tanpa penjelasan.

### 1.6 Puzzle Mode toggle
- Radio/switch tile.
- ON:
  1. Tampilkan notifikasi/toast singkat: "Puzzle mode aktif — geser tile untuk mengatur ulang".
  2. Semua tile Home (kecuali toggle Puzzle Mode & Fun Mode sendiri — supaya user selalu bisa matiin) jadi draggable.
  3. Saat drag salah satu tile ke posisi tile lain, tile-tile yang terlewati reflow/shift mengikuti (bukan cuma swap 1-1 — cek §2 di `TECH-NOTES.md` untuk pilihan implementasi: Framer Motion `Reorder` vs `dnd-kit`).
- OFF: tile berhenti draggable. **Perlu keputusan** (lihat `DESIGN-SYSTEM.md` §9.8): urutan kembali default, atau tetap tersimpan.
- Drag handle: seluruh tile bisa jadi handle (simpel), atau kasih indikator visual kecil (titik-titik) di pojok tile saat mode aktif supaya jelas tile itu "grabbable".

### 1.7 Fun Mode toggle
- Toggle switch.
- ON: semua tile mulai animasi posisi random terus-menerus (lihat `TECH-NOTES.md` §3 untuk implementasi).
  - Toggle Fun Mode sendiri **tetap di posisi fixed / tidak ikut chaos** supaya bisa dimatikan kapan saja.
  - Kalau `prefers-reduced-motion` aktif di browser user: skip animasi chaos, tampilkan state visual alternatif (misal cuma ganti warna acak, bukan posisi) atau munculkan dialog konfirmasi dulu sebelum aktifkan penuh.
- OFF: semua tile animasi kembali ke posisi grid normalnya (bukan snap instan — tetap pakai easing).
- **Perlu diputuskan**: apakah Puzzle Mode & Fun Mode bisa aktif bersamaan? Disarankan **tidak** — aktifkan salah satu otomatis matikan yang lain (mutually exclusive), karena drag manual + random chaos akan konflik secara UX.

---

## 2. Projects Board

### 2.1 Kategori tab (ALL / WEB / MOBILE / PERSONAL)
- Trigger: klik tab.
- **Hanya area grid project yang re-render/animasi** (fade-out project yang tidak match filter → grid reflow → fade-in yang match). Header "PROJECTS" dan tab bar sendiri **tidak** ikut animasi/reload.
- Tab aktif: ganti warna background (lihat contoh screenshot: ALL=lemon, WEB=coral, MOBILE=merah gelap, PERSONAL=falu-ish) — kemungkinan warnanya representasi kategori, bukan sekadar "aktif vs tidak".

### 2.2 Grid project (area scroll independen)
- Grid punya `overflow-y: auto` sendiri, terpisah dari header+tab yang fixed.
- Tile featured (4 project wide) span lebih besar dari tile biasa (lihat `DESIGN-SYSTEM.md` §9.5 — masih perlu ditentukan yang mana).
- Hover state: tile scale turun tipis (0.96–0.97) + brightness naik dikit (dari draf awal §7).

### 2.3 Klik project → Project Detail (in-place)
- Trigger: klik salah satu tile project (bukan tile "Open GitHub" atau "Currently working on", itu punya behavior sendiri — external link).
- Animasi: area kategori tab → transform jadi "Close" button + nama project (crossfade/slide). Area grid project → transform jadi layout detail (description, bullets, media carousel, CTA).
- Tombol "Close": kembali ke state grid + kategori tab (reverse animasi), filter kategori yang aktif sebelumnya tetap kepilih (jangan reset ke "ALL").
- Project media carousel: **auto-play terus-menerus**, tidak butuh tombol next/prev manual (opsional tambahkan swipe/klik buat skip kalau mau, tapi defaultnya auto).
- CTA button: label & behavior beda-beda per project (`Visit` → external link, `Open GitHub` → link ke repo, atau tile kosong kalau project tidak ada link publik) — ambil dari field `cta` di `constants.js`.

### 2.4 "Open GitHub" tile & "Currently working on" tile
- "Open GitHub": klik → buka profil GitHub di tab baru. Bukan bagian dari filter kategori (selalu muncul di semua kategori, atau cuma di "ALL" — perlu diputuskan).
- "Currently working on": tile status, klik → bisa langsung buka Project Detail dari project yang sedang dikerjakan (kalau project itu ada di list) atau cuma display info tanpa klik.

---

## 3. Experience Board

### 3.1 List experience (tengah)
- Default: auto-scroll carousel pelan (arah ke atas), infinite loop (balik ke awal setelah entri terakhir, tanpa jeda canggung).
- Hover/interaksi user di area list: **pause** auto-scroll (supaya bisa baca), resume setelah beberapa detik idle atau tombol resume manual.

### 3.2 Settings panel (kiri)
- **Stop Carousel**: toggle, pause/resume auto-scroll manual.
- **Carousel Speed**: slider/step control, ubah kecepatan scroll real-time.
- **Reverse**: toggle arah scroll (atas↔bawah).
- **Fun Mode**: — lihat catatan penting di `DESIGN-SYSTEM.md` §9.3, perlu dikonfirmasi apakah ini toggle global yang sama dengan Home, atau setting khusus board ini.

### 3.3 Tile kanan (Education, Software Unrelated Experience)
- Statis, tidak ada interaksi khusus kecuali mungkin expand-in-place kalau bullet-nya panjang (opsional, ikuti pola Skills & Tools kalau perlu).

---

## 4. Ringkasan Animasi (referensi cepat)

| Event | Animasi |
|---|---|
| Board mount pertama kali | Stagger scale+opacity per tile, delay ~30–50ms, arah dari kiri-atas (dari draf awal §8) |
| Pindah board (nav tile diklik) | Shared-element expand dari tile asal → fullscreen → board baru unfold |
| Toggle expand (Skills&Tools / Contact) | Tile grow + reflow tetangga, isi fade+scale-in stagger; reverse saat collapse |
| Filter kategori Projects | Fade-out non-match → grid reflow → fade-in match (hanya area grid) |
| Buka Project Detail | Cross-fade tab area → "Close"+nama; grid area → layout detail |
| Tutup Project Detail | Reverse dari atas |
| Puzzle Mode drag | Real-time reflow tile lain saat drag (library-driven, lihat `TECH-NOTES.md`) |
| Fun Mode aktif | Continuous random x/y/rotate per tile, spring easing |
| Live tile flip (opsional) | `rotateY/X` 180° tiap 5–8 detik antar front/back face |
| Jam real-time | Update angka tiap menit/detik tanpa animasi besar (cukup fade digit kalau mau halus) |

Semua durasi & easing di atas belum ditentukan angkanya — sarannya mulai dari `duration: 0.3–0.5s`, `ease: 'easeOut'` untuk enter, `'easeIn'` untuk exit, lalu di-tuning langsung pas lihat hasilnya di browser (animasi itu susah "benar" di atas kertas).
