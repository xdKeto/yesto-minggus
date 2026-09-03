# FIGMA-REFERENCE.md — Peta Node Figma

File: **Porto** — `https://www.figma.com/design/yHsiW0QULjU8eEBc1nwEWI/Porto`
File key: `yHsiW0QULjU8eEBc1nwEWI`
Page: "Page 2" (`4025:304`) → section "Design" (`4033:686`)

Data di bawah diambil langsung dari file Figma-mu lewat Figma MCP (`get_metadata`). Semua ukuran dalam px, berdasar kanvas board 1920×1080 (skala 1:1 dengan target desktop). Gunakan node ID di sini untuk narik kode/CSS literal per tile nanti lewat `get_design_context` (butuh `fileKey` + `nodeId`, format `1234:5678`).

> ⚠️ Catatan: metadata dasar (`get_metadata`) cuma kasih posisi/ukuran/nama layer, BUKAN warna/font/spacing detail atau teks instance yang sudah di-override. Untuk itu perlu `get_design_context` per node — lebih mahal, jadi tarik satu-satu pas mau coding tile itu, bukan semua sekaligus.

## Board root nodes

| Board | Node ID | Size |
|---|---|---|
| Home | `4033:688` | 1920×1080 |
| Contact (expanded state) | `4046:643` | 1920×1080 |
| Skill & Tools (expanded state) | `4046:604` | 1920×1080 |
| Projects | `4040:519` | 1920×1080 |
| Project Detail | `4043:2` | 1920×1080 |
| Experience | `4041:775` | 1920×1080 |

**Penting**: "Contact" dan "Skill & Tools" di Figma dibuat sebagai board/page terpisah untuk merepresentasikan *state* expand masing-masing — bukan berarti di kode nanti mereka jadi route/page beda. Di kode, ini tetap satu Home component dengan 2 state toggle (lihat `INTERACTION-SPEC.md` §1.3–1.4).

## Home — tile-tile utama

| Tile | Node ID | Posisi (x,y) | Ukuran |
|---|---|---|---|
| Foto profil | `4033:689` | 16, 18 | 340×399 |
| Hero text ("Hello, I'm yesto" + tagline) | `4038:313` | 366, 16 | 1039×200 |
| Education (Petra Christian University) | `4038:318` | 366, 226 | 514.5×190 |
| Status "Open to Work" | `4038:321` | 890, 226 | 514.5×190 |
| Jam WIB | `4038:304` | 1415, 16 | 240×200 |
| Lokasi Surabaya | `4038:311` | 1665, 16 | 239×200 |
| GitHub (ikon) | `4039:16` | 366, 426 | 252.5×151.5 |
| LinkedIn "Connect with me!" | `4040:21` | 628, 425 | 252.5×151.5 |
| Download CV | `4040:334` | 890, 425 | 515×151 |
| Tagline besar "Build with Code and Curiosity" | `4039:20` | 366, 587 | 1039×151 |
| **GitHub contribution graph** (kosong — ini yang perlu di-live-fetch) | `4040:353` | 366, 748 | 1039×316 |
| Nav tile Skills & Tools (collapsed) | `4038:364` | 16, 427 | 340×313 |
| Nav tile Contact (collapsed) | `4038:371` | 16, 751 | 340×313 |
| Nav tile Projects | `4038:372` | 1415, 226 | 489×313 |
| Nav tile Experience | `4038:373` | 1415, 550 | 489×313 |
| Toggle Puzzle Mode | `4040:349` | 1415, 879 | 239×185 |
| Toggle Fun Mode | `4040:352` | 1664, 879 | 240×185 |

Teks asli (dari layer name, sudah konfirmasi):
- `"Hello, I'm yesto"` (huruf kecil di layer — tampil kapital di screenshot berarti pakai `text-transform: uppercase` di CSS, bukan literal caps di data)
- `"Software Engineer crafting immersive, user-friendly experiences"` — ini SATU text node, bukan dua terpisah (role + tagline jadi satu paragraf/blok)

## Skills & Tools — grid ikon (saat expanded, node `4046:630`, ukuran 1389×313 menggantikan slot Contact)

13 ikon (posisi x,y relatif ke frame `4046:630`), semua ukuran 72×72 kecuali sql/vsc (72×72 juga tapi ada extra vector wrapper):

