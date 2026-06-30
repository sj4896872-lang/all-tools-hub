import { CalculatorDef } from '../types/calculator';

export const EXTENDED_CALCULATORS: CalculatorDef[] = [
  // 13. GPA CALCULATOR
  {
    id: 'gpa-calculator',
    name: 'GPA & Grades Calculator',
    category: 'math',
    icon: 'GraduationCap',
    description: 'Calculate your semester Grade Point Average (GPA) based on grades and class credits.',
    detailedExplanation: 'A GPA calculator translates letter grades into a numerical scale (typically 4.0 scale) and computes a weighted average based on course credit hours.',
    formula: 'GPA = Sum(Grade Points * Credits) / Sum(Credits)',
    examples: [
      { input: 'A (4.0) in 3-credit course, B (3.0) in 4-credit course', output: 'GPA: 3.43' }
    ],
    faqs: [
      {
        question: 'What are the standard GPA grade points?',
        answer: 'Standard 4.0 scale points: A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, D = 1.0, F = 0.0.'
      }
    ],
    fields: [
      {
        name: 'g1',
        label: 'Course 1 Grade',
        type: 'select',
        defaultValue: '4.0',
        options: [
          { label: 'A (4.0)', value: '4.0' },
          { label: 'A- (3.7)', value: '3.7' },
          { label: 'B+ (3.3)', value: '3.3' },
          { label: 'B (3.0)', value: '3.0' },
          { label: 'C (2.0)', value: '2.0' },
          { label: 'F (0.0)', value: '0.0' }
        ]
      },
      { name: 'c1', label: 'Course 1 Credits', type: 'number', defaultValue: 3, min: 1 },
      {
        name: 'g2',
        label: 'Course 2 Grade',
        type: 'select',
        defaultValue: '3.0',
        options: [
          { label: 'A (4.0)', value: '4.0' },
          { label: 'A- (3.7)', value: '3.7' },
          { label: 'B+ (3.3)', value: '3.3' },
          { label: 'B (3.0)', value: '3.0' },
          { label: 'C (2.0)', value: '2.0' },
          { label: 'F (0.0)', value: '0.0' }
        ]
      },
      { name: 'c2', label: 'Course 2 Credits', type: 'number', defaultValue: 4, min: 1 },
      {
        name: 'g3',
        label: 'Course 3 Grade',
        type: 'select',
        defaultValue: '4.0',
        options: [
          { label: 'A (4.0)', value: '4.0' },
          { label: 'A- (3.7)', value: '3.7' },
          { label: 'B+ (3.3)', value: '3.3' },
          { label: 'B (3.0)', value: '3.0' },
          { label: 'C (2.0)', value: '2.0' },
          { label: 'F (0.0)', value: '0.0' }
        ]
      },
      { name: 'c3', label: 'Course 3 Credits', type: 'number', defaultValue: 3, min: 1 }
    ],
    calculate: (inputs) => {
      const g1 = Number(inputs.g1) || 0;
      const c1 = Number(inputs.c1) || 0;
      const g2 = Number(inputs.g2) || 0;
      const c2 = Number(inputs.c2) || 0;
      const g3 = Number(inputs.g3) || 0;
      const c3 = Number(inputs.c3) || 0;

      const totalPoints = (g1 * c1) + (g2 * c2) + (g3 * c3);
      const totalCredits = c1 + c2 + c3;
      const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

      const steps = [
        `Step 1: Calculate grade points for each course (Grade Value * Credits):`,
        `   Course 1: ${g1} * ${c1} = ${(g1 * c1).toFixed(1)} points`,
        `   Course 2: ${g2} * ${c2} = ${(g2 * c2).toFixed(1)} points`,
        `   Course 3: ${g3} * ${c3} = ${(g3 * c3).toFixed(1)} points`,
        `Step 2: Sum all courses grade points:`,
        `   Total points = ${(g1 * c1).toFixed(1)} + ${(g2 * c2).toFixed(1)} + ${(g3 * c3).toFixed(1)} = ${totalPoints.toFixed(1)}`,
        `Step 3: Sum total course credits:`,
        `   Total credits = ${c1} + ${c2} + ${c3} = ${totalCredits} credits`,
        `Step 4: Divide total grade points by total credits to find GPA:`,
        `   GPA = ${totalPoints.toFixed(1)} / ${totalCredits} = ${gpa.toFixed(2)}`
      ];

      return {
        results: [
          { label: 'Calculated Semester GPA', value: gpa.toFixed(2), highlighted: true },
          { label: 'Total Course Credits Checked', value: totalCredits },
          { label: 'Total Weighted Grade Points', value: totalPoints.toFixed(1) }
        ],
        steps
      };
    }
  },

  // 14. ROI (RETURN ON INVESTMENT) CALCULATOR
  {
    id: 'roi-calculator',
    name: 'ROI (Return on Investment) Calculator',
    category: 'finance',
    icon: 'TrendingUp',
    description: 'Calculate the total and annualized returns on an investment based on cost and returns.',
    detailedExplanation: 'Return on Investment (ROI) is a popular financial metric used to evaluate the efficiency or profitability of an investment. It measures the amount of return relative to the investment\'s cost.',
    formula: 'ROI = [(Gain - Cost) / Cost] * 100 | Annualized ROI = [(Final Value / Initial Value) ^ (1 / years) - 1] * 100',
    examples: [
      { input: 'Investment: $10,000, Sell Price: $15,000, Holding Period: 2 Years', output: 'Total ROI: 50%, Annualized ROI: 22.47%' }
    ],
    faqs: [
      {
        question: 'Why is Annualized ROI important?',
        answer: 'Annualized ROI expresses the investment return as an average yearly growth rate. This lets you compare assets held for different time lengths on a level playing field.'
      }
    ],
    fields: [
      { name: 'cost', label: 'Initial Investment Cost ($)', type: 'number', defaultValue: 10000, min: 1, suffix: '$' },
      { name: 'value', label: 'Final Value or Sell Price ($)', type: 'number', defaultValue: 15000, min: 0, suffix: '$' },
      { name: 'years', label: 'Holding Period (Years)', type: 'number', defaultValue: 2, min: 0.1, step: 0.1, suffix: 'yrs' }
    ],
    calculate: (inputs) => {
      const cost = Number(inputs.cost) || 1;
      const final = Number(inputs.value) || 0;
      const years = Number(inputs.years) || 1;

      const totalGain = final - cost;
      const totalROI = (totalGain / (cost || 1)) * 100;
      
      let annualizedROI = 0;
      if (final > 0 && cost > 0 && years > 0) {
        annualizedROI = (Math.pow(final / cost, 1 / years) - 1) * 100;
      }

      const steps = [
        `Step 1: Calculate total absolute gain (Final Value - Cost):`,
        `   $${final.toLocaleString()} - $${cost.toLocaleString()} = $${totalGain.toLocaleString()}`,
        `Step 2: Calculate total ROI percentage:`,
        `   ROI = ($${totalGain.toLocaleString()} / $${cost.toLocaleString()}) * 100 = ${totalROI.toFixed(2)}%`,
        `Step 3: Calculate compound annualized return (CAGR) for ${years} years:`,
        `   Annualized ROI = [(${final} / ${cost}) ^ (1 / ${years}) - 1] * 100 = ${annualizedROI.toFixed(2)}%`
      ];

      return {
        results: [
          { label: 'Total Absolute Return', value: totalGain.toFixed(2), unit: '$' },
          { label: 'Total ROI Metric', value: totalROI.toFixed(2), unit: '%', highlighted: true },
          { label: 'Annualized ROI (CAGR)', value: annualizedROI.toFixed(2), unit: '%', highlighted: true }
        ],
        steps
      };
    }
  },

  // 15. IDEAL BODY WEIGHT
  {
    id: 'ideal-weight',
    name: 'Ideal Body Weight Calculator',
    category: 'health',
    icon: 'User',
    description: 'Estimate your ideal body weight based on gender, height, and scientific formulas (Devine formula).',
    detailedExplanation: 'The Ideal Body Weight (IBW) calculator uses standard equations such as the Devine formula (1974) to calculate an estimate of a healthy body weight for medical and dosing standards.',
    formula: 'Men: IBW = 50.0 kg + 2.3 kg per inch over 5 feet | Women: IBW = 45.5 kg + 2.3 kg per inch over 5 feet',
    examples: [
      { input: 'Gender: Male, Height: 5\' 10" (70 inches)', output: 'Ideal Weight: 73 kg (161 lbs)' }
    ],
    faqs: [
      {
        question: 'How are Ideal Weight formulas calculated?',
        answer: 'Most clinical formulas assume a base weight for a person standing 5 feet (60 inches) tall, then add a linear increment for every additional inch.'
      }
    ],
    fields: [
      {
        name: 'gender',
        label: 'Biological Gender',
        type: 'select',
        defaultValue: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ]
      },
      { name: 'heightInches', label: 'Total Height (inches) (e.g. 5\'10" = 70)', type: 'number', defaultValue: 70, min: 36, max: 96 }
    ],
    calculate: (inputs) => {
      const isMale = inputs.gender === 'male';
      const heightIn = Number(inputs.heightInches) || 60;

      const inchesOver5ft = Math.max(0, heightIn - 60);
      let ibwKg = 0;

      if (isMale) {
        ibwKg = 50.0 + (2.3 * inchesOver5ft);
      } else {
        ibwKg = 45.5 + (2.3 * inchesOver5ft);
      }

      const ibwLbs = ibwKg * 2.20462;

      const steps = [
        `Step 1: Calculate height excess over 5 feet (60 inches):`,
        `   Height = ${heightIn} inches | Excess = ${heightIn} - 60 = ${inchesOver5ft} inches`,
        `Step 2: Apply Devine formula based on biological gender:`,
        `   ${isMale ? 'Male: 50.0 kg + (2.3 * excess)' : 'Female: 45.5 kg + (2.3 * excess)'}`,
        `   IBW = ${isMale ? '50.0' : '45.5'} + (2.3 * ${inchesOver5ft}) = ${ibwKg.toFixed(1)} kg`,
        `Step 3: Convert ideal weight to Imperial pounds:`,
        `   ${ibwKg.toFixed(1)} kg * 2.20462 = ${ibwLbs.toFixed(1)} lbs`
      ];

      return {
        results: [
          { label: 'Ideal Body Weight (Metric)', value: ibwKg.toFixed(1), unit: 'kg', highlighted: true },
          { label: 'Ideal Body Weight (Imperial)', value: ibwLbs.toFixed(1), unit: 'lbs', highlighted: true }
        ],
        steps
      };
    }
  },

  // 16. SOLAR PANEL ENERGY CALCULATOR
  {
    id: 'solar-energy-calculator',
    name: 'Solar Panel Energy Calculator',
    category: 'engineering',
    icon: 'Sun',
    description: 'Calculate daily and annual electricity generation of solar arrays using local peak sunlight hours.',
    detailedExplanation: 'This calculator models solar power output factoring in system losses, PV system panel rating, and available localized peak solar radiation (sunlight hours).',
    formula: 'Energy Output (kWh) = Array Size (kW) * Daily Sun Hours * System Efficiency Factor (e.g., 0.75)',
    examples: [
      { input: 'Array size: 5000 Watts (5 kW), Daily Sunlight: 5 Hours, System Loss: 20%', output: 'Daily energy: 20 kWh' }
    ],
    faqs: [
      {
        question: 'What is System Efficiency Loss?',
        answer: 'Real-world solar systems lose energy due to inverter inefficiencies, wiring losses, panel dirt coverage, temperature coefficients, and battery storage constraints. 15-20% loss is standard (80% efficiency).'
      }
    ],
    fields: [
      { name: 'watts', label: 'Solar Array Capacity (Watts)', type: 'number', defaultValue: 5000, suffix: 'W' },
      { name: 'sunHours', label: 'Average Daily Sun Hours', type: 'number', defaultValue: 4.8, step: 0.1, suffix: 'hrs' },
      { name: 'efficiency', label: 'System Efficiency / Loss Factor (%)', type: 'number', defaultValue: 80, min: 10, max: 100, suffix: '%' }
    ],
    calculate: (inputs) => {
      const W = Number(inputs.watts) || 0;
      const hrs = Number(inputs.sunHours) || 0;
      const eff = (Number(inputs.efficiency) || 80) / 100;

      const kW = W / 1000;
      const dailyKWh = kW * hrs * eff;
      const annualKWh = dailyKWh * 365;

      const steps = [
        `Step 1: Convert system size from Watts to Kilowatts (kW):`,
        `   ${W} W / 1000 = ${kW} kW`,
        `Step 2: Multiply kW by average peak solar hours and system efficiency:`,
        `   Daily Output = ${kW} kW * ${hrs} hours * ${eff.toFixed(2)} efficiency = ${dailyKWh.toFixed(2)} kWh`,
        `Step 3: Extrapolate to one calendar year (365 days):`,
        `   Annual Output = ${dailyKWh.toFixed(2)} * 365 days = ${annualKWh.toFixed(0)} kWh`
      ];

      return {
        results: [
          { label: 'Daily Solar Production', value: dailyKWh.toFixed(2), unit: 'kWh/day', highlighted: true },
          { label: 'Annual Solar Production', value: annualKWh.toFixed(0), unit: 'kWh/year', highlighted: true },
          { label: 'CO2 Offset Equivalent (lbs/yr)', value: (annualKWh * 0.85).toFixed(0), unit: 'lbs' }
        ],
        steps
      };
    }
  },

  // 17. BATTERY LIFE CALCULATOR
  {
    id: 'battery-life-calculator',
    name: 'Battery Life Calculator',
    category: 'engineering',
    icon: 'BatteryCharging',
    description: 'Calculate battery run-time based on storage capacity, average current load, and safety tolerances.',
    detailedExplanation: 'This tool predicts the discharge duration of rechargeable or non-rechargeable batteries supporting a constant electrical load.',
    formula: 'Operating Hours = [Capacity (mAh) / Load Current (mA)] * (1 - Safety Margin)',
    examples: [
      { input: 'Battery Capacity: 2500 mAh, Load: 50 mA, Safety Margin: 15%', output: 'Battery duration: 42.5 Hours' }
    ],
    faqs: [
      {
        question: 'Why add a safety margin?',
        answer: 'Batteries degrade over time, suffer self-discharge, are highly affected by extreme temperatures, and should not be discharged to absolute zero to preserve cell health.'
      }
    ],
    fields: [
      { name: 'capacity', label: 'Battery Capacity (mAh)', type: 'number', defaultValue: 2500, min: 1, suffix: 'mAh' },
      { name: 'current', label: 'Load Current Consumption (mA)', type: 'number', defaultValue: 100, min: 1, suffix: 'mA' },
      { name: 'safety', label: 'Discharge Safety Margin (%)', type: 'number', defaultValue: 15, min: 0, max: 90, suffix: '%' }
    ],
    calculate: (inputs) => {
      const cap = Number(inputs.capacity) || 1;
      const cur = Number(inputs.current) || 1;
      const safety = (Number(inputs.safety) || 15) / 100;

      const rawHours = cap / cur;
      const usableFactor = 1 - safety;
      const adjustedHours = rawHours * usableFactor;

      const steps = [
        `Step 1: Divide nominal battery capacity by current consumption load:`,
        `   Raw duration = ${cap} mAh / ${cur} mA = ${rawHours.toFixed(2)} hours`,
        `Step 2: Incorporate discharge safety margin buffer (${inputs.safety}%):`,
        `   Usable capacity factor = 100% - ${inputs.safety}% = ${usableFactor.toFixed(2)}`,
        `Step 3: Multiply raw duration by safety factor:`,
        `   Usable Run Time = ${rawHours.toFixed(2)} hours * ${usableFactor.toFixed(2)} = ${adjustedHours.toFixed(2)} hours`
      ];

      return {
        results: [
          { label: 'Nominal Running Time', value: rawHours.toFixed(1), unit: 'hours' },
          { label: 'Estimated Usable Run Time', value: adjustedHours.toFixed(1), unit: 'hours', highlighted: true },
          { label: 'Operating Days Equivalent', value: (adjustedHours / 24).toFixed(2), unit: 'days' }
        ],
        steps
      };
    }
  },

  // 18. ISLAMIC INHERITANCE CALCULATOR
  {
    id: 'inheritance-calculator',
    name: 'Islamic Inheritance (Faraid) Calculator',
    category: 'islamic',
    icon: 'BookOpen',
    description: 'Analyze inheritance share distributions among legal heirs according to Islamic jurisprudence rules.',
    detailedExplanation: 'Islamic Inheritance Law (Faraid) determines fixed algebraic shares of an estate distributed to immediate relatives (Spouse, Parents, Children) as outlined in Quranic verses (Surah An-Nisa).',
    formula: 'Algebraic fractional division based on surviving heir assemblies (e.g. Spouse shares 1/4 or 1/8).',
    examples: [
      { input: 'Estate: $100,000, Survivors: Wife, 1 Son, 1 Daughter', output: 'Wife: $12,500 (1/8), Son: $58,333.33 (2/3 of rest), Daughter: $29,166.67 (1/3 of rest)' }
    ],
    faqs: [
      {
        question: 'How do daughters share relative to sons?',
        answer: 'According to Islamic jurisprudence, when sons and daughters inherit together, a son receives twice the share of a daughter.'
      }
    ],
    fields: [
      { name: 'estate', label: 'Total Value of Net Estate ($)', type: 'number', defaultValue: 120000, min: 1, suffix: '$' },
      {
        name: 'spouse',
        label: 'Surviving Spouse',
        type: 'select',
        defaultValue: 'wife',
        options: [
          { label: 'Surviving Wife', value: 'wife' },
          { label: 'Surviving Husband', value: 'husband' },
          { label: 'None', value: 'none' }
        ]
      },
      { name: 'sons', label: 'Number of Surviving Sons', type: 'number', defaultValue: 1, min: 0 },
      { name: 'daughters', label: 'Number of Surviving Daughters', type: 'number', defaultValue: 1, min: 0 },
      { name: 'hasFather', label: 'Is Father Alive?', type: 'boolean', defaultValue: false },
      { name: 'hasMother', label: 'Is Mother Alive?', type: 'boolean', defaultValue: false }
    ],
    calculate: (inputs) => {
      const estate = Number(inputs.estate) || 0;
      const spouse = inputs.spouse;
      const sons = Number(inputs.sons) || 0;
      const daughters = Number(inputs.daughters) || 0;
      const hasFather = !!inputs.hasFather;
      const hasMother = !!inputs.hasMother;

      const steps: string[] = [];
      const resultsHeirs: { label: string; value: string; unit?: string }[] = [];

      let runningEstate = estate;
      steps.push(`Total Net Estate value to distribute: $${estate.toLocaleString()}`);

      // 1. Father/Mother shares
      let motherShareVal = 0;
      let fatherShareVal = 0;

      const hasChildren = (sons + daughters) > 0;

      if (hasMother) {
        // Mother gets 1/6 if there are children, else 1/3
        const shareFraction = hasChildren ? (1/6) : (1/3);
        motherShareVal = estate * shareFraction;
        runningEstate -= motherShareVal;
        steps.push(`Mother Share: ${hasChildren ? '1/6' : '1/3'} of estate = $${motherShareVal.toFixed(2)}`);
        resultsHeirs.push({ label: 'Mother', value: motherShareVal.toFixed(2), unit: '$' });
      }

      if (hasFather) {
        // Father gets 1/6 if children, else acts as residue/asabah
        if (hasChildren) {
          fatherShareVal = estate * (1/6);
          runningEstate -= fatherShareVal;
          steps.push(`Father Share: 1/6 of estate (since there are children) = $${fatherShareVal.toFixed(2)}`);
          resultsHeirs.push({ label: 'Father', value: fatherShareVal.toFixed(2), unit: '$' });
        }
      }

      // 2. Spouse share
      let spouseShareVal = 0;
      if (spouse === 'wife') {
        const wifeFraction = hasChildren ? (1/8) : (1/4);
        spouseShareVal = estate * wifeFraction;
        runningEstate -= spouseShareVal;
        steps.push(`Wife Share: ${hasChildren ? '1/8' : '1/4'} of estate = $${spouseShareVal.toFixed(2)}`);
        resultsHeirs.push({ label: 'Spouse (Wife)', value: spouseShareVal.toFixed(2), unit: '$' });
      } else if (spouse === 'husband') {
        const husbandFraction = hasChildren ? (1/4) : (1/2);
        spouseShareVal = estate * husbandFraction;
        runningEstate -= spouseShareVal;
        steps.push(`Husband Share: ${hasChildren ? '1/4' : '1/2'} of estate = $${spouseShareVal.toFixed(2)}`);
        resultsHeirs.push({ label: 'Spouse (Husband)', value: spouseShareVal.toFixed(2), unit: '$' });
      }

      // 3. Father as residue if no sons
      if (hasFather && !hasChildren) {
        const fatherAsabah = runningEstate;
        runningEstate = 0;
        steps.push(`Father inherits remaining residue as Asabah = $${fatherAsabah.toFixed(2)}`);
        resultsHeirs.push({ label: 'Father (Residue Heirs)', value: fatherAsabah.toFixed(2), unit: '$' });
      }

      // 4. Children share
      if (hasChildren && runningEstate > 0) {
        const totalShares = (sons * 2) + daughters;
        if (totalShares > 0) {
          const shareUnitVal = runningEstate / totalShares;
          steps.push(`Distributing remaining residue ($${runningEstate.toFixed(2)}) to children at 2:1 ratio (Sons:Daughters):`);

          if (sons > 0) {
            const totalSonsShare = sons * 2 * shareUnitVal;
            const perSon = 2 * shareUnitVal;
            steps.push(`   Each of the ${sons} Son(s) gets 2 shares = $${perSon.toFixed(2)} (Total Sons: $${totalSonsShare.toFixed(2)})`);
            resultsHeirs.push({ label: `Sons Share (Each of ${sons})`, value: perSon.toFixed(2), unit: '$' });
          }
          if (daughters > 0) {
            const totalDaughtersShare = daughters * 1 * shareUnitVal;
            const perDaughter = shareUnitVal;
            steps.push(`   Each of the ${daughters} Daughter(s) gets 1 share = $${perDaughter.toFixed(2)} (Total Daughters: $${totalDaughtersShare.toFixed(2)})`);
            resultsHeirs.push({ label: `Daughters Share (Each of ${daughters})`, value: perDaughter.toFixed(2), unit: '$' });
          }
          runningEstate = 0;
        }
      }

      if (runningEstate > 0) {
        steps.push(`Unallocated Residue ($${runningEstate.toFixed(2)}) goes to general community fund/Radd.`);
        resultsHeirs.push({ label: 'Residue / Baitulmal', value: runningEstate.toFixed(2), unit: '$' });
      }

      return {
        results: resultsHeirs.map(h => ({ ...h, highlighted: true })),
        steps
      };
    }
  }
];
