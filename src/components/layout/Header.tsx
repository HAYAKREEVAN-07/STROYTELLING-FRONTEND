import { ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  onBack?: () => void;
  backTo?: string;
  backLabel?: string;
  timestamp?: string;
}

export function Header({ title = 'Story Evaluation', onBack, backTo, backLabel, timestamp }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    
    const state = location.state as { from?: string } | null;
    if (state?.from) {
      navigate(state.from);
      return;
    }

    if (backTo) {
      navigate(backTo);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <button 
          onClick={handleBack}
          className="flex items-center gap-1 p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline-block">{backLabel || "Back"}</span>
        </button>
        <h1 className="text-lg font-bold text-gray-900">{title}</h1>
      </div>
      {timestamp && (
        <span className="text-xs font-medium text-gray-500 hidden sm:inline-block">
          {new Date(timestamp).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      )}
    </header>
  );
}
