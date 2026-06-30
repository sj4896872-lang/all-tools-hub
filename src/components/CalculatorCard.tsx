import { CalculatorDef } from '../types/calculator';
import { ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';

interface CalculatorCardProps {
  calculator: CalculatorDef;
  onSelect: (id: string) => void;
  key?: any;
}

function IconRenderer({ name, className, size = 18 }: { name: string; className?: string; size?: number }) {
  const LucideIcon = (Icons as any)[name];
  if (!LucideIcon) return <Icons.Sliders className={className} size={size} />;
  return <LucideIcon className={className} size={size} />;
}

export default function CalculatorCard({ calculator, onSelect }: CalculatorCardProps) {
  return (
    <button
      onClick={() => onSelect(calculator.id)}
      className="group text-left bg-white dark:bg-gray-850 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 p-5 rounded-2xl border border-gray-150/60 dark:border-gray-800/70 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/55 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer relative overflow-hidden"
      id={`calc-card-${calculator.id}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
            <IconRenderer name={calculator.icon} size={20} />
          </div>
          <span className="text-[9px] font-mono font-bold tracking-wider uppercase bg-gray-100 dark:bg-gray-800 text-gray-450 px-2 py-0.5 rounded-full">
            {calculator.category}
          </span>
        </div>

        <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {calculator.name}
        </h3>
        <p className="text-xs text-gray-550 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
          {calculator.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-50 dark:border-gray-800/40 flex items-center justify-between text-[11px] font-semibold text-blue-600 dark:text-blue-400">
        <span>Use Calculator</span>
        <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
}
