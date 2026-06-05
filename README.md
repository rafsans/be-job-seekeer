# Job Matching Platform - Backend

Ini adalah mesin utama (Backend) untuk **Job Matching Platform**. Mengatur segala logika mulai dari autentikasi, manajemen data pengguna, loker, hingga komunikasi data file dengan server AI.

## Tech Stack
- **Node.js & Express.js** (Kerangka utama server)
- **PostgreSQL** (Sistem *Database* relasional)
- **Prisma ORM** (Untuk manajemen skema database yang rapi)
- **JSON Web Token (JWT)** (Untuk sistem *login* dan keamanan API)
- **Zod** (Validasi *input* data yang ketat)
- **Multer** (Menangani unggahan *file* PDF di memori sebelum dikirim ke AI)

## Cara Menjalankan Secara Lokal

Pastikan kamu sudah menginstal Node.js dan memiliki server PostgreSQL yang menyala.

1. **Buka terminal** di dalam folder ini.
2. **Install semua paket yang dibutuhkan**:
   ```bash
   npm install
   ```
3. **Konfigurasi Environment**:
   Buat file bernama `.env` di folder utama dan isi konfigurasi berikut (sesuaikan *username* dan *password* DB kamu):
   ```env
   PORT=3000
   DATABASE_URL="postgresql://username:password@localhost:5432/nama_database?schema=public"
   JWT_SECRET="rahasia_jwt_kamu_yang_sangat_aman"
   AI_SERVICE_URL="http://127.0.0.1:5000"
   ```
4. **Inisialisasi Database (Prisma)**:
   Perintah ini akan membuat tabel-tabel yang diperlukan di *database* kamu:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
5. **Nyalakan Server Development**:
   ```bash
   npm run dev
   ```
Server akan menyala di `http://localhost:3000`. API siap menerima *request* dari Frontend!
