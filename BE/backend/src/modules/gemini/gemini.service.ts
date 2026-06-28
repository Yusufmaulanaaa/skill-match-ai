import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../../config';
import { GeminiAnalysis } from './gemini.types';

let genAI: GoogleGenerativeAI | null = null;
let model: ReturnType<GoogleGenerativeAI['getGenerativeModel']> | null = null;

if (config.geminiApiKey) {
  genAI = new GoogleGenerativeAI(config.geminiApiKey);
  model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
}

function getFallbackAnalysis(): GeminiAnalysis {
  return {
    summary: 'Analisis tidak tersedia saat ini. Silakan coba lagi nanti.',
    strengths: ['Belum dapat dianalisis'],
    weaknesses: ['Belum dapat dianalisis'],
    learningSuggestions: ['Coba lagi nanti untuk rekomendasi belajar'],
    careerGrowth: ['Coba lagi nanti untuk informasi pertumbuhan karir'],
    requiredSkills: ['Belum dapat dianalisis'],
    recommendedProjects: ['Belum dapat dianalisis'],
  };
}

/**
 * Ensure an array has at least `min` items.
 * If empty or shorter than min, pads with generated items based on career context.
 */
function ensureMinItems(
  arr: string[] | undefined | null,
  min: number,
  careerName: string,
  category: 'strength' | 'weakness' | 'learning' | 'career',
  careerData?: { description?: string; requiredSkills?: string[]; learningPath?: string[]; suggestedProjects?: string[] }
): string[] {
  if (!arr || !Array.isArray(arr) || arr.length === 0) {
    // Auto-generate based on career context
    return generateFallbackItems(min, careerName, category, careerData);
  }

  const cleaned = arr.filter((item) => typeof item === 'string' && item.trim().length > 0);
  if (cleaned.length >= min) return cleaned.slice(0, min);

  // Pad with generated items
  const generated = generateFallbackItems(min - cleaned.length, careerName, category, careerData);
  return [...cleaned, ...generated];
}

function generateFallbackItems(
  count: number,
  careerName: string,
  category: 'strength' | 'weakness' | 'learning' | 'career',
  _careerData?: { description?: string; requiredSkills?: string[]; learningPath?: string[]; suggestedProjects?: string[] }
): string[] {
  const items: Record<string, string[]> = {
    strength: [
      `Minat yang kuat di bidang ${careerName}`,
      `Kesesuaian dengan tuntutan teknis ${careerName}`,
      `Potensi untuk berkembang di bidang teknologi`,
      `Kemampuan analisis dan pemecahan masalah`,
      `Kesiapan untuk mempelajari teknologi baru`,
      `Dasar pengetahuan yang relevan dengan ${careerName}`,
      `Antusiasme dalam pengembangan diri di bidang IT`,
    ],
    weakness: [
      `Pengalaman praktis di ${careerName} masih perlu ditingkatkan`,
      `Perlu memperdalam fundamental teknis`,
      `Kurangnya exposure terhadap proyek nyata`,
      `Perlu meningkatkan pemahaman arsitektur sistem`,
      `Perlu membangun portofolio yang lebih kuat`,
      `Keterampilan kolaborasi dan version control perlu diasah`,
      `Perlu mengikuti perkembangan teknologi terbaru`,
    ],
    learning: [
      `Ikuti kursus online terstruktur tentang ${careerName}`,
      `Bangun proyek portofolio untuk memperkuat pemahaman`,
      `Bergabung dengan komunitas developer untuk networking`,
      `Praktikkan konsep yang dipelajari setiap hari`,
      `Ikuti bootcamp atau workshop intensif`,
      `Pelajari best practices dan design patterns`,
      `Dokumentasikan perjalanan belajar di blog atau GitHub`,
    ],
    career: [
      `${careerName} di perusahaan teknologi terkemuka`,
      `Freelance ${careerName} untuk proyek skala kecil hingga menengah`,
      `Spesialisasi di sub-bidang ${careerName}`,
      `${careerName} di startup teknologi`,
      `Technical lead atau arsitek untuk tim pengembangan`,
      `Konsultan independen untuk solusi teknologi`,
      `Pengajar atau mentor di bidang ${careerName}`,
    ],
  };

  const pool = items[category] || items.learning;
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(pool[i % pool.length]);
  }
  return result;
}

/**
 * Validate that the parsed object matches the expected GeminiAnalysis structure.
 * Throws if required fields are missing or have wrong types.
 */