| Icon | Layer name | Posisi |
|---|---|---|
| Python | `python` | 372, 23 |
| JavaScript | `javascript-svgrepo-com 1` | 464, 23 |
| TypeScript | `typescript-svgrepo-com 1` | 556, 23 |
| React | `react` | 648, 23 |
| Next.js | `next-js-svgrepo-com 1` | 740, 23 |
| PHP | `php-svgrepo-com 1` | 833, 23 |
| Laravel | `laravel` | 926, 23 |
| Dart | `dart` | 1018, 23 |
| Flutter | `flutter` | 1110, 23 |
| Kotlin | `kotlin` | 1202, 23 |
| SQL | `sql-svgrepo-com 1` (di dalam frame `sql`) | 372, 107 |
| VS Code | `vscode-svgrepo-com 1` (di dalam frame `vsc`) | 464, 107 |
| Figma | `figma` | 556, 107 |

Software Unrelated Skills block: node `4048:921`, posisi (998, 185), berisi 3 baris teks — "Video Editing (Davinci, Capcut)", "Graphic Design (Figma, Photoshop)", "Music :)".

## Contact — expanded (node `4046:690`, 1389×313, menggantikan slot Skills & Tools)

- Header "Contact": `4046:692`
- "LETS BUILD SOMETHING": `4046:700`
- Email "yestoya.lumenchristo@gmail.com": `4046:713`

## Projects — grid area

| Tile | Node ID | Posisi | Ukuran |
|---|---|---|---|
| "← Home" | `4040:545` | 16, 16 | 150×150 |
| Judul "Projects" | `4040:579` | 336, 16 | 1319×150 |
| Tab kategori (5 frame: ALL/WEB/MOBILE/PERSONAL + deskripsi) | `4040:583`, `4040:582`, `4040:584`, `4040:585`, `4040:595` | y=176 | tinggi 50, lebar bervariasi 150–1180 |
| **4 featured tile (wide, 2×2 block)** | `4040:600`, `4040:601`, `4040:610`, `4040:611` | (16,236) / (13,501) / (716,501) / (716,236) | ~690×255 tiap tile |
| Square tile lain | `4040:561`, `4040:599`, `4040:602`, `4040:603`, `4040:612` | y=767 / y=236 | 340×297 |
| "Currently working on: GuitarCable" | `4040:604` | 1419, 767 | 340×297 |
| Filler dekoratif (kolom panjang di kanan) | `4040:613` | 1772, 236 | 135×828 |

> Isi nama/cover 8 project tidak ke-resolve di level metadata dasar (frame-nya kosong) — kemungkinan diisi lewat image fill / component instance. Kalau butuh tahu tile mana isinya project apa, tarik `get_design_context` per node ID di atas satu-satu.

## Project Detail

Root: `4043:2`. Struktur mirip Projects tapi tab kategori berubah jadi "Close" (`4043:15`, posisi 16,176, 310×50) + nama project (`4043:13`, posisi 336,176). Area bawah: deskripsi (`4044:408`), project media/carousel (`4044:417`, posisi 1419,452, 340×612), detail bullet (`4044:415`, posisi 16,452, 1390×612).

## Experience

| Tile | Node ID | Posisi | Ukuran |
|---|---|---|---|
| "← Home" | `4041:877` | 16, 16 | 150×150 |
| Header "Experiences" | `4041:428` | 1252, 16 | 652×150 |
| Settings panel | `4044:433` | 16, 176 | 390×580 |
| Quote tile | `4041:793` | 16, 766 | 390×298 |
| Education | `4044:434` | 1252, 176 | 652×580 |
| Role entry #1 | `4044:431` | 416, 16 | 826×441 |
| Role entry #2 (identik #1) | `4046:477` | 416, 467 | 826×441 |
| Role entry #3 (identik #1) | `4046:499` | 415, 918 | 826×441 |
| Software Unrelated Experience | `4045:440` | 1252, 766 | 652×298 |

Settings panel isi (node `4044:433`): "Settings:" → "Stop Carousel" → "Carousel Speed" → "Reverse" → "Fun Mode" (4 opsi berurutan vertikal).

## Cara pakai lebih lanjut

Kalau kamu (atau aku di sesi selanjutnya, termasuk lewat Claude Code kalau connector Figma-nya juga ada di sana) mau mulai coding tile tertentu, tinggal panggil `get_design_context` dengan `fileKey: yHsiW0QULjU8eEBc1nwEWI` dan `nodeId` dari tabel di atas — itu bakal ngasih kode referensi + screenshot + asset per tile itu, jauh lebih akurat daripada nebak dari screenshot biasa.
