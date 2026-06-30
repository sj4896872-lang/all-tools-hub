export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalcField {
  name: string;
  label: string;
  type: 'number' | 'select' | 'boolean' | 'text';
  defaultValue: any;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: any }[];
  placeholder?: string;
  suffix?: string;
  helpText?: string;
}

export interface CalcResult {
  label: string;
  value: string | number;
  unit?: string;
  highlighted?: boolean;
}

export interface CalculatorDef {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  detailedExplanation: string;
  formula: string;
  examples: { input: string; output: string }[];
  faqs: FAQItem[];
  fields: CalcField[];
  calculate: (inputs: Record<string, any>) => {
    results: CalcResult[];
    steps: string[];
    chartData?: any[];
  };
}

export interface CategoryDef {
  id: string;
  name: string;
  icon: string;
  description: string;
}
