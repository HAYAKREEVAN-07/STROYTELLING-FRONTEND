import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ParameterGroup, Parameter } from '../../types/evaluation';
import { cn } from '../../utils/cn';

interface AccordionProps {
  groups: ParameterGroup[];
}

export function Accordion({ groups }: AccordionProps) {
  // Store the ID of the currently open group. Default to the first group.
  const [openGroupId, setOpenGroupId] = useState<string | null>(groups[0]?.id || null);

  const toggleGroup = (id: string) => {
    setOpenGroupId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {groups.map((group) => {
        const isOpen = openGroupId === group.id;
        
        return (
          <div 
            key={group.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all"
          >
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
            >
              <h3 className="text-base font-semibold text-gray-900">{group.title}</h3>
              <ChevronDown 
                className={cn(
                  "w-5 h-5 text-gray-400 transition-transform duration-200",
                  isOpen && "transform rotate-180"
                )} 
              />
            </button>
            
            <div 
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="px-4 pb-4 space-y-4">
                <div className="h-px w-full bg-gray-100 mb-4" />
                {group.parameters.map((param) => (
                  <ParameterRow key={param.id} parameter={param} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ParameterRow({ parameter }: { parameter: Parameter }) {
  const percentage = (parameter.score / parameter.maxScore) * 100;
  
  let labelColor = 'text-gray-500 bg-gray-100';
  let barColor = 'bg-gray-400';
  
  if (parameter.label === 'Excellent' || parameter.label === 'Good') {
    labelColor = 'text-green-700 bg-green-50';
    barColor = 'bg-green-500';
  } else if (parameter.label === 'Weak') {
    labelColor = 'text-red-700 bg-red-50';
    barColor = 'bg-red-500';
  } else {
    labelColor = 'text-amber-700 bg-amber-50';
    barColor = 'bg-amber-400';
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <div className="flex-1 flex justify-between sm:justify-start sm:w-1/3 items-center">
        <span className="text-sm font-medium text-gray-700">{parameter.name}</span>
        <span className="text-sm font-semibold text-gray-900 sm:hidden">{parameter.score}/{parameter.maxScore}</span>
      </div>
      
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full", barColor)} 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="hidden sm:block w-12 text-right">
          <span className="text-sm font-semibold text-gray-900">{parameter.score}/{parameter.maxScore}</span>
        </div>
        <div className="w-24 text-right">
          <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium inline-block w-full text-center", labelColor)}>
            {parameter.label}
          </span>
        </div>
      </div>
    </div>
  );
}