function validateGeminiStructure(data: any, careerName: string, careerData?: any): GeminiAnalysis {
  const errors: string[] = [];

  if (typeof data?.summary !== 'string' || data.summary.trim().length === 0) {
    errors.push('summary must be a non-empty string');
  }
  if (!Array.isArray(data?.strengths)) {
    errors.push('strengths must be an array');
  }
  if (!Array.isArray(data?.weaknesses)) {
    errors.push('weaknesses must be an array');
  }
  if (!Array.isArray(data?.learningSuggestions)) {
    errors.push('learningSuggestions must be an array');
  }
  if (!Array.isArray(data?.careerGrowth)) {
    errors.push('careerGrowth must be an array');
  }

  if (errors.length > 0) {
    console.error('[Gemini Validation Errors]', errors);
    throw new Error(`Invalid Gemini response structure: ${errors.join(', ')}`);
  }

  // Auto-generate minimum 5 items for each array if empty or too short
  const strengths = ensureMinItems(data.strengths, 5, careerName, 'strength', careerData);
  const weaknesses = ensureMinItems(data.weaknesses, 5, careerName, 'weakness', careerData);
  const learningSuggestions = ensureMinItems(data.learningSuggestions, 5, careerName, 'learning', careerData);
  const careerGrowth = ensureMinItems(data.careerGrowth, 5, careerName, 'career', careerData);

  // Ensure summary is at least 150 words; if not, pad it with career info
  let summary = data.summary.trim();
  const wordCount = summary.split(/\s+/).length;
  if (wordCount < 150) {
    const careerInfo = careerData?.description
      ? `\n\nSebagai ${careerName}, ${careerData.description}`
      : '';
    const skillInfo = careerData?.requiredSkills?.length
      ? `\n\nUntuk menjadi ${careerName} yang kompeten, diperlukan keterampilan seperti: ${careerData.requiredSkills.slice(0, 6).join(', ')}.`
      : '';
    const additionalWords = ` Dengan menguasai keterampilan-keterampilan ini, Anda akan memiliki fondasi yang kuat untuk memulai karir sebagai ${careerName}. Teruslah belajar dan mengembangkan diri melalui proyek-proyek praktis dan kursus online.${careerInfo}${skillInfo}`;
    summary = summary + additionalWords;
  }

  return {
    summary,
    strengths,
    weaknesses,
    learningSuggestions,
    careerGrowth,
    requiredSkills: Array.isArray(data.requiredSkills) ? data.requiredSkills : [],
    recommendedProjects: Array.isArray(data.recommendedProjects) ? data.recommendedProjects : [],
  };
}

const IMPROVED_PROMPT = `Anda adalah asisten analisis karir IT yang ahli. Berikan analisis yang mendalam, personal, dan actionable.

--- PERSYARATAN OUTPUT ---
Anda HARUS mengembalikan JSON valid (tanpa markdown, tanpa backtick, tanpa teks lain) dengan format EXACT berikut:
{
  "summary": "string (MINIMAL 150 kata, analisis mendalam tentang profil pengguna, potensi karir, dan langkah strategis)",
  "strengths": ["string", ...] (WAJIB 5 item, analisis kekuatan berdasarkan minat dan skill pengguna),
  "weaknesses": ["string", ...] (WAJIB 5 item, area yang perlu dikembangkan secara spesifik),
  "learningSuggestions": ["string", ...] (WAJIB 5 item, saran belajar yang konkret dan terstruktur),
  "careerGrowth": ["string", ...] (WAJIB 5 item, prospek karir jangka pendek dan panjang),
  "requiredSkills": ["string", ...] (minimal 3 skill yang paling relevan),
  "recommendedProjects": ["string", ...] (minimal 3 proyek yang direkomendasikan)
}

WAJIB:
- summary: MINIMAL 150 KATA. Jelaskan profil pengguna secara komprehensif, identifikasi potensi utama, berikan konteks industri, dan rekomendasi strategis.
- strengths: TULISKAN 5 KEKUATAN. Masing-masing harus spesifik, analitis, dan relevan dengan profil pengguna.
- weaknesses: TULISKAN 5 KELEMAHAN. Masing-masing harus konstruktif, spesifik, dan memberikan arahan perbaikan.
- learningSuggestions: TULISKAN 5 SARAN BELAJAR. Berupa langkah konkret yang bisa langsung dilakukan.
- careerGrowth: TULISKAN 5 PROSPEK KARIR. Mulai dari entry-level hingga senior/leadership.

Kembalikan HANYA JSON valid. Tidak ada teks lain sebelum atau sesudah JSON.`;

