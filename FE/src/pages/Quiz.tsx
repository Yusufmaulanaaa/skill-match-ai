import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components';
import { useToast } from '@/contexts/ToastContext';
import { submitQuiz } from '@/api/quiz';

interface QuestionData {
  id: number;
  question: string;
  options: string[];
}

const QUESTIONS: QuestionData[] = [
  {
    id: 1,
    question:
      'Jika diberi sebuah aplikasi startup yang mengalami masalah performa, bagian mana yang paling ingin Anda tangani?',
    options: [
      'Mendesain ulang tampilan dan pengalaman pengguna',
      'Mengoptimalkan API dan database',
      'Menganalisis data penggunaan pengguna',
      'Membuat model AI untuk prediksi perilaku pengguna',
      'Mengamankan sistem dari serangan',
    ],
  },
  {
    id: 2,
    question:
      'Dalam sebuah tim pengembang produk digital, peran apa yang paling cocok untuk Anda?',
    options: [
      'UI/UX Designer — memastikan tampilan dan interaksi sempurna',
      'Backend Developer — membangun logika server dan API',
      'Data Analyst — mengolah data untuk insight produk',
      'AI Engineer — mengintegrasikan kecerdasan buatan',
      'Security Engineer — menjaga keamanan data dan sistem',
    ],
  },
  {
    id: 3,
    question:
      'Saat menghadapi bug yang sulit ditemukan, pendekatan mana yang paling Anda sukai?',
    options: [
      'Memeriksa setiap elemen visual dan CSS',
      'Melacak alur data dari request hingga response',
      'Membuat visualisasi data untuk menemukan anomali',
      'Mengevaluasi output model dan parameter',
      'Menganalisis log keamanan dan akses',
    ],
  },
  {
    id: 4,
    question:
      'Proyek open-source mana yang paling menarik bagi Anda?',
    options: [
      'Framework CSS seperti Tailwind atau library UI',
      'Tools backend seperti Express.js atau FastAPI',
      'Library data visualisasi seperti D3.js',
      'Framework machine learning seperti TensorFlow',
      'Tools keamanan seperti OWASP ZAP',
    ],
  },
  {
    id: 5,
    question:
      'Jika harus membuat produk dalam 24 jam, apa yang akan Anda bangun?',
    options: [
      'Landing page interaktif dengan animasi',
      'REST API dengan dokumentasi otomatis',
      'Dashboard real-time untuk data sensor',
      'Chatbot berbasis large language model',
      'Tool scanning kerentanan keamanan',
    ],
  },
  {
    id: 6,
    question:
      'Teknologi apa yang paling membuat Anda penasaran untuk dipelajari?',
    options: [
      'React Server Components dan animasi web',
      'Arsitektur microservices dan message queue',
      'Apache Spark dan pemrosesan big data',
      'Generative AI dan diffusion models',
      'Cloud security dan zero trust architecture',
    ],
  },
  {
    id: 7,
    question:
      'Dalam sebuah diskusi teknis, topik apa yang paling menarik perhatian Anda?',
    options: [
      'Tren terbaru dalam desain UI/UX',
      'Pola arsitektur dan skalabilitas sistem',
      'Metode analisis data dan statistik',
      'Inovasi dalam model AI dan deep learning',
      'Ancaman keamanan siber terkini',
    ],
  },
  {
    id: 8,
    question:
      'Anda diberi kebebasan membuat satu fitur baru. Apa yang Anda pilih?',
    options: [
      'Sistem tema kustom dan mode gelap',
      'API gateway dengan rate limiting',
      'Fitur rekomendasi berbasis data pengguna',
      'Sistem deteksi anomali menggunakan Machine Learning',
      'Enkripsi end-to-end untuk semua data',
    ],
  },
  {
    id: 9,
    question:
      'Skill apa yang paling ingin Anda kuasai dalam 6 bulan ke depan?',
    options: [
      'Advanced CSS, Framer Motion, dan design system',
      'Kubernetes, Docker, dan cloud infrastructure',
      'Statistical modeling dan data pipeline',
      'Neural networks dan computer vision',
      'Ethical hacking dan penetration testing',
    ],
  },
  {
    id: 10,
    question:
      'Jika bisa bekerja di perusahaan teknologi besar, tim mana yang Anda pilih?',
    options: [
      'Tim Desain — membuat produk yang indah dan mudah digunakan',
      'Tim Infrastruktur — memastikan layanan selalu tersedia',
      'Tim Data — mengolah data untuk keputusan bisnis',
      'Tim AI Research — mengembangkan teknologi masa depan',
      'Tim Security — melindungi pengguna dan data',
    ],
  },
  {
    id: 11,
    question:
      'Dalam proses pengembangan produk, tahap apa yang paling Anda nikmati?',
    options: [
      'Mendesain wireframe dan prototipe interaktif',
      'Merancang database dan struktur API',
      'Mengeksplorasi data untuk menemukan pola',
      'Melatih model dan mengevaluasi performa',
      'Melakukan security audit dan penetration test',
    ],
  },
  {
    id: 12,
    question:
      'Bacaan teknis apa yang paling menarik bagi Anda?',
    options: [
      'Artikel tentang desain sistem dan styling CSS',
      'Dokumentasi framework backend dan database',
      'Paper tentang algoritma machine learning',
      'Blog tentang arsitektur AI dan model terbaru',
      'Laporan tentang kerentanan keamanan terbaru',
    ],
  },
  {
    id: 13,
    question:
      'Jika harus memilih satu bahasa pemrograman untuk dikuasai, mana yang Anda pilih?',
    options: [
      'TypeScript / JavaScript — untuk frontend dan fullstack',
      'Go / Rust — untuk sistem backend berperforma tinggi',
      'Python — untuk data analysis dan eksperimen',
      'Python — untuk machine learning dan AI',
      'Python / Bash — untuk automation dan security tools',
    ],
  },
  {
    id: 14,
    question:
      'Saat menggunakan aplikasi, hal apa yang paling Anda perhatikan?',
    options: [
      'Pengalaman pengguna, animasi, dan konsistensi visual',
      'Kecepatan loading dan responsivitas sistem',
      'Bagaimana data ditampilkan dan diolah',
      'Fitur personalisasi dan rekomendasi cerdas',
      'Sistem autentikasi dan keamanan data',
    ],
  },
  {
    id: 15,
    question:
      'Impian karir Anda dalam 5 tahun ke depan adalah menjadi...',
    options: [
      'Lead Designer yang menciptakan design system perusahaan',
      'Software Architect yang merancang sistem skalabel',
      'Data Science Manager yang memimpin tim analitik',
      'AI Research Scientist yang mendorong inovasi',
      'Security Architect yang membangun sistem pertahanan',
    ],
  },
];

