import { cn } from '../../utils/cn';

interface ScoreCardProps {
  score: number;
  maxScore: number;
  label: string;
  summary: string;
}

export function ScoreCard({ score, maxScore, label, summary }: ScoreCardProps) {
  const percentage = Math.round((score / maxScore) * 100);
  
  // Determine color based on score percentage
  let colorClass = 'text-green-600';
  let bgClass = 'bg-green-500';
  let ringClass = 'stroke-green-500';
  
  if (percentage < 60) {
    colorClass = 'text-red-500';
    bgClass = 'bg-red-500';
    ringClass = 'stroke-red-500';
  } else if (percentage < 80) {
    colorClass = 'text-amber-500';
    bgClass = 'bg-amber-500';
    ringClass = 'stroke-amber-500';
  }

  const strokeDasharray = `${percentage} 100`;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center gap-8 h-full">
      
      {/* Circular Progress */}
      <div className="relative shrink-0 flex items-center justify-center w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-gray-100 stroke-current"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={cn('transition-all duration-1000 ease-out', ringClass)}
            strokeDasharray={strokeDasharray}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-bold text-gray-900">{score}</span>
          <span className="text-sm font-medium text-gray-400">/ {maxScore}</span>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col text-center space-y-4">
        <div className="inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide bg-opacity-10" style={{ color: 'var(--tw-prose-body)' }}>
          <span className={cn('px-4 py-1.5 rounded-full bg-opacity-10', colorClass, bgClass.replace('bg-', 'bg-').concat('/10'))}>
            {label}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
          Performance Summary
        </h2>
        <p className="text-gray-600 text-base max-w-xl mx-auto leading-relaxed">
          {summary}
        </p>
      </div>

    </div>
  );
}
