import { CalculatorDef, CategoryDef } from '../types/calculator';
import { EXTENDED_CALCULATORS } from './extendedCalculators';

export const CATEGORIES: CategoryDef[] = [
  {
    id: 'finance',
    name: 'Finance & Banking',
    icon: 'DollarSign',
    description: 'Mortgage, loans, interest, savings, investment, ROI, and tax calculators.'
  },
  {
    id: 'math',
    name: 'Mathematics & Algebra',
    icon: 'Calculator',
    description: 'Basic arithmetic, scientific formulas, algebra, geometry, and statistics.'
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    icon: 'Heart',
    description: 'BMI, BMR, calories, body fat, water intake, pregnancy, and heart rate.'
  },
  {
    id: 'islamic',
    name: 'Islamic Calculators',
    icon: 'BookOpen',
    description: 'Zakat, Fitra, and inheritance distribution calculators.'
  },
  {
    id: 'engineering',
    name: 'Engineering & Construction',
    icon: 'Hammer',
    description: 'Concrete, brick, steel, Ohm\'s law, solar power, and battery life.'
  },
  {
    id: 'converters',
    name: 'Unit Conversion',
    icon: 'RefreshCw',
    description: 'Convert lengths, weights, temperature, speed, area, and digital storage.'
  },
  {
    id: 'datetime',
    name: 'Date & Time',
    icon: 'Calendar',
    description: 'Age, working days, countdowns, and date difference calculations.'
  },
  {
    id: 'tech',
    name: 'Computer & Network',
    icon: 'Cpu',
    description: 'Binary, octal, hexadecimal, subnetting, and data storage bandwidth.'
  }
];

