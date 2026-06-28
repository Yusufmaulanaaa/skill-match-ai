import type { Recommendation } from '@/api/quiz';

interface TopMatchesProps {
  recommendations: Recommendation[];
}

export function TopMatches({ recommendations }: TopMatchesProps) {
  const topCareers = recommendations.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-5 rounded-full bg-gray-300" />
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Top Career Matches
        </span>
      </div>
      <div className="space-y-4">
        {topCareers.map((career, index) => {
          const isPrimary = index === 0;
          return (
            <div
              key={career.careerName}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                isPrimary ? 'bg-blue-50 border border-blue-100' : 'hover:bg-gray-50'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-gray-100 text-[10px] font-bold text-gray-400 flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0 text-left">
                <div className={`text-sm font-medium truncate ${isPrimary ? 'text-gray-900' : 'text-gray-600'}`}>
                  {career.careerName}
                  {isPrimary && (
                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700">
                      Primary
                    </span>
                  )}
                </div>
                <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isPrimary ? 'bg-blue-600' : 'bg-blue-400'
                    }`}
                    style={{ width: `${career.matchPercentage}%` }}
                  />
                </div>
              </div>
              <span className={`text-sm font-bold tabular-nums w-12 text-right ${isPrimary ? 'text-gray-900' : 'text-gray-400'}`}>
                {career.matchPercentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}