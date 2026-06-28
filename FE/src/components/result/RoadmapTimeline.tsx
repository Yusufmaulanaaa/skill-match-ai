import type { Recommendation } from '@/api/quiz';

interface RoadmapTimelineProps {
  recommendation: Recommendation;
}

export function RoadmapTimeline({ recommendation }: RoadmapTimelineProps) {
  const { learningPath } = recommendation;

  if (!learningPath || learningPath.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-5 rounded-full bg-gray-300" />
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Learning Roadmap untuk {recommendation.careerName}
        </span>
      </div>
      <div className="space-y-4">
        {learningPath.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 relative"
          >
            <div className="flex flex-col items-center shrink-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                {index + 1}
              </div>
              {index < learningPath.length - 1 && (
                <div className="w-0.5 h-full bg-purple-100 mt-1" />
              )}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-sm text-gray-700 leading-snug">{step}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}