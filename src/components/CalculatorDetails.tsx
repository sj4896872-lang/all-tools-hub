import { useState, useEffect } from 'react';
import { CalculatorDef } from '../types/calculator';
import { Share2, BookOpen, HelpCircle, ChevronRight, Check, RotateCcw, AlertCircle } from 'lucide-react';
import * as Icons from 'lucide-react';

interface CalculatorDetailsProps {
  calculator: CalculatorDef;
  onNavigate: (href: string) => void;
}

// Dynamic Icon rendering helper
function IconRenderer({ name, className, size = 18 }: { name: string; className?: string; size?: number }) {
  const LucideIcon = (Icons as any)[name];
  if (!LucideIcon) return <Icons.Sliders className={className} size={size} />;
  return <LucideIcon className={className} size={size} />;
}

// Validation helper
const getValidationError = (field: any, val: any) => {
  if (field.type === 'select' || field.type === 'boolean') return null;
  
  if (val === undefined || val === '') {
    return 'This field is required.';
  }
  
  if (field.type === 'number') {
    const num = Number(val);
    if (isNaN(num)) {
      return 'Please enter a valid number.';
    }
    if (field.min !== undefined && num < field.min) {
      return `Value must be at least ${field.min}.`;
    }
    if (field.max !== undefined && num > field.max) {
      return `Value must be at most ${field.max}.`;
    }
  }
  
  if (field.type === 'text') {
    if (field.name.toLowerCase().includes('date')) {
      const d = new Date(val);
      if (isNaN(d.getTime())) {
        return 'Please enter a valid date (YYYY-MM-DD).';
      }
    } else if (String(val).trim() === '') {
      return 'Please enter some text.';
    }
  }
  
  return null;
};