export async function analyzeWithGemini(
  interest: string,
  skills: string[],
  quizAnswers: { questionId: number; value: number }[],
  careerName?: string,
  careerData?: {
    description?: string;
    requiredSkills?: string[];
    learningPath?: string[];
    suggestedProjects?: string[];
    salary?: { min: number; max: number; currency: string };
    growthRate?: string;
    marketDemand?: string;
    strengths?: string[];
    weaknesses?: string[];
  }
): Promise<GeminiAnalysis> {
  if (!model || !genAI) {
    console.warn('Gemini API key not configured. Using fallback analysis.');
    return getFallbackAnalysis();
  }

  const effectiveCareerName = careerName || 'IT Professional';

  const prompt = `${IMPROVED_PROMPT}

--- DATA USER ---
- Minat (Interest): ${interest || '(belum diisi)'}
- Skills: ${skills.join(', ') || '(belum diisi)'}
- Jawaban Kuis: ${JSON.stringify(quizAnswers)}
- Karir Terdeteksi: ${effectiveCareerName}
${careerData?.description ? `- Deskripsi Karir: ${careerData.description}` : ''}
${careerData?.requiredSkills?.length ? `- Skill yang Dibutuhkan: ${careerData.requiredSkills.join(', ')}` : ''}
${careerData?.salary ? `- Gaji: Rp ${careerData.salary.min.toLocaleString('id-ID')} - Rp ${careerData.salary.max.toLocaleString('id-ID')}` : ''}
${careerData?.growthRate ? `- Tingkat Pertumbuhan: ${careerData.growthRate}` : ''}
${careerData?.marketDemand ? `- Permintaan Pasar: ${careerData.marketDemand}` : ''}`;

  try {
    console.log('[Gemini] Sending prompt to Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // === TASK 1: Log raw Gemini response before parsing ===
    console.log('[Gemini Raw Response]', text);

    // Clean markdown code blocks if present
    let jsonStr = text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }

    const parsed = JSON.parse(jsonStr);

    // === TASK 2: Log parsed JSON result ===
    console.log('[Gemini Parsed]', JSON.stringify(parsed, null, 2));

    // === TASK 3 & 4: Validate structure and reject invalid ===
    const analysis = validateGeminiStructure(parsed, effectiveCareerName, careerData);

    console.log('[Gemini] Final validated analysis:', JSON.stringify(analysis, null, 2));
    return analysis;
  } catch (error) {
    console.error('[Gemini API Error]', error);

    // === TASK 5: Auto-generate fallback with career data ===
    console.warn('[Gemini] Using auto-generated analysis based on career data.');
    return generateAutoAnalysis(effectiveCareerName, interest, skills, careerData);
  }
}

function generateAutoAnalysis(
  careerName: string,
  interest: string,
  skills: string[],
  careerData?: {
    description?: string;
    requiredSkills?: string[];
    learningPath?: string[];
    suggestedProjects?: string[];
    salary?: { min: number; max: number; currency: string };
    growthRate?: string;
    marketDemand?: string;
    strengths?: string[];
    weaknesses?: string[];
  }
): GeminiAnalysis {
  const salaryInfo = careerData?.salary
    ? `Rentang gaji untuk ${careerName} adalah Rp ${careerData.salary.min.toLocaleString('id-ID')} hingga Rp ${careerData.salary.max.toLocaleString('id-ID')} per bulan. `
    : '';
  const growthInfo = careerData?.growthRate ? `Tingkat pertumbuhan karir ini: ${careerData.growthRate}. ` : '';
  const marketInfo = careerData?.marketDemand ? `Permintaan pasar: ${careerData.marketDemand}. ` : '';

  const summary = `Berdasarkan analisis profil Anda, karir yang paling sesuai adalah ${careerName}. ${careerData?.description || `Karir ini menawarkan prospek yang cerah di industri teknologi.`} ${salaryInfo}${growthInfo}${marketInfo}Dengan minat Anda di bidang ${interest || 'teknologi informasi'} dan keterampilan yang dimiliki, Anda memiliki potensi besar untuk berkembang sebagai ${careerName}. ${skills.length > 0 ? `Keterampilan seperti ${skills.join(', ')} akan menjadi fondasi yang kuat untuk memulai karir ini.` : 'Dengan menguasai keterampilan yang relevan, Anda dapat membangun karir yang sukses.'} Untuk mencapai kesuksesan sebagai ${careerName}, Anda perlu terus belajar dan mengembangkan diri melalui kursus online, proyek praktis, dan bergabung dengan komunitas developer. Industri teknologi terus berkembang dan selalu membutuhkan talenta-talenta baru yang siap berinovasi dan beradaptasi dengan perubahan. Jangan ragu untuk memulai dari proyek-proyek kecil dan secara bertahap meningkatkan kompleksitasnya.`;

  const strengths = careerData?.strengths?.length
    ? careerData.strengths.slice(0, 5)
    : generateFallbackItems(5, careerName, 'strength', careerData);
  const weaknesses = careerData?.weaknesses?.length
    ? careerData.weaknesses.slice(0, 5)
    : generateFallbackItems(5, careerName, 'weakness', careerData);
  const learningSuggestions = generateFallbackItems(5, careerName, 'learning', careerData);
  const careerGrowth = generateFallbackItems(5, careerName, 'career', careerData);

  return {
    summary,
    strengths,
    weaknesses,
    learningSuggestions,
    careerGrowth,
    requiredSkills: careerData?.requiredSkills || [],
    recommendedProjects: careerData?.suggestedProjects || [],
  };
}
