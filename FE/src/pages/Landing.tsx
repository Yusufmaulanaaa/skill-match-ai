import { Navbar, Button } from '@/components';
import { Link } from 'react-router-dom';

const CAREERS = [
  { title: 'AI Engineer', description: 'Build intelligent systems and ML models.', color: 'bg-blue-50 text-blue-700 border-blue-100' },
  { title: 'Machine Learning Engineer', description: 'Design and deploy ML pipelines.', color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
  { title: 'Frontend Engineer', description: 'Create beautiful, responsive user interfaces.', color: 'bg-sky-50 text-sky-700 border-sky-100' },
  { title: 'Backend Engineer', description: 'Build scalable APIs and server systems.', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { title: 'Data Scientist', description: 'Extract insights from complex datasets.', color: 'bg-violet-50 text-violet-700 border-violet-100' },
  { title: 'Cyber Security Engineer', description: 'Protect systems and data from threats.', color: 'bg-rose-50 text-rose-700 border-rose-100' },
  { title: 'Cloud Engineer', description: 'Design and manage cloud infrastructure.', color: 'bg-amber-50 text-amber-700 border-amber-100' },
];

const METRICS = [
  { value: '10+', label: 'Career Paths' },
  { value: '15', label: 'Assessment Questions' },
  { value: 'AI', label: 'Powered Analysis' },
  { value: '100%', label: 'Personalized Results' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden border-b border-gray-100">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50/50 to-transparent" />

          <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-36 md:pb-36">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-500 border border-gray-200 mb-8 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                AI-Powered Career Discovery
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-8">
                Discover The Career Path
                <br />
                <span className="text-gray-400">That Actually Fits You</span>
              </h1>

              <p className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto mb-10">
                AI-powered career assessment that analyzes your interests, strengths, and potential to reveal the technology career where you can thrive.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/login">
                  <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-gray-900/10">
                    Start Assessment
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="secondary">
                    Explore Careers
                  </Button>
                </Link>
              </div>

              {/* Metrics */}
              <div className="flex items-center justify-center gap-10 mt-16 pt-10 border-t border-gray-100">
                {METRICS.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{m.value}</div>
                    <div className="text-sm text-gray-400">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== CAREER PATHS ===== */}
        <section className="max-w-6xl mx-auto px-6 py-24 md:py-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
              Explore Careers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Career Paths
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Discover technology careers that match your unique skills and interests.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CAREERS.map((career) => (
              <div
                key={career.title}
                className="group p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 cursor-default"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${career.color}`}>
                    {career.title}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{career.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="bg-gray-50/80 border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                Your Journey to the Right Career
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Three simple steps to discover where you belong in tech.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: '01', title: 'Complete Assessment', desc: 'Answer 15 scenario-based questions about your preferences and interests.' },
                { step: '02', title: 'AI Analyzes Your Profile', desc: 'Our AI evaluates your responses against 10 different career dimensions.' },
                { step: '03', title: 'Discover Your Best Match', desc: 'Get your top career matches with detailed insights and a learning roadmap.' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white text-sm font-bold mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="max-w-6xl mx-auto px-6 py-24 md:py-28">
          <div className="bg-gray-900 rounded-3xl p-12 md:p-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Ready to Find Your Perfect Career?
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-8 leading-relaxed">
              Take the first step toward a technology career that truly fits who you are.
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold shadow-lg">
                Start Your Assessment
              </Button>
            </Link>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
            <span className="text-sm text-gray-300 font-semibold tracking-tight">SkillMatch</span>
            <span className="text-xs text-gray-300">AI-Powered Career Discovery</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
