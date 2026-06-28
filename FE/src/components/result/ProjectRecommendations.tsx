import type { Recommendation } from '@/api/quiz';

interface ProjectRecommendationsProps {
  recommendation: Recommendation;
}

export function ProjectRecommendations({ recommendation }: ProjectRecommendationsProps) {
  const { suggestedProjects } = recommendation;

  if (!suggestedProjects || suggestedProjects.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-5 rounded-full bg-gray-300" />
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Project Recommendations untuk {recommendation.careerName}
        </span>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {suggestedProjects.map((project, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
            <span className="text-sm text-gray-700">{project}</span>
          </div>
        ))}
      </div>
    </div>
  );
}