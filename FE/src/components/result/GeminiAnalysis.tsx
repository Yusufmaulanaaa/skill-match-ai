import type { Recommendation, GeminiAnalysis } from '@/api/quiz';

interface GeminiAnalysisProps {
  recommendation: Recommendation;
}

export function GeminiAnalysis({ recommendation }: GeminiAnalysisProps) {
  const analysis: GeminiAnalysis | null = recommendation.geminiAnalysis;

  if (!analysis) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">AI Analysis</span>
      </div>
      
      {analysis.summary && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Summary</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{analysis.summary}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Strengths</h3>
          <ul className="space-y-2">
            {(analysis.strengths || []).slice(0, 6).map((strength, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {strength}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Areas to Improve</h3>
          <ul className="space-y-2">
            {(analysis.weaknesses || []).slice(0, 6).map((weakness, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {(analysis.learningSuggestions || analysis.careerGrowth || analysis.requiredSkills || analysis.recommendedProjects) && (
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {(analysis.learningSuggestions || []).length > 0 && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Learning Suggestions</h4>
              <ul className="space-y-1">
                {(analysis.learningSuggestions || []).map((item, i) => (
                  <li key={i} className="text-xs text-blue-700">• {item}</li>
                ))}
              </ul>
            </div>
          )}
          {(analysis.careerGrowth || []).length > 0 && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <h4 className="text-sm font-semibold text-emerald-900 mb-2">Career Growth</h4>
              <ul className="space-y-1">
                {(analysis.careerGrowth || []).map((item, i) => (
                  <li key={i} className="text-xs text-emerald-700">• {item}</li>
                ))}
              </ul>
            </div>
          )}
          {(analysis.requiredSkills || []).length > 0 && (
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
              <h4 className="text-sm font-semibold text-purple-900 mb-2">Required Skills</h4>
              <ul className="space-y-1">
                {(analysis.requiredSkills || []).map((item, i) => (
                  <li key={i} className="text-xs text-purple-700">• {item}</li>
                ))}
              </ul>
            </div>
          )}
          {(analysis.recommendedProjects || []).length > 0 && (
            <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
              <h4 className="text-sm font-semibold text-orange-900 mb-2">Recommended Projects</h4>
              <ul className="space-y-1">
                {(analysis.recommendedProjects || []).map((item, i) => (
                  <li key={i} className="text-xs text-orange-700">• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}