const LABELS = ['A', 'B', 'C', 'D', 'E'];

export default function Quiz() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login', { replace: true });
  }, [navigate]);

  const currentQuestion = QUESTIONS[currentIndex];
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const goToQuestion = useCallback(
    (newIndex: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(newIndex);
        setIsTransitioning(false);
      }, 200);
    },
    [isTransitioning]
  );

  const handleAnswer = useCallback(
    (value: number) => {
      setAnswers((prev) => ({ ...prev, [QUESTIONS[currentIndex].id]: value }));
    },
    [currentIndex]
  );

  const handleNext = useCallback(async () => {
    if (currentIndex < QUESTIONS.length - 1) {
      goToQuestion(currentIndex + 1);
    } else {
      setIsSubmitting(true);
      try {
        localStorage.setItem('quizAnswers', JSON.stringify(answers));
        const payload = Object.entries(answers).map(([qId, value]) => ({
          questionId: Number(qId),
          value,
        }));
        await submitQuiz({ answers: payload });
      } catch (err: any) {
        showToast(
          err?.response?.data?.message ||
            'Jawaban tersimpan, tetapi gagal mengirim ke server'
        );
      } finally {
        setIsSubmitting(false);
        navigate('/result', { replace: true });
      }
    }
  }, [currentIndex, answers, navigate, goToQuestion, showToast]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) goToQuestion(currentIndex - 1);
  }, [currentIndex, goToQuestion]);

  const handleIndicatorClick = useCallback(
    (idx: number) => {
      if (idx === currentIndex) return;
      if (idx > currentIndex && !answers[QUESTIONS[currentIndex].id]) return;
      goToQuestion(idx);
    },
    [currentIndex, answers, goToQuestion]
  );

  // Keyboard
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && selectedAnswer !== undefined)
        handleNext();
      if (e.key === 'ArrowLeft' && currentIndex > 0) handlePrevious();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [selectedAnswer, currentIndex, handleNext, handlePrevious]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-16 pb-24 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <p className="text-gray-400">Loading questions...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16 pb-24">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              Career Assessment
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Temukan Karir yang Tepat untukmu
            </h1>
            <p className="text-sm text-gray-400 max-w-lg mx-auto">
              Pilih opsi yang paling sesuai dengan kepribadian dan preferensimu.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-400">
                Pertanyaan {currentIndex + 1} dari {QUESTIONS.length}
              </span>
              <span className="text-xs font-semibold text-blue-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question number pills */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-10">
            {QUESTIONS.map((_, idx) => {
              const isActive = idx === currentIndex;
              const isAnswered = answers[QUESTIONS[idx].id] !== undefined;
              const isPast = idx < currentIndex;
              const isLocked =
                idx > currentIndex &&
                answers[QUESTIONS[currentIndex].id] === undefined;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleIndicatorClick(idx)}
                  disabled={isLocked}
                  className={`relative flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gray-900 text-white scale-110'
                      : isPast || isAnswered
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-50 text-gray-300'
                  } ${
                    isLocked
                      ? 'opacity-30 cursor-not-allowed'
                      : 'cursor-pointer hover:bg-gray-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Question Card */}
          <div
            className={`transition-all duration-300 ease-out ${
              isTransitioning
                ? 'opacity-0 translate-y-3'
                : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono font-medium text-gray-300">
                  Q{String(currentIndex + 1).padStart(2, '0')}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 leading-relaxed mb-8">
                {currentQuestion.question}
              </h2>

              <div className="space-y-2.5">
                {currentQuestion.options.map((option, oi) => {
                  const val = oi + 1;
                  const isSelected = selectedAnswer === val;
                  return (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => handleAnswer(val)}
                      className={`group relative w-full flex items-start gap-4 px-5 py-3.5 rounded-xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-gray-900 bg-gray-50 shadow-sm'
                          : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 mt-0.5 transition-all ${
                          isSelected
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-50 text-gray-300 group-hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-xs font-bold">{LABELS[oi]}</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <span
                          className={`text-sm leading-relaxed transition-colors ${
                            isSelected
                              ? 'text-gray-900 font-medium'
                              : 'text-gray-600 group-hover:text-gray-900'
                          }`}
                        >
                          {option}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center shrink-0 mt-1">
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0 || isTransitioning}
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed px-3 py-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={
                selectedAnswer === undefined || isTransitioning || isSubmitting
              }
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors px-5 py-2.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {currentIndex === QUESTIONS.length - 1 ? (
                <>{isSubmitting ? 'Submitting...' : 'View Results'}</>
              ) : (
                <>Next</>
              )}
              {currentIndex < QUESTIONS.length - 1 && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}