export default function CalculatorDetails({ calculator, onNavigate }: CalculatorDetailsProps) {
  // Initialize state based on the fields of the calculator
  const [inputs, setInputs] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    calculator.fields.forEach(field => {
      init[field.name] = field.defaultValue;
    });
    return init;
  });

  const [copied, setCopied] = useState(false);

  // Reset inputs when the active calculator changes
  useEffect(() => {
    const init: Record<string, any> = {};
    calculator.fields.forEach(field => {
      init[field.name] = field.defaultValue;
    });
    setInputs(init);
    setCopied(false);
  }, [calculator]);

  // Synchronize options and defaults for Universal Unit Converter dynamically
  useEffect(() => {
    if (calculator.id === 'unit-converter') {
      const mode = inputs.mode;
      if (mode === 'length') {
        setInputs(prev => ({
          ...prev,
          fromUnit: prev.fromUnit === 'km' || prev.fromUnit === 'mi' || prev.fromUnit === 'm' || prev.fromUnit === 'ft' ? prev.fromUnit : 'km',
          toUnit: prev.toUnit === 'km' || prev.toUnit === 'mi' || prev.toUnit === 'm' || prev.toUnit === 'ft' ? prev.toUnit : 'mi'
        }));
      } else if (mode === 'weight') {
        setInputs(prev => ({
          ...prev,
          fromUnit: prev.fromUnit === 'kg' || prev.fromUnit === 'lbs' || prev.fromUnit === 'g' || prev.fromUnit === 'oz' ? prev.fromUnit : 'kg',
          toUnit: prev.toUnit === 'kg' || prev.toUnit === 'lbs' || prev.toUnit === 'g' || prev.toUnit === 'oz' ? prev.toUnit : 'lbs'
        }));
      } else if (mode === 'temperature') {
        setInputs(prev => ({
          ...prev,
          fromUnit: prev.fromUnit === 'C' || prev.fromUnit === 'F' || prev.fromUnit === 'K' ? prev.fromUnit : 'C',
          toUnit: prev.toUnit === 'C' || prev.toUnit === 'F' || prev.toUnit === 'K' ? prev.toUnit : 'F'
        }));
      }
    }
  }, [inputs.mode, calculator.id]);

  const handleFieldChange = (name: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    const init: Record<string, any> = {};
    calculator.fields.forEach(field => {
      init[field.name] = field.defaultValue;
    });
    setInputs(init);
  };

  // Perform validations
  const errors: Record<string, string | null> = {};
  calculator.fields.forEach(field => {
    errors[field.name] = getValidationError(field, inputs[field.name]);
  });

  const hasErrors = Object.values(errors).some(err => err !== null);

  // Perform calculation safely
  let results: any[] = [];
  let steps: string[] = [];
  let chartData: any[] | undefined = undefined;
  let calcError: string | null = null;

  try {
    if (!hasErrors) {
      const output = calculator.calculate(inputs);
      results = output.results || [];
      steps = output.steps || [];
      chartData = output.chartData;
    }
  } catch (err: any) {
    calcError = err?.message || 'An error occurred during calculation.';
    console.error(err);
  }

  const handleCopyResults = () => {
    if (results.length === 0) return;
    const text = `--- ${calculator.name} Results ---
${results.map(r => `${r.label}: ${r.value} ${r.unit || ''}`).join('\n')}
Calculated via All Tools Hub`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in" id={`calculator-${calculator.id}-details`}>
      {/* Title Header */}
      <div className="bg-white dark:bg-gray-850 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <IconRenderer name={calculator.icon} size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {calculator.name}
            </h1>
            <p className="text-sm text-gray-550 dark:text-gray-400 mt-1">
              {calculator.description}
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyResults}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-xl cursor-pointer transition-colors"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
          {copied ? 'Copied Shareable link!' : 'Share Results'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUTS COLUMN */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-850 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Calculator Parameters
              </h3>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-650 dark:text-gray-300 border border-gray-200 dark:border-gray-800 rounded-lg cursor-pointer transition-colors"
                title="Reset parameters to original defaults"
              >
                <RotateCcw size={12} />
                Reset
              </button>
            </div>
            <div className="space-y-4">
              {calculator.fields.map(field => {
                const val = inputs[field.name];
                const error = errors[field.name];

                return (
                  <div key={field.name} className="flex flex-col gap-1.5 animate-fade-in">
                    <label className="text-xs font-bold text-gray-650 dark:text-gray-400 tracking-wide uppercase flex items-center justify-between">
                      <span>{field.label}</span>
                      {error && (
                        <span className="text-[10px] font-semibold text-rose-500 normal-case flex items-center gap-1">
                          <AlertCircle size={10} />
                          {error}
                        </span>
                      )}
                    </label>

                    {field.type === 'select' ? (
                      <select
                        value={val}
                        onChange={e => handleFieldChange(field.name, e.target.value)}
                        className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border ${
                          error ? 'border-rose-400 dark:border-rose-900/60' : 'border-gray-250 dark:border-gray-800'
                        } rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      >
                        {(() => {
                          let options = field.options || [];
                          if (calculator.id === 'unit-converter') {
                            if (field.name === 'fromUnit' || field.name === 'toUnit') {
                              const mode = inputs.mode;
                              if (mode === 'length') {
                                options = [
                                  { label: 'Kilometers (km)', value: 'km' },
                                  { label: 'Miles (mi)', value: 'mi' },
                                  { label: 'Meters (m)', value: 'm' },
                                  { label: 'Feet (ft)', value: 'ft' }
                                ];
                              } else if (mode === 'weight') {
                                options = [
                                  { label: 'Kilograms (kg)', value: 'kg' },
                                  { label: 'Pounds (lbs)', value: 'lbs' },
                                  { label: 'Grams (g)', value: 'g' },
                                  { label: 'Ounces (oz)', value: 'oz' }
                                ];
                              } else if (mode === 'temperature') {
                                options = [
                                  { label: 'Celsius (°C)', value: 'C' },
                                  { label: 'Fahrenheit (°F)', value: 'F' },
                                  { label: 'Kelvin (K)', value: 'K' }
                                ];
                              }
                            }
                          }
                          return options.map(opt => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ));
                        })()}
                      </select>
                    ) : field.type === 'boolean' ? (
                      <label className="inline-flex items-center gap-3 cursor-pointer mt-1">
                        <input
                          type="checkbox"
                          checked={!!val}
                          onChange={e => handleFieldChange(field.name, e.target.checked)}
                          className="w-4.5 h-4.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Yes, enable this option
                        </span>
                      </label>
                    ) : field.type === 'text' ? (
                      <div className="relative flex items-center">
                        <input
                          type={field.name.toLowerCase().includes('date') ? 'date' : 'text'}
                          value={val === undefined ? '' : val}
                          placeholder={field.placeholder}
                          onChange={e => handleFieldChange(field.name, e.target.value)}
                          className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border ${
                            error ? 'border-rose-400 dark:border-rose-900/60' : 'border-gray-250 dark:border-gray-800'
                          } rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                      </div>
                    ) : (
                      <div className="relative flex items-center">
                        <input
                          type="number"
                          value={val === undefined ? '' : val}
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          placeholder={field.placeholder}
                          onChange={e => {
                            const raw = e.target.value;
                            if (raw === '') {
                              handleFieldChange(field.name, '');
                            } else {
                              const num = Number(raw);
                              handleFieldChange(field.name, isNaN(num) ? '' : num);
                            }
                          }}
                          className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border ${
                            error ? 'border-rose-400 dark:border-rose-900/60' : 'border-gray-250 dark:border-gray-800'
                          } rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                        {field.suffix && (
                          <span className="absolute right-3.5 text-xs font-semibold text-gray-400 bg-white dark:bg-gray-850 px-1 py-0.5 rounded">
                            {field.suffix}
                          </span>
                        )}
                      </div>
                    )}
                    {field.helpText && (
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 italic mt-0.5">
                        {field.helpText}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-[11px] text-gray-400 dark:text-gray-500 italic mt-6 flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900/45 p-2.5 rounded-lg border border-gray-150/40 dark:border-gray-800">
            <Icons.CheckCircle size={12} className="text-blue-500 shrink-0" />
            <span>Values recalculate automatically in real-time as you type.</span>
          </div>
        </div>

        {/* RESULTS & CALCULATIONS COLUMN */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Results Panel */}
          <div className="bg-white dark:bg-gray-850 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm min-h-[250px]">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center justify-between">
              <span>Calculation Results</span>
              <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider ${
                hasErrors || calcError ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/20' : 'text-green-600 bg-green-50 dark:bg-green-950/20'
              } px-2 py-0.5 rounded-full`}>
                {hasErrors ? 'Validation Pending' : calcError ? 'Calculation Error' : 'Live Active'}
              </span>
            </h3>

            {hasErrors ? (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                <AlertCircle className="text-rose-400" size={36} />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Invalid Input Parameters</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
                    Please correct the highlighted validation errors on the left panel to display live calculations.
                  </p>
                </div>
              </div>
            ) : calcError ? (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                <AlertCircle className="text-rose-400" size={36} />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Calculation Error</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
                    {calcError}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.map((res, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border flex flex-col justify-between ${
                        res.highlighted
                          ? 'bg-blue-50/50 dark:bg-blue-950/10 border-blue-100 dark:border-blue-900/40 sm:col-span-2'
                          : 'bg-gray-50/40 dark:bg-gray-900/20 border-gray-150/40 dark:border-gray-800/80'
                      }`}
                    >
                      <span className="text-xs font-semibold text-gray-550 dark:text-gray-400">{res.label}</span>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span
                          className={`font-extrabold tracking-tight text-gray-900 dark:text-white ${
                            res.highlighted ? 'text-2xl md:text-3xl text-blue-600 dark:text-blue-400' : 'text-xl'
                          }`}
                        >
                          {typeof res.value === 'number' ? res.value.toLocaleString() : res.value}
                        </span>
                        {res.unit && (
                          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                            {res.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pure SVG Amortization/Growth Visualizer Chart */}
                {chartData && chartData.length > 0 && (
                  <div className="mt-6 border border-gray-100 dark:border-gray-800 rounded-xl p-4 bg-gray-50/50 dark:bg-gray-900/30">
                    <span className="text-xs font-bold text-gray-550 dark:text-gray-400 block mb-3 uppercase tracking-wider">
                      Growth Projection Chart
                    </span>
                    <div className="h-44 w-full relative">
                      {/* Styled Pure SVG Line/Bar chart */}
                      <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        
                        {/* Gridlines */}
                        <line x1="0" y1="20" x2="500" y2="20" stroke="#888" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.2" />
                        <line x1="0" y1="70" x2="500" y2="70" stroke="#888" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.2" />
                        <line x1="0" y1="120" x2="500" y2="120" stroke="#888" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.2" />

                        {/* Plotting points */}
                        {(() => {
                          const maxVal = Math.max(...chartData.map(d => Number(d.Balance || d.value || 1)));
                          const points = chartData.map((d, i) => {
                            const x = (i / (chartData.length - 1)) * 500;
                            const val = Number(d.Balance || d.value || 0);
                            const y = 140 - (val / maxVal) * 120;
                            return { x, y };
                          });

                          const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                          const areaD = `${pathD} L 500 140 L 0 140 Z`;

                          return (
                            <>
                              {/* Filled Area */}
                              <path d={areaD} fill="url(#chartGradient)" />
                              {/* Main Line */}
                              <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                              
                              {/* Dots */}
                              {points.filter((_, i) => i === 0 || i === chartData.length - 1 || i === Math.floor(chartData.length / 2)).map((p, idx) => (
                                <circle key={idx} cx={p.x} cy={p.y} r="5" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                              ))}
                            </>
                          );
                        })()}
                      </svg>
                      {/* X-axis legends */}
                      <div className="flex justify-between text-[9px] font-mono text-gray-400 mt-2 px-1">
                        <span>{chartData[0]?.year || chartData[0]?.name || 'Start'}</span>
                        <span>{chartData[Math.floor(chartData.length / 2)]?.year || chartData[Math.floor(chartData.length / 2)]?.name || 'Mid'}</span>
                        <span>{chartData[chartData.length - 1]?.year || chartData[chartData.length - 1]?.name || 'End'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mathematical Step-by-Step Amortization Steps */}
          <div className="bg-white dark:bg-gray-850 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center gap-2">
              <BookOpen className="text-blue-500" size={18} />
              Step-by-Step Calculation
            </h3>
            <div className="space-y-3 font-mono text-xs text-gray-650 dark:text-gray-300 leading-relaxed bg-gray-50/70 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-150/50 dark:border-gray-800/60 overflow-x-auto">
              {steps.map((step, idx) => (
                <div key={idx} className="whitespace-pre-wrap">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED FORMULA & THEORY SECTION */}
      <div className="bg-white dark:bg-gray-850 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
          <BookOpen size={20} className="text-blue-500" />
          Formula & Explanation
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {calculator.detailedExplanation}
        </p>
        <div className="bg-blue-50/40 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 my-4 font-mono text-xs text-blue-800 dark:text-blue-400 flex flex-col gap-2">
          <span className="font-bold tracking-wider text-[10px] uppercase text-blue-650 dark:text-blue-500">Mathematical Formula:</span>
          <span className="text-sm">{calculator.formula}</span>
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-750 dark:text-gray-400 tracking-wide uppercase mb-2">Practical Numerical Examples:</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-350">
            {calculator.examples.map((ex, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-gray-50/50 dark:bg-gray-900/30 p-2.5 rounded-lg border border-gray-100 dark:border-gray-800">
                <ChevronRight size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Given Parameters:</strong> {ex.input} <br />
                  <strong>Result Output:</strong> {ex.output}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ACCORDION FAQ SECTION */}
      <div className="bg-white dark:bg-gray-850 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
          <HelpCircle size={20} className="text-blue-500" />
          Frequently Asked Questions (FAQ)
        </h3>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {calculator.faqs.map((faq, idx) => (
            <div key={idx} className="py-4 first:pt-0 last:pb-0">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-start gap-2">
                <span className="text-blue-500 font-mono">Q:</span>
                <span>{faq.question}</span>
              </h4>
              <p className="text-xs text-gray-550 dark:text-gray-400 mt-2 pl-6 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