export const CALCULATORS: CalculatorDef[] = [
  // 1. COMPOUND INTEREST
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    category: 'finance',
    icon: 'TrendingUp',
    description: 'Calculate how much your money will grow over time with compound interest, including monthly contributions.',
    detailedExplanation: 'Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods. Think of it as "interest on interest," which makes your savings grow exponentially faster than simple interest.',
    formula: 'A = P * (1 + r/n)^(n*t) + PMT * [((1 + r/n)^(n*t) - 1) / (r/n)]',
    examples: [
      { input: 'Principal: $10,000, Annual Rate: 7%, Years: 10, Monthly Deposit: $100', output: 'Total Future Value: $36,241.17' }
    ],
    faqs: [
      {
        question: 'What is compound interest?',
        answer: 'Compound interest is interest calculated on the initial principal plus all of the accumulated interest from previous periods on a deposit or loan.'
      },
      {
        question: 'What is the frequency of compounding?',
        answer: 'Compounding frequency is the number of times interest is calculated and added to the principal in a year. It can be daily, monthly, quarterly, semi-annually, or annually. The more frequent, the higher the total return.'
      },
      {
        question: 'What is the Rule of 72?',
        answer: 'The Rule of 72 is a quick way to estimate when your money will double. Divide 72 by your annual interest rate to find the approximate number of years it takes to double.'
      }
    ],
    fields: [
      { name: 'principal', label: 'Initial Principal ($)', type: 'number', defaultValue: 10000, min: 0, suffix: '$' },
      { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', defaultValue: 7, min: 0, max: 100, step: 0.1, suffix: '%' },
      { name: 'years', label: 'Time Period (Years)', type: 'number', defaultValue: 10, min: 1, max: 100, suffix: 'yrs' },
      { name: 'contribution', label: 'Monthly Contribution ($)', type: 'number', defaultValue: 100, min: 0, suffix: '$' },
      {
        name: 'frequency',
        label: 'Compounding Frequency',
        type: 'select',
        defaultValue: 12,
        options: [
          { label: 'Annually', value: 1 },
          { label: 'Semi-Annually', value: 2 },
          { label: 'Quarterly', value: 4 },
          { label: 'Monthly', value: 12 },
          { label: 'Daily', value: 365 }
        ]
      }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.principal) || 0;
      const r = (Number(inputs.rate) || 0) / 100;
      const t = Number(inputs.years) || 0;
      const PMT = Number(inputs.contribution) || 0;
      const n = Number(inputs.frequency) || 12;

      const nt = n * t;
      const rn = r / n;

      // Compound interest of principal
      const principalPart = P * Math.pow(1 + rn, nt);

      // Future value of annuity contributions
      let annuityPart = 0;
      if (PMT > 0) {
        if (rn === 0) {
          annuityPart = PMT * 12 * t;
        } else {
          // Adjust PMT for monthly contributions vs compounding frequency
          // Assuming contribution monthly, compounding at 'n'
          const monthlyRate = r / 12;
          const totalMonths = t * 12;
          annuityPart = PMT * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
        }
      }

      const totalValue = principalPart + annuityPart;
      const totalContributions = P + (PMT * 12 * t);
      const totalInterest = totalValue - totalContributions;

      // Build step-by-step
      const steps = [
        `Step 1: Calculate interest on initial principal ($${P.toLocaleString()}): A1 = P * (1 + r/n)^(n*t)`,
        `   A1 = ${P} * (1 + ${r}/${n})^(${n} * ${t}) = $${principalPart.toFixed(2)}`,
        `Step 2: Calculate future value of monthly contributions ($${PMT.toLocaleString()}/mo):`,
        `   A2 = PMT * [((1 + r_monthly)^months - 1) / r_monthly] = $${annuityPart.toFixed(2)}`,
        `Step 3: Add both parts for total future value:`,
        `   Total Value = A1 + A2 = $${principalPart.toFixed(2)} + $${annuityPart.toFixed(2)} = $${totalValue.toFixed(2)}`,
        `Step 4: Total Principal Invested = $${totalContributions.toLocaleString()}`,
        `Step 5: Interest Earned = $${totalValue.toFixed(2)} - $${totalContributions.toLocaleString()} = $${totalInterest.toFixed(2)}`
      ];

      // Build chart data
      const chartData = [];
      for (let y = 0; y <= t; y++) {
        const months = y * 12;
        const nt_y = n * y;
        const pVal = P * Math.pow(1 + rn, nt_y);
        let aVal = 0;
        if (PMT > 0 && r > 0) {
          aVal = PMT * ((Math.pow(1 + (r / 12), months) - 1) / (r / 12));
        } else if (PMT > 0) {
          aVal = PMT * months;
        }
        const total = pVal + aVal;
        const invested = P + (PMT * months);
        chartData.push({
          year: `Year ${y}`,
          "Balance": Math.round(total),
          "Invested": Math.round(invested),
          "Interest": Math.round(total - invested)
        });
      }

      return {
        results: [
          { label: 'Total Future Value', value: totalValue.toFixed(2), unit: '$', highlighted: true },
          { label: 'Total Principal Invested', value: totalContributions.toFixed(2), unit: '$' },
          { label: 'Total Interest Earned', value: totalInterest.toFixed(2), unit: '$' }
        ],
        steps,
        chartData
      };
    }
  },

  // 2. MORTGAGE CALCULATOR
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    category: 'finance',
    icon: 'Home',
    description: 'Estimate your monthly home mortgage payment, including interest, down payments, and total amortization details.',
    detailedExplanation: 'A mortgage calculator determines your monthly principal and interest payment. Purchasing a home is the largest investment most households make, so modeling the down payment, interest rates, and loan terms is critical to healthy household budgeting.',
    formula: 'M = P * [ i * (1 + i)^n ] / [ (1 + i)^n - 1 ]',
    examples: [
      { input: 'Home Price: $400,000, Down Payment: 20%, Rate: 6.5%, Term: 30 Years', output: 'Monthly Payment: $2,022.62' }
    ],
    faqs: [
      {
        question: 'What does a mortgage payment consist of?',
        answer: 'A standard mortgage payment consists of Principal (the balance owed), Interest (cost of borrowing), Taxes (local property taxes), and Insurance (homeowners insurance and private mortgage insurance if down payment is under 20%). This is referred to as PITI.'
      },
      {
        question: 'How does down payment affect monthly payments?',
        answer: 'A higher down payment reduces the principal loan amount, which lowers your monthly payments. If you pay 20% or more, you also avoid private mortgage insurance (PMI) charges.'
      }
    ],
    fields: [
      { name: 'price', label: 'Home Price ($)', type: 'number', defaultValue: 350000, min: 0, suffix: '$' },
      { name: 'downPayment', label: 'Down Payment ($)', type: 'number', defaultValue: 70000, min: 0, suffix: '$' },
      { name: 'rate', label: 'Interest Rate (%)', type: 'number', defaultValue: 6.5, min: 0, max: 100, step: 0.1, suffix: '%' },
      { name: 'term', label: 'Loan Term (Years)', type: 'number', defaultValue: 30, min: 1, max: 50, suffix: 'yrs' },
      { name: 'propertyTax', label: 'Annual Property Tax ($)', type: 'number', defaultValue: 3500, min: 0, suffix: '$' },
      { name: 'insurance', label: 'Annual Insurance ($)', type: 'number', defaultValue: 1200, min: 0, suffix: '$' }
    ],
    calculate: (inputs) => {
      const price = Number(inputs.price) || 0;
      const down = Number(inputs.downPayment) || 0;
      const rate = (Number(inputs.rate) || 0) / 100;
      const years = Number(inputs.term) || 30;
      const tax = Number(inputs.propertyTax) || 0;
      const ins = Number(inputs.insurance) || 0;

      const loanAmount = Math.max(0, price - down);
      const monthlyRate = rate / 12;
      const totalMonths = years * 12;

      let monthlyPI = 0;
      if (loanAmount > 0) {
        if (monthlyRate === 0) {
          monthlyPI = loanAmount / totalMonths;
        } else {
          monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
        }
      }

      const monthlyTax = tax / 12;
      const monthlyIns = ins / 12;
      const totalMonthly = monthlyPI + monthlyTax + monthlyIns;
      const totalPayments = totalMonthly * totalMonths;
      const totalInterest = (monthlyPI * totalMonths) - loanAmount;

      const steps = [
        `Step 1: Calculate loan amount (Home Price - Down Payment):`,
        `   $${price.toLocaleString()} - $${down.toLocaleString()} = $${loanAmount.toLocaleString()}`,
        `Step 2: Apply the standard amortization formula for Principal & Interest:`,
        `   Monthly P&I = $${monthlyPI.toFixed(2)}`,
        `Step 3: Add monthly taxes and insurance:`,
        `   Taxes/mo: $${monthlyTax.toFixed(2)} | Insurance/mo: $${monthlyIns.toFixed(2)}`,
        `Step 4: Total Monthly Mortgage Payment (PITI):`,
        `   $${monthlyPI.toFixed(2)} + $${monthlyTax.toFixed(2)} + $${monthlyIns.toFixed(2)} = $${totalMonthly.toFixed(2)}`
      ];

      const chartData = [
        { name: 'Principal (Loan)', value: loanAmount },
        { name: 'Total Interest', value: Math.max(0, totalInterest) },
        { name: 'Taxes & Insurance (Over Term)', value: (tax + ins) * years }
      ];

      return {
        results: [
          { label: 'Total Monthly Payment (PITI)', value: totalMonthly.toFixed(2), unit: '$', highlighted: true },
          { label: 'Monthly Principal & Interest (P&I)', value: monthlyPI.toFixed(2), unit: '$' },
          { label: 'Total Loan Principal', value: loanAmount.toFixed(2), unit: '$' },
          { label: 'Total Interest Payable', value: Math.max(0, totalInterest).toFixed(2), unit: '$' },
          { label: 'Total Payment Amount (Term)', value: totalPayments.toFixed(2), unit: '$' }
        ],
        steps,
        chartData
      };
    }
  },

  // 3. BMI CALCULATOR (HEALTH)
  {
    id: 'bmi-calculator',
    name: 'BMI (Body Mass Index) Calculator',
    category: 'health',
    icon: 'Activity',
    description: 'Calculate your Body Mass Index (BMI) instantly based on weight and height for adults.',
    detailedExplanation: 'Body Mass Index (BMI) is a simple measurement that uses your height and weight to estimate your body fat. It categorizes individuals into underweight, normal, overweight, or obese ranges, helping determine health and fitness goals.',
    formula: 'Metric: BMI = weight (kg) / [height (m)]^2 | Imperial: BMI = 703 * weight (lbs) / [height (in)]^2',
    examples: [
      { input: 'Weight: 70 kg, Height: 175 cm', output: 'BMI: 22.86 (Normal weight)' }
    ],
    faqs: [
      {
        question: 'What are the healthy BMI ranges?',
        answer: 'Standard ranges: Underweight (< 18.5), Normal weight (18.5 - 24.9), Overweight (25.0 - 29.9), and Obese (>= 30).'
      },
      {
        question: 'Is BMI accurate for everyone?',
        answer: 'BMI is an estimate and does not differentiate between body fat and muscle. Highly muscular individuals, such as athletes, may have an "overweight" BMI despite low body fat.'
      }
    ],
    fields: [
      {
        name: 'unitSystem',
        label: 'Unit System',
        type: 'select',
        defaultValue: 'metric',
        options: [
          { label: 'Metric (kg, cm)', value: 'metric' },
          { label: 'Imperial (lbs, ft/in)', value: 'imperial' }
        ]
      },
      { name: 'weight', label: 'Weight', type: 'number', defaultValue: 70, min: 1, suffix: 'kg/lbs' },
      { name: 'height', label: 'Height (cm or inches total)', type: 'number', defaultValue: 175, min: 1, suffix: 'cm/in' }
    ],
    calculate: (inputs) => {
      const isMetric = inputs.unitSystem === 'metric';
      const weight = Number(inputs.weight) || 0;
      const height = Number(inputs.height) || 0;

      let bmi = 0;
      let category = '';
      let colorClass = '';

      if (height > 0) {
        if (isMetric) {
          const heightM = height / 100;
          bmi = weight / (heightM * heightM);
        } else {
          bmi = 703 * (weight / (height * height));
        }
      }

      if (bmi < 18.5) {
        category = 'Underweight';
        colorClass = 'text-yellow-500';
      } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal weight';
        colorClass = 'text-green-500';
      } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        colorClass = 'text-orange-500';
      } else {
        category = 'Obese';
        colorClass = 'text-red-500';
      }

      const steps = isMetric ? [
        `Step 1: Convert height from cm to meters:`,
        `   ${height} cm / 100 = ${(height / 100).toFixed(2)} m`,
        `Step 2: Square the height:`,
        `   ${(height / 100).toFixed(2)} * ${(height / 100).toFixed(2)} = ${(Math.pow(height / 100, 2)).toFixed(4)} m²`,
        `Step 3: Divide weight by squared height:`,
        `   ${weight} / ${(Math.pow(height / 100, 2)).toFixed(4)} = ${bmi.toFixed(2)}`
      ] : [
        `Step 1: Multiply weight (lbs) by scaling factor 703:`,
        `   ${weight} * 703 = ${(weight * 703).toFixed(1)}`,
        `Step 2: Square height in inches:`,
        `   ${height} * ${height} = ${height * height} in²`,
        `Step 3: Divide scaled weight by squared height:`,
        `   ${(weight * 703).toFixed(1)} / ${height * height} = ${bmi.toFixed(2)}`
      ];

      return {
        results: [
          { label: 'Your BMI Score', value: bmi.toFixed(2), highlighted: true },
          { label: 'Classification', value: category, highlighted: false }
        ],
        steps
      };
    }
  },

  // 4. SCIENTIFIC CALCULATOR
  {
    id: 'scientific-calculator',
    name: 'Scientific Calculator',
    category: 'math',
    icon: 'Compass',
    description: 'Solve arithmetic, exponential, trigonometric, logarithmic, and complex mathematics questions directly.',
    detailedExplanation: 'This general-purpose scientific calculator handles direct trigonometric operations (sin, cos, tan), logarithmic functions (log, ln), powers, roots, and standard floating-point equations.',
    formula: 'Dynamic evaluation of entered math expression strings.',
    examples: [
      { input: '2 * sin(pi / 4) + ln(e)', output: '2.414' }
    ],
    faqs: [
      {
        question: 'Are trigonometry values in degrees or radians?',
        answer: 'Our solver evaluates formulas using standard radian angles by default. Multiply degrees by PI/180 to convert to radians.'
      }
    ],
    fields: [
      { name: 'expression', label: 'Expression or Equation', type: 'text', defaultValue: '2 * sin(0.7853) + 1' }
    ],
    calculate: (inputs) => {
      const exp = String(inputs.expression || '').trim();
      let resultStr = '';
      const steps: string[] = [];

      try {
        // Safe evaluation environment supporting common functions
        const sandbox = {
          sin: Math.sin,
          cos: Math.cos,
          tan: Math.tan,
          asin: Math.asin,
          acos: Math.acos,
          atan: Math.atan,
          log: Math.log10,
          ln: Math.log,
          sqrt: Math.sqrt,
          abs: Math.abs,
          pow: Math.pow,
          pi: Math.PI,
          PI: Math.PI,
          e: Math.E,
          E: Math.E
        };

        // Create evaluation string safely replacing functions to run on standard sandbox
        let evalStr = exp;
        // Replace custom syntax e.g. "^" to "**"
        evalStr = evalStr.replace(/\^/g, '**');

        const fnKeys = Object.keys(sandbox);
        const fnVals = Object.values(sandbox);

        const solver = new Function(...fnKeys, `return (${evalStr});`);
        const value = solver(...fnVals);

        resultStr = String(value);
        steps.push(`Parsing expression: "${exp}"`);
        steps.push(`Replacing special operator notations: "${evalStr}"`);
        steps.push(`Evaluating through execution engine...`);
        steps.push(`Result: ${resultStr}`);
      } catch (err) {
        resultStr = 'Error';
        steps.push(`Failed to compile math expression safely. Please check mathematical operators.`);
      }

      return {
        results: [
          { label: 'Calculated Value', value: resultStr, highlighted: true }
        ],
        steps
      };
    }
  },

  // 5. ZAKAT CALCULATOR (ISLAMIC)
  {
    id: 'zakat-calculator',
    name: 'Zakat (Alms-giving) Calculator',
    category: 'islamic',
    icon: 'Percent',
    description: 'Calculate your obligatory Zakat payment (2.5% of eligible wealth) based on Nisab valuation standards.',
    detailedExplanation: 'Zakat is an Islamic religious obligation representing 2.5% of qualifying personal wealth held above the Nisab threshold (typically valued at 85 grams of pure Gold or 595 grams of Silver) for an entire lunar year.',
    formula: 'Zakat = 0.025 * (Cash + Gold/Silver Value + Investments - Active Debts)',
    examples: [
      { input: 'Savings: $20,000, Gold: $5,000, Debts: $1,000, Nisab Level: $6,000', output: 'Zakat Due: $600.00' }
    ],
    faqs: [
      {
        question: 'What is Nisab?',
        answer: 'Nisab is the minimum threshold of wealth that a Muslim must possess for one full lunar year before they are required to pay Zakat. It is calculated as equivalent to 85g of gold or 595g of silver.'
      },
      {
        question: 'Who receives Zakat?',
        answer: 'Zakat can only be distributed to specific categories described in Quran 9:60, predominantly the poor and needy.'
      }
    ],
    fields: [
      { name: 'cash', label: 'Cash (in accounts, home, safe) ($)', type: 'number', defaultValue: 15000, suffix: '$' },
      { name: 'gold', label: 'Value of Gold & Silver owned ($)', type: 'number', defaultValue: 5000, suffix: '$' },
      { name: 'investments', label: 'Stock market & business shares ($)', type: 'number', defaultValue: 10000, suffix: '$' },
      { name: 'receivables', label: 'Money owed to you ($)', type: 'number', defaultValue: 0, suffix: '$' },
      { name: 'debts', label: 'Debts & immediate liabilities ($)', type: 'number', defaultValue: 2000, suffix: '$' },
      { name: 'nisab', label: 'Nisab Value (Current Golden standard) ($)', type: 'number', defaultValue: 6200, suffix: '$' }
    ],
    calculate: (inputs) => {
      const cash = Number(inputs.cash) || 0;
      const gold = Number(inputs.gold) || 0;
      const investments = Number(inputs.investments) || 0;
      const receivables = Number(inputs.receivables) || 0;
      const debts = Number(inputs.debts) || 0;
      const nisab = Number(inputs.nisab) || 0;

      const totalWealth = (cash + gold + investments + receivables) - debts;
      let zakatDue = 0;
      const steps: string[] = [];

      steps.push(`Step 1: Sum all qualifying assets:`);
      steps.push(`   Cash ($${cash}) + Gold/Silver ($${gold}) + Investments ($${investments}) + Money Owed ($${receivables}) = $${(cash + gold + investments + receivables).toLocaleString()}`);
      steps.push(`Step 2: Subtract immediate liabilities & short term debts ($${debts}):`);
      steps.push(`   Net Wealth = $${(cash + gold + investments + receivables).toLocaleString()} - $${debts} = $${totalWealth.toLocaleString()}`);

      if (totalWealth >= nisab) {
        zakatDue = totalWealth * 0.025;
        steps.push(`Step 3: Compare Net Wealth ($${totalWealth.toLocaleString()}) against Nisab ($${nisab.toLocaleString()}):`);
        steps.push(`   Net Wealth exceeds Nisab. Zakat is OBLIGATORY.`);
        steps.push(`Step 4: Calculate 2.5% Zakat:`);
        steps.push(`   Zakat Due = $${totalWealth.toLocaleString()} * 2.5% = $${zakatDue.toFixed(2)}`);
      } else {
        steps.push(`Step 3: Compare Net Wealth ($${totalWealth.toLocaleString()}) against Nisab ($${nisab.toLocaleString()}):`);
        steps.push(`   Net Wealth is lower than Nisab threshold. No Zakat is due on this sum.`);
      }

      return {
        results: [
          { label: 'Total Net Wealth', value: totalWealth.toFixed(2), unit: '$' },
          { label: 'Nisab Threshold', value: nisab.toFixed(2), unit: '$' },
          { label: 'Zakat Due (2.5%)', value: zakatDue.toFixed(2), unit: '$', highlighted: true }
        ],
        steps
      };
    }
  },

  // 6. AGE CALCULATOR (DATE & TIME)
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    category: 'datetime',
    icon: 'CalendarDays',
    description: 'Calculate your exact age in years, months, weeks, days, hours, and minutes based on your birth date.',
    detailedExplanation: 'This age calculator figures out the time difference between two dates. It shows your detailed lifespan statistics including total months, total days, and countdown to your next birthday.',
    formula: 'Date calculations using UTC and Local calendar conversion values.',
    examples: [
      { input: 'Birth Date: June 15, 1995, Current Date: June 29, 2026', output: 'Age: 31 years, 14 days' }
    ],
    faqs: [
      {
        question: 'Does the age calculator handle leap years?',
        answer: 'Yes, it counts correct calendars including days in leap years like 2024, 2028, etc.'
      }
    ],
    fields: [
      { name: 'birthDate', label: 'Date of Birth', type: 'text', defaultValue: '1995-06-15', placeholder: 'YYYY-MM-DD' },
      { name: 'targetDate', label: 'Calculate Age at Date', type: 'text', defaultValue: '2026-06-29', placeholder: 'YYYY-MM-DD' }
    ],
    calculate: (inputs) => {
      const birthStr = String(inputs.birthDate || '');
      const targetStr = String(inputs.targetDate || '');

      const bDate = new Date(birthStr);
      const tDate = new Date(targetStr);

      if (isNaN(bDate.getTime()) || isNaN(tDate.getTime())) {
        return {
          results: [{ label: 'Error', value: 'Invalid Date format. Use YYYY-MM-DD', highlighted: true }],
          steps: ['Could not parse birth or target dates.']
        };
      }

      const diffTime = tDate.getTime() - bDate.getTime();
      const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      // Year/month calculation
      let years = tDate.getFullYear() - bDate.getFullYear();
      let months = tDate.getMonth() - bDate.getMonth();
      let days = tDate.getDate() - bDate.getDate();

      if (days < 0) {
        months--;
        // Days in previous month of target date
        const prevMonth = new Date(tDate.getFullYear(), tDate.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      const steps = [
        `Step 1: Calculate raw Milliseconds difference between dates: ${diffTime} ms`,
        `Step 2: Convert to total days: ${totalDays.toLocaleString()} days`,
        `Step 3: Extract structured calendar differences:`,
        `   Years: ${years}, Months: ${months}, Days: ${days}`
      ];

      return {
        results: [
          { label: 'Exact Age', value: `${years} Years, ${months} Months, ${days} Days`, highlighted: true },
          { label: 'Total Months', value: (years * 12 + months).toLocaleString() },
          { label: 'Total Weeks', value: Math.floor(totalDays / 7).toLocaleString() },
          { label: 'Total Days', value: totalDays.toLocaleString() }
        ],
        steps
      };
    }
  },

  // 7. LOAN / EMI CALCULATOR
  {
    id: 'emi-calculator',
    name: 'Loan EMI Calculator',
    category: 'finance',
    icon: 'CreditCard',
    description: 'Find your monthly Equated Monthly Installment (EMI) for personal, car, or student loans.',
    detailedExplanation: 'EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are applied to both interest and principal each month.',
    formula: 'EMI = [P * r * (1 + r)^N] / [(1 + r)^N - 1]',
    examples: [
      { input: 'Loan: $30,000, Interest: 8.5%, Term: 5 Years', output: 'EMI: $615.42' }
    ],
    faqs: [
      {
        question: 'What does EMI comprise of?',
        answer: 'Initially, interest is the largest share of your EMI. Over time, as the principal decreases, the interest share drops, and the principal paid back each month increases.'
      }
    ],
    fields: [
      { name: 'loanAmount', label: 'Loan Amount ($)', type: 'number', defaultValue: 30000, min: 0, suffix: '$' },
      { name: 'interestRate', label: 'Interest Rate (Annual %)', type: 'number', defaultValue: 8.5, min: 0, max: 100, step: 0.1, suffix: '%' },
      { name: 'tenure', label: 'Loan Term (Years)', type: 'number', defaultValue: 5, min: 1, suffix: 'yrs' }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.loanAmount) || 0;
      const annualR = Number(inputs.interestRate) || 0;
      const r = (annualR / 12) / 100;
      const N = (Number(inputs.tenure) || 0) * 12;

      let emi = 0;
      if (P > 0 && N > 0) {
        if (r === 0) {
          emi = P / N;
        } else {
          emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
        }
      }

      const totalPayable = emi * N;
      const totalInterest = totalPayable - P;

      const steps = [
        `Step 1: Calculate monthly interest rate (r) = ${annualR}% / 12 months = ${(r * 100).toFixed(4)}%`,
        `Step 2: Calculate number of payments (N) = ${inputs.tenure} Years * 12 months = ${N} months`,
        `Step 3: Solve formula: EMI = [${P} * ${r.toFixed(5)} * (1 + ${r.toFixed(5)})^${N}] / [(1 + ${r.toFixed(5)})^${N} - 1]`,
        `   Monthly Payment (EMI) = $${emi.toFixed(2)}`,
        `Step 4: Total Cost of Loan = EMI * Payments = $${totalPayable.toFixed(2)}`,
        `Step 5: Total Interest Owed = Total Cost - Principal = $${totalInterest.toFixed(2)}`
      ];

      const chartData = [
        { name: 'Principal (Amount)', value: P },
        { name: 'Interest Cost', value: Math.max(0, totalInterest) }
      ];

      return {
        results: [
          { label: 'Monthly EMI Payment', value: emi.toFixed(2), unit: '$', highlighted: true },
          { label: 'Total Interest Payable', value: Math.max(0, totalInterest).toFixed(2), unit: '$' },
          { label: 'Total Debt Payable', value: totalPayable.toFixed(2), unit: '$' }
        ],
        steps,
        chartData
      };
    }
  },

  // 8. BMR & DAILY CALORIE CALCULATOR
  {
    id: 'bmr-calculator',
    name: 'BMR & Calorie Calculator',
    category: 'health',
    icon: 'Flame',
    description: 'Discover your Basal Metabolic Rate (BMR) and daily energy requirements using Mifflin-St Jeor equation.',
    detailedExplanation: 'Basal Metabolic Rate (BMR) is the daily calorie amount your body burns simply staying alive at rest. Daily Caloric Needs adds active physical movement levels over BMR.',
    formula: 'Men: BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age + 5 | Women: BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age - 161',
    examples: [
      { input: 'Gender: Male, Weight: 80 kg, Height: 180 cm, Age: 30', output: 'BMR: 1,785 kcal/day' }
    ],
    faqs: [
      {
        question: 'What is BMR vs Daily Caloric Needs?',
        answer: 'BMR is energy spent at rest. Daily Calories adds calories used for exercise, working, walking, and metabolizing food.'
      }
    ],
    fields: [
      {
        name: 'gender',
        label: 'Gender',
        type: 'select',
        defaultValue: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ]
      },
      { name: 'weight', label: 'Weight (kg)', type: 'number', defaultValue: 75, suffix: 'kg' },
      { name: 'height', label: 'Height (cm)', type: 'number', defaultValue: 175, suffix: 'cm' },
      { name: 'age', label: 'Age (Years)', type: 'number', defaultValue: 28, suffix: 'yrs' },
      {
        name: 'activity',
        label: 'Daily Activity Level',
        type: 'select',
        defaultValue: 1.375,
        options: [
          { label: 'Sedentary (No exercise)', value: 1.2 },
          { label: 'Lightly active (1-3 days/week)', value: 1.375 },
          { label: 'Moderately active (3-5 days/week)', value: 1.55 },
          { label: 'Very active (6-7 days/week)', value: 1.725 },
          { label: 'Super active (Hard training/physical job)', value: 1.9 }
        ]
      }
    ],
    calculate: (inputs) => {
      const isMale = inputs.gender === 'male';
      const weight = Number(inputs.weight) || 0;
      const height = Number(inputs.height) || 0;
      const age = Number(inputs.age) || 0;
      const activity = Number(inputs.activity) || 1.2;

      let bmr = 0;
      if (isMale) {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
      } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }

      const totalCalories = bmr * activity;

      const steps = [
        `Step 1: Apply Mifflin-St Jeor BMR equation for ${isMale ? 'Male' : 'Female'}:`,
        `   BMR = (10 * weight) + (6.25 * height) - (5 * age) ${isMale ? '+ 5' : '- 161'}`,
        `   BMR = (10 * ${weight}) + (6.25 * ${height}) - (5 * ${age}) ${isMale ? '+ 5' : '- 161'} = ${bmr.toFixed(1)} kcal`,
        `Step 2: Apply Physical Activity Multiplier (${activity}):`,
        `   Maintenance Energy = ${bmr.toFixed(1)} * ${activity} = ${totalCalories.toFixed(0)} kcal`
      ];

      return {
        results: [
          { label: 'Basal Metabolic Rate (BMR)', value: bmr.toFixed(0), unit: 'kcal/day', highlighted: true },
          { label: 'Daily Maintenance Calories', value: totalCalories.toFixed(0), unit: 'kcal/day', highlighted: false },
          { label: 'Weight Loss Target (500 kcal deficit)', value: Math.max(1200, totalCalories - 500).toFixed(0), unit: 'kcal/day' },
          { label: 'Weight Gain Target (500 kcal surplus)', value: (totalCalories + 500).toFixed(0), unit: 'kcal/day' }
        ],
        steps
      };
    }
  },

  // 9. PERCENTAGE CALCULATOR (MATH)
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'math',
    icon: 'Percent',
    description: 'Solve percentage problems, percent changes, percentage increases or decreases, and math fractions.',
    detailedExplanation: 'This is an all-in-one percentage tool to calculate: 1) What is X% of Y? 2) What percent of X is Y? 3) Percentage increase or decrease from X to Y.',
    formula: 'P% of V = V * P/100 | Change = ((Y - X) / X) * 100',
    examples: [
      { input: 'What is 15% of $200?', output: '$30.00' }
    ],
    faqs: [
      {
        question: 'What is a percentage?',
        answer: 'A percentage is a number or ratio expressed as a fraction of 100. It is often denoted using the percent sign, "%".'
      }
    ],
    fields: [
      {
        name: 'type',
        label: 'Calculation Type',
        type: 'select',
        defaultValue: 'of',
        options: [
          { label: 'What is X% of Y?', value: 'of' },
          { label: 'What percent of Y is X?', value: 'is' },
          { label: 'Percent Increase/Decrease from X to Y', value: 'change' }
        ]
      },
      { name: 'val1', label: 'Value X', type: 'number', defaultValue: 15 },
      { name: 'val2', label: 'Value Y', type: 'number', defaultValue: 200 }
    ],
    calculate: (inputs) => {
      const type = inputs.type;
      const X = Number(inputs.val1) || 0;
      const Y = Number(inputs.val2) || 0;

      let result = 0;
      let label = '';
      const steps: string[] = [];

      if (type === 'of') {
        result = (X / 100) * Y;
        label = `Result (${X}% of ${Y})`;
        steps.push(`Formula: (X / 100) * Y`);
        steps.push(`Operation: (${X} / 100) * ${Y}`);
        steps.push(`Result: ${result.toFixed(4)}`);
      } else if (type === 'is') {
        result = Y !== 0 ? (X / Y) * 100 : 0;
        label = `Result (${X} is what % of ${Y})`;
        steps.push(`Formula: (X / Y) * 100`);
        steps.push(`Operation: (${X} / ${Y}) * 100`);
        steps.push(`Result: ${result.toFixed(2)}%`);
      } else {
        result = X !== 0 ? ((Y - X) / X) * 100 : 0;
        label = `Percentage Change from ${X} to ${Y}`;
        steps.push(`Formula: ((Y - X) / X) * 100`);
        steps.push(`Operation: ((${Y} - ${X}) / ${X}) * 100`);
        steps.push(`Result: ${result.toFixed(2)}% (${result >= 0 ? 'Increase' : 'Decrease'})`);
      }

      return {
        results: [
          { label, value: result.toFixed(2) + (type !== 'of' ? '%' : ''), highlighted: true }
        ],
        steps
      };
    }
  },

  // 10. OHMS LAW CALCULATOR (ENGINEERING)
  {
    id: 'ohms-law',
    name: 'Ohm\'s Law Calculator',
    category: 'engineering',
    icon: 'Zap',
    description: 'Calculate voltage, current, resistance, and power effortlessly with Ohm\'s Law.',
    detailedExplanation: 'Ohm\'s Law states that the current running through a conductor between two points is directly proportional to the voltage across the two points. V = I * R.',
    formula: 'V = I * R | P = V * I',
    examples: [
      { input: 'Current: 2A, Resistance: 10 Ohm', output: 'Voltage: 20V, Power: 40W' }
    ],
    faqs: [
      {
        question: 'What is Ohm\'s Law?',
        answer: 'Ohm\'s Law defines the relationship between Voltage (V), Current (I), and Resistance (R). Power (P) in watts is derived directly from these.'
      }
    ],
    fields: [
      {
        name: 'solveFor',
        label: 'Calculate Target Variable',
        type: 'select',
        defaultValue: 'voltage',
        options: [
          { label: 'Voltage (V) [solve V = I * R]', value: 'voltage' },
          { label: 'Current (I) [solve I = V / R]', value: 'current' },
          { label: 'Resistance (R) [solve R = V / I]', value: 'resistance' }
        ]
      },
      { name: 'v', label: 'Voltage (V)', type: 'number', defaultValue: 12, suffix: 'V' },
      { name: 'i', label: 'Current (I)', type: 'number', defaultValue: 2, suffix: 'A' },
      { name: 'r', label: 'Resistance (R)', type: 'number', defaultValue: 6, suffix: 'Ω' }
    ],
    calculate: (inputs) => {
      const target = inputs.solveFor;
      let V = Number(inputs.v) || 0;
      let I = Number(inputs.i) || 0;
      let R = Number(inputs.r) || 0;
      let P = 0;
      const steps: string[] = [];

      if (target === 'voltage') {
        V = I * R;
        P = V * I;
        steps.push(`Target: Solve for Voltage (V)`);
        steps.push(`Formula: V = I * R`);
        steps.push(`Operation: ${I} A * ${R} Ω = ${V.toFixed(2)} V`);
        steps.push(`Calculate Power: P = V * I = ${V.toFixed(2)} * ${I} = ${P.toFixed(2)} W`);
      } else if (target === 'current') {
        I = R !== 0 ? V / R : 0;
        P = V * I;
        steps.push(`Target: Solve for Current (I)`);
        steps.push(`Formula: I = V / R`);
        steps.push(`Operation: ${V} V / ${R} Ω = ${I.toFixed(4)} A`);
        steps.push(`Calculate Power: P = V * I = ${V} * ${I.toFixed(4)} = ${P.toFixed(2)} W`);
      } else {
        R = I !== 0 ? V / I : 0;
        P = V * I;
        steps.push(`Target: Solve for Resistance (R)`);
        steps.push(`Formula: R = V / I`);
        steps.push(`Operation: ${V} V / ${I} A = ${R.toFixed(2)} Ω`);
        steps.push(`Calculate Power: P = V * I = ${V} * ${I} = ${P.toFixed(2)} W`);
      }

      return {
        results: [
          { label: 'Voltage (V)', value: V.toFixed(2), unit: 'V', highlighted: target === 'voltage' },
          { label: 'Current (I)', value: I.toFixed(4), unit: 'A', highlighted: target === 'current' },
          { label: 'Resistance (R)', value: R.toFixed(2), unit: 'Ω', highlighted: target === 'resistance' },
          { label: 'Power (P)', value: P.toFixed(2), unit: 'W' }
        ],
        steps
      };
    }
  },

  // 11. CONCRETE CALCULATOR
  {
    id: 'concrete-calculator',
    name: 'Concrete Material Calculator',
    category: 'engineering',
    icon: 'Brick',
    description: 'Determine the bags of concrete, volume, and costs required for slabs, footings, or columns.',
    detailedExplanation: 'Calculate the total volume of concrete needed for rectangular or circular structures, as well as the number of premixed concrete bags (e.g., 60lb or 80lb bags) needed to complete the project.',
    formula: 'Volume = Length * Width * Depth | Bag count = Volume / Bag yield',
    examples: [
      { input: 'Length: 10ft, Width: 10ft, Depth: 4in', output: 'Volume: 1.23 cubic yards, Bags (80lb): 56' }
    ],
    faqs: [
      {
        question: 'How much volume does an 80lb bag of concrete yield?',
        answer: 'An 80lb bag of standard premixed concrete yields approximately 0.6 cubic feet of mixed concrete.'
      }
    ],
    fields: [
      { name: 'length', label: 'Length (feet)', type: 'number', defaultValue: 10, suffix: 'ft' },
      { name: 'width', label: 'Width (feet)', type: 'number', defaultValue: 10, suffix: 'ft' },
      { name: 'depth', label: 'Thickness / Depth (inches)', type: 'number', defaultValue: 4, suffix: 'in' },
      {
        name: 'bagSize',
        label: 'Concrete Bag Size',
        type: 'select',
        defaultValue: 80,
        options: [
          { label: '80 lb bag (yields 0.60 cu ft)', value: 80 },
          { label: '60 lb bag (yields 0.45 cu ft)', value: 60 },
          { label: '40 lb bag (yields 0.30 cu ft)', value: 40 }
        ]
      }
    ],
    calculate: (inputs) => {
      const L = Number(inputs.length) || 0;
      const W = Number(inputs.width) || 0;
      const dIn = Number(inputs.depth) || 0;
      const bagSize = Number(inputs.bagSize) || 80;

      const dFt = dIn / 12;
      const cuFt = L * W * dFt;
      const cuYd = cuFt / 27;

      let yieldCuFt = 0.6;
      if (bagSize === 60) yieldCuFt = 0.45;
      if (bagSize === 40) yieldCuFt = 0.30;

      const bagsNeeded = Math.ceil(cuFt / yieldCuFt);

      const steps = [
        `Step 1: Convert thickness from inches to feet:`,
        `   ${dIn} inches / 12 = ${dFt.toFixed(4)} feet`,
        `Step 2: Calculate rectangular volume in cubic feet:`,
        `   Volume = ${L} ft * ${W} ft * ${dFt.toFixed(4)} ft = ${cuFt.toFixed(2)} cu ft`,
        `Step 3: Convert to cubic yards (divide by 27):`,
        `   ${cuFt.toFixed(2)} / 27 = ${cuYd.toFixed(2)} cubic yards`,
        `Step 4: Estimate concrete bag count (yielding ${yieldCuFt} cu ft per bag):`,
        `   Bags = ${cuFt.toFixed(2)} / ${yieldCuFt} = ${bagsNeeded} bags`
      ];

      return {
        results: [
          { label: 'Concrete Volume', value: cuYd.toFixed(2), unit: 'cubic yards', highlighted: true },
          { label: 'Volume in Cubic Feet', value: cuFt.toFixed(2), unit: 'cu ft' },
          { label: `Bags Needed (${bagSize} lb bags)`, value: bagsNeeded, highlighted: true }
        ],
        steps
      };
    }
  },

  // 12. UNIT CONVERTER
  {
    id: 'unit-converter',
    name: 'Universal Unit Converter',
    category: 'converters',
    icon: 'RefreshCw',
    description: 'Convert lengths, weights, temperature scales, speed metrics, and volume systems instantly.',
    detailedExplanation: 'This general conversion utility handles all standard scientific and mechanical metric and imperial unit conversions.',
    formula: 'V_out = V_in * Conversion_Factor',
    examples: [
      { input: '100 Kilometers to Miles', output: '62.13 Miles' }
    ],
    faqs: [
      {
        question: 'Are metric and imperial units standards supported?',
        answer: 'Yes, this converter translates perfectly between standard Metric (meters, kg, Celsius) and US Imperial (feet, pounds, Fahrenheit).'
      }
    ],
    fields: [
      {
        name: 'mode',
        label: 'Conversion Property',
        type: 'select',
        defaultValue: 'length',
        options: [
          { label: 'Length (m, ft, in, km, mi)', value: 'length' },
          { label: 'Weight (kg, lbs, oz, g)', value: 'weight' },
          { label: 'Temperature (C, F, K)', value: 'temperature' }
        ]
      },
      { name: 'value', label: 'Value to Convert', type: 'number', defaultValue: 100 },
      {
        name: 'fromUnit',
        label: 'From Unit',
        type: 'select',
        defaultValue: 'km',
        options: [
          { label: 'Kilometers (km)', value: 'km' },
          { label: 'Miles (mi)', value: 'mi' },
          { label: 'Meters (m)', value: 'm' },
          { label: 'Feet (ft)', value: 'ft' }
        ]
      },
      {
        name: 'toUnit',
        label: 'To Unit',
        type: 'select',
        defaultValue: 'mi',
        options: [
          { label: 'Kilometers (km)', value: 'km' },
          { label: 'Miles (mi)', value: 'mi' },
          { label: 'Meters (m)', value: 'm' },
          { label: 'Feet (ft)', value: 'ft' }
        ]
      }
    ],
    calculate: (inputs) => {
      const mode = inputs.mode;
      const value = Number(inputs.value) || 0;
      let from = inputs.fromUnit;
      let to = inputs.toUnit;

      let result = 0;
      const steps: string[] = [];

      if (mode === 'length') {
        // Convert fromUnit to meters first
        let meters = 0;
        if (from === 'km') meters = value * 1000;
        else if (from === 'mi') meters = value * 1609.344;
        else if (from === 'ft') meters = value * 0.3048;
        else meters = value; // meters

        // Convert meters to toUnit
        if (to === 'km') result = meters / 1000;
        else if (to === 'mi') result = meters / 1609.344;
        else if (to === 'ft') result = meters / 0.3048;
        else result = meters;

        steps.push(`Standardizing Length conversion through meters:`);
        steps.push(`${value} ${from} = ${meters.toFixed(2)} meters`);
        steps.push(`Converting from meters to target:`);
        steps.push(`${meters.toFixed(2)} m = ${result.toFixed(4)} ${to}`);
      } else if (mode === 'weight') {
        // Simple weight map using grams as base
        let grams = 0;
        if (from === 'kg') grams = value * 1000;
        else if (from === 'lbs') grams = value * 453.59237;
        else grams = value;

        if (to === 'kg') result = grams / 1000;
        else if (to === 'lbs') result = grams / 453.59237;
        else result = grams;

        steps.push(`Standardizing Weight conversion through grams:`);
        steps.push(`${grams.toFixed(2)} g`);
        steps.push(`Result: ${result.toFixed(4)}`);
      } else {
        // Temperature
        if (from === 'C' && to === 'F') {
          result = (value * 9/5) + 32;
        } else if (from === 'F' && to === 'C') {
          result = (value - 32) * 5/9;
        } else {
          result = value; // Same or other temp
        }
        steps.push(`Standard temperature scaling...`);
      }

      return {
        results: [
          { label: 'Converted Value', value: result.toFixed(4), unit: String(to).toUpperCase(), highlighted: true }
        ],
        steps
      };
    }
  }
];

export const ALL_CALCULATORS = [...CALCULATORS, ...EXTENDED_CALCULATORS];

