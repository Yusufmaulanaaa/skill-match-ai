import type { Recommendation, SalaryInfo } from '@/api/quiz';

interface SalaryCardProps {
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

export function SalaryCard({ recommendation }: SalaryCardProps) {
  const salaryFormatted = formatSalary(recommendation.salary);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-5 rounded-full bg-gray-300" />
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Salary Estimation</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-100">
          <div className="text-lg font-bold text-gray-900 mb-0.5">{salaryFormatted}</div>
          <div className="text-[11px] text-gray-400">Monthly Salary</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-100">
          <div className="text-lg font-bold text-gray-900 mb-0.5">{recommendation.matchPercentage}%</div>
          <div className="text-[11px] text-gray-400">Career Match</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-100">
          <div className="text-lg font-bold text-gray-900 mb-0.5">{recommendation.requiredSkills.length}</div>
          <div className="text-[11px] text-gray-400">Required Skills</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-100">
          <div className="text-lg font-bold text-gray-900 mb-0.5">{recommendation.learningPath.length}</div>
          <div className="text-[11px] text-gray-400">Roadmap Steps</div>
        </div>
      </div>
    </div>
  );
}