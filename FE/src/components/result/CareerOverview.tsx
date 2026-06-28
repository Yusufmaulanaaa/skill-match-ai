import type { Recommendation, SalaryInfo } from '@/api/quiz';

interface CareerOverviewProps {
  recommendation: Recommendation;
}

function formatSalary(salary: SalaryInfo): string {
  const formatter = new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: salary.currency || 'IDR', 
    minimumFractionDigits: 0 
  });
  return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`;
}

export function CareerOverview({ recommendation }: CareerOverviewProps) {
  const salaryFormatted = formatSalary(recommendation.salary);
  
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 mb-8 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-28 h-28 shrink-0">
          <svg className="w-full h-full text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
            Primary Recommendation
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            {recommendation.careerName}
          </h2>
          <p className="text-sm text-gray-300 mb-4">{recommendation.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-gray-400 mb-0.5">Salary Range</div>
              <div className="text-sm font-semibold">{salaryFormatted} /bln</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-0.5">Match</div>
              <div className="text-sm font-semibold">{recommendation.matchPercentage}%</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-0.5">Required Skills</div>
              <div className="text-sm font-semibold">{recommendation.requiredSkills.length}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-0.5">Roadmap Steps</div>
              <div className="text-sm font-semibold">{recommendation.learningPath.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}