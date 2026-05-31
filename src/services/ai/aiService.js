/**
 * AI Service
 * Modul ini berfungsi untuk menghubungkan backend utama (Node.js) 
 * dengan service AI klasifikasi dan rekomendasi pekerjaan (Flask/Python).
 */
import dotenv from "dotenv";

// Pastikan env variables ter-load (meski biasanya sudah di index.js)
dotenv.config();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:5000";
const AI_API_KEY = process.env.AI_API_KEY || "";

/**
 * Helper function untuk menangani HTTP request ke API AI
 */
async function fetchFromAi(endpoint, options = {}) {
  const url = `${AI_SERVICE_URL}${endpoint}`;
  
  // Siapkan headers default
  const headers = new Headers(options.headers || {});
  
  // Tambahkan API Key jika dikonfigurasi di AI Service
  if (AI_API_KEY) {
    headers.set("api-key", AI_API_KEY);
  }

  // Jika body adalah JSON dan bukan FormData
  if (options.body && typeof options.body === 'string' && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(`AI Service Error (${response.status}): ${errorData.error || response.statusText}`);
  }

  return response.json();
}

/**
 * Memprediksi top 3 kategori pekerjaan dari teks (contoh: CV yang sudah diekstrak)
 * @param {string} text - Teks resume/CV
 * @param {number} top_n - Jumlah rekomendasi job yang diminta (default: 5)
 */
export async function predictText(text, top_n = 5) {
  if (!text) throw new Error("Text is required for prediction");
  
  return fetchFromAi("/predict-text", {
    method: "POST",
    body: JSON.stringify({ text, top_n })
  });
}

/**
 * Mendapatkan rekomendasi kecocokan pekerjaan berdasarkan teks resume
 * @param {string} resume_text - Teks resume/CV
 * @param {number} top_n - Jumlah rekomendasi (default: 10)
 */
export async function matchJobs(resume_text, top_n = 10) {
  if (!resume_text) throw new Error("Resume text is required");
  
  return fetchFromAi("/match-jobs", {
    method: "POST",
    body: JSON.stringify({ resume_text, top_n })
  });
}

/**
 * Menganalisis teks CV untuk memberikan feedback dan saran perbaikan
 * @param {string} text - Teks mentah dari CV
 */
export async function analyzeCvText(text) {
  if (!text) throw new Error("Text is required for CV analysis");

  return fetchFromAi("/analyze-cv", {
    method: "POST",
    body: JSON.stringify({ text })
  });
}

/**
 * Menganalisis File CV secara langsung
 * @param {Buffer|Blob} fileBuffer - Buffer dari file (dari Multer)
 * @param {string} filename - Nama file aslinya (opsional)
 */
export async function analyzeCvFile(fileBuffer, filename = "resume.pdf") {
  const formData = new FormData();
  
  // Node.js v18+ native fetch FormData membutuhkan Blob
  const blob = new Blob([fileBuffer]);
  formData.append("file", blob, filename);

  return fetchFromAi("/analyze-cv", {
    method: "POST",
    body: formData,
    // Ingat: Jangan set Content-Type secara manual saat menggunakan FormData
    // agar native fetch men-generate boundary-nya secara otomatis
  });
}

/**
 * Menganalisis CV secara langsung melalui URL
 * @param {string} url - URL file CV/resume
 */
export async function analyzeCvUrl(url) {
  if (!url) throw new Error("URL is required for CV analysis");

  return fetchFromAi("/analyze-cv-url", {
    method: "POST",
    body: JSON.stringify({ url })
  });
}

/**
 * Mentranslate teks (biasanya Indonesia -> Inggris)
 * @param {string} text - Teks sumber
 */
export async function translateText(text) {
  if (!text) throw new Error("Text is required for translation");

  return fetchFromAi("/translate", {
    method: "POST",
    body: JSON.stringify({ text })
  });
}

/**
 * Memprediksi top 3 kategori pekerjaan dari file secara langsung
 * @param {Buffer|Blob} fileBuffer - Buffer dari file (dari Multer)
 * @param {string} filename - Nama file aslinya
 */
export async function predictFile(fileBuffer, filename = "resume.pdf") {
  const formData = new FormData();
  
  const blob = new Blob([fileBuffer]);
  formData.append("file", blob, filename);

  return fetchFromAi("/predict", {
    method: "POST",
    body: formData,
  });
}

/**
 * Memprediksi top 3 kategori pekerjaan dari link/URL
 * @param {string} url - URL publik file resume (misal dari S3)
 * @param {number} top_n - Jumlah rekomendasi job yang diminta (default: 5)
 */
export async function predictUrl(url, top_n = 5) {
  if (!url) throw new Error("URL is required for prediction");
  
  return fetchFromAi("/predict-url", {
    method: "POST",
    body: JSON.stringify({ url, top_n })
  });
}
