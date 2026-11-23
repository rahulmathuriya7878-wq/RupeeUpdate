import { useState, useMemo } from 'react';

type CalculatorTab = 'sip' | 'emi' | 'tax';

function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function CalculatorsView() {
  const [activeTab, setActiveTab] = useState<CalculatorTab>('sip');

  // SIP State
  const [sipMonthly, setSipMonthly] = useState<number>(10000);
  const [sipReturn, setSipReturn] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  // EMI State
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [loanRate, setLoanRate] = useState<number>(8.6);
  const [loanYears, setLoanYears] = useState<number>(20);

  // Tax State (FY 2026-27)
  const [annualIncome, setAnnualIncome] = useState<number>(1400000);
  const [deduction80C, setDeduction80C] = useState<number>(150000);
  const [deduction80D, setDeduction80D] = useState<number>(25000);
  const [hraOrHomeLoan, setHraOrHomeLoan] = useState<number>(120000);

  const sipResult = useMemo(() => {
    const months = sipYears * 12;
    const monthlyRate = sipReturn / 12 / 100;
    const invested = sipMonthly * months;
    if (monthlyRate === 0) {
      return { invested, estReturns: 0, totalValue: invested };
    }
    const totalValue =
      sipMonthly *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
    return {
      invested,
      estReturns: Math.max(0, totalValue - invested),
      totalValue,
    };
  }, [sipMonthly, sipReturn, sipYears]);

  const emiResult = useMemo(() => {
    const months = loanYears * 12;
    const monthlyRate = loanRate / 12 / 100;
    if (monthlyRate === 0) {
      const emi = loanAmount / months;
      return { emi, totalInterest: 0, totalPayment: loanAmount };
    }
    const factor = Math.pow(1 + monthlyRate, months);
    const emi = (loanAmount * monthlyRate * factor) / (factor - 1);
    const totalPayment = emi * months;
    return {
      emi,
      totalInterest: Math.max(0, totalPayment - loanAmount),
      totalPayment,
    };
  }, [loanAmount, loanRate, loanYears]);

  const taxResult = useMemo(() => {
    const newTaxable = Math.max(0, annualIncome - 75000);
    let newBaseTax = 0;
    if (newTaxable > 1500000) {
      newBaseTax += (newTaxable - 1500000) * 0.3;
      newBaseTax += 300000 * 0.2;
      newBaseTax += 200000 * 0.15;
      newBaseTax += 300000 * 0.1;
      newBaseTax += 400000 * 0.05;
    } else if (newTaxable > 1200000) {
      newBaseTax += (newTaxable - 1200000) * 0.2;
      newBaseTax += 200000 * 0.15;
      newBaseTax += 300000 * 0.1;
      newBaseTax += 400000 * 0.05;
    } else if (newTaxable > 1000000) {
      newBaseTax += (newTaxable - 1000000) * 0.15;
      newBaseTax += 300000 * 0.1;
      newBaseTax += 400000 * 0.05;
    } else if (newTaxable > 700000) {
      newBaseTax += (newTaxable - 700000) * 0.1;
      newBaseTax += 400000 * 0.05;
    } else if (newTaxable > 300000) {
      newBaseTax += (newTaxable - 300000) * 0.05;
    }
    if (newTaxable <= 700000) newBaseTax = 0;
    const newTotalTax = newBaseTax * 1.04;

    const oldDeductions = 50000 + Math.min(150000, deduction80C) + deduction80D + hraOrHomeLoan;
    const oldTaxable = Math.max(0, annualIncome - oldDeductions);
    let oldBaseTax = 0;
    if (oldTaxable > 1000000) {
      oldBaseTax += (oldTaxable - 1000000) * 0.3;
      oldBaseTax += 500000 * 0.2;
      oldBaseTax += 250000 * 0.05;
    } else if (oldTaxable > 500000) {
      oldBaseTax += (oldTaxable - 500000) * 0.2;
      oldBaseTax += 250000 * 0.05;
    } else if (oldTaxable > 250000) {
      oldBaseTax += (oldTaxable - 250000) * 0.05;
    }
    if (oldTaxable <= 500000) oldBaseTax = 0;
    const oldTotalTax = oldBaseTax * 1.04;

    const savings = Math.abs(oldTotalTax - newTotalTax);
    const recommended = newTotalTax <= oldTotalTax ? 'New Tax Regime' : 'Old Tax Regime';

    return {
      newTaxable,
      newTotalTax,
      oldTaxable,
      oldTotalTax,
      savings,
      recommended,
    };
  }, [annualIncome, deduction80C, deduction80D, hraOrHomeLoan]);

  const sipInvestedPct = sipResult.totalValue > 0 ? (sipResult.invested / sipResult.totalValue) * 100 : 100;
  const emiPrincipalPct = emiResult.totalPayment > 0 ? (loanAmount / emiResult.totalPayment) * 100 : 100;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      <header className="pb-6 border-b border-stone-200">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-900 mb-2">
          RupeeUpdate.in Calculators
        </p>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-950">
          SIP, Loan EMI &amp; Income Tax Calculators
        </h1>
        <p className="mt-2 text-base text-stone-600 max-w-2xl">
          Apne mutual fund returns, loan EMI aur FY 2026-27 ka Income Tax aasani se calculate karein. Sliders ghumakar turant result dekhein.
        </p>

        {/* Segmented Tab Switcher */}
        <div className="mt-6 inline-flex p-1 bg-stone-100 rounded-lg border border-stone-200" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'sip'}
            onClick={() => setActiveTab('sip')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'sip' ? 'bg-white text-stone-950 shadow-sm font-semibold' : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            SIP Calculator
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'emi'}
            onClick={() => setActiveTab('emi')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'emi' ? 'bg-white text-stone-950 shadow-sm font-semibold' : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            EMI Calculator
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'tax'}
            onClick={() => setActiveTab('tax')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'tax' ? 'bg-white text-stone-950 shadow-sm font-semibold' : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            Income Tax (FY 26-27)
          </button>
        </div>
      </header>

      {/* SIP Calculator */}
      {activeTab === 'sip' && (
        <section aria-label="SIP Calculator" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 border border-stone-200 rounded-lg p-6 space-y-6 bg-white">
            <div>
              <div className="flex justify-between text-sm font-medium text-stone-900 mb-2">
                <label htmlFor="sip-monthly">Har Mahine SIP Investment</label>
                <span className="font-mono font-semibold text-emerald-900 tabular-nums">{formatINR(sipMonthly)}</span>
              </div>
              <input
                id="sip-monthly"
                type="range"
                min={500}
                max={150000}
                step={500}
                value={sipMonthly}
                onChange={(e) => setSipMonthly(Number(e.target.value))}
                className="w-full accent-emerald-900"
              />
              <div className="flex justify-between text-xs text-stone-400 mt-1">
                <span>₹500</span>
                <span>₹1,50,000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-stone-900 mb-2">
                <label htmlFor="sip-return">Expected Return Rate (Salana)</label>
                <span className="font-mono font-semibold text-emerald-900 tabular-nums">{sipReturn}%</span>
              </div>
              <input
                id="sip-return"
                type="range"
                min={1}
                max={28}
                step={0.5}
                value={sipReturn}
                onChange={(e) => setSipReturn(Number(e.target.value))}
                className="w-full accent-emerald-900"
              />
              <div className="flex justify-between text-xs text-stone-400 mt-1">
                <span>1%</span>
                <span>28%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-stone-900 mb-2">
                <label htmlFor="sip-years">Investment Samay (Saal)</label>
                <span className="font-mono font-semibold text-emerald-900 tabular-nums">{sipYears} yrs</span>
              </div>
              <input
                id="sip-years"
                type="range"
                min={1}
                max={40}
                step={1}
                value={sipYears}
                onChange={(e) => setSipYears(Number(e.target.value))}
                className="w-full accent-emerald-900"
              />
              <div className="flex justify-between text-xs text-stone-400 mt-1">
                <span>1 saal</span>
                <span>40 saal</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 border border-stone-200 rounded-lg p-6 bg-stone-50 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">
                Anumanit SIP Summary
              </h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-baseline justify-between border-b border-stone-200 pb-3">
                  <span className="text-sm text-stone-600">Kul Nivesh (Invested)</span>
                  <span className="font-mono text-base font-semibold text-stone-900 tabular-nums">
                    {formatINR(sipResult.invested)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-b border-stone-200 pb-3">
                  <span className="text-sm text-stone-600">Anumanit Munafa (Est. Gains)</span>
                  <span className="font-mono text-base font-semibold text-emerald-800 tabular-nums">
                    +{formatINR(sipResult.estReturns)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-base font-semibold text-stone-950">Kul Maturity Value</span>
                  <span className="font-mono text-2xl font-bold text-stone-950 tabular-nums">
                    {formatINR(sipResult.totalValue)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="h-3 w-full rounded-full overflow-hidden bg-emerald-800 flex">
                <div
                  className="bg-stone-400 h-full transition-all duration-150"
                  style={{ width: `${sipInvestedPct}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-stone-600">
                <span>Invested ({Math.round(sipInvestedPct)}%)</span>
                <span>Wealth Gain ({Math.round(100 - sipInvestedPct)}%)</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* EMI Calculator */}
      {activeTab === 'emi' && (
        <section aria-label="EMI Calculator" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 border border-stone-200 rounded-lg p-6 space-y-6 bg-white">
            <div>
              <div className="flex justify-between text-sm font-medium text-stone-900 mb-2">
                <label htmlFor="loan-amount">Loan Principal Amount</label>
                <span className="font-mono font-semibold text-emerald-900 tabular-nums">{formatINR(loanAmount)}</span>
              </div>
              <input
                id="loan-amount"
                type="range"
                min={100000}
                max={20000000}
                step={50000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-emerald-900"
              />
              <div className="flex justify-between text-xs text-stone-400 mt-1">
                <span>₹1 Lakh</span>
                <span>₹2 Crore</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-stone-900 mb-2">
                <label htmlFor="loan-rate">Interest Rate (Salana)</label>
                <span className="font-mono font-semibold text-emerald-900 tabular-nums">{loanRate.toFixed(2)}%</span>
              </div>
              <input
                id="loan-rate"
                type="range"
                min={6}
                max={18}
                step={0.1}
                value={loanRate}
                onChange={(e) => setLoanRate(Number(e.target.value))}
                className="w-full accent-emerald-900"
              />
              <div className="flex justify-between text-xs text-stone-400 mt-1">
                <span>6.0%</span>
                <span>18.0%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-stone-900 mb-2">
                <label htmlFor="loan-years">Loan Tenure (Saal)</label>
                <span className="font-mono font-semibold text-emerald-900 tabular-nums">{loanYears} yrs</span>
              </div>
              <input
                id="loan-years"
                type="range"
                min={1}
                max={30}
                step={1}
                value={loanYears}
                onChange={(e) => setLoanYears(Number(e.target.value))}
                className="w-full accent-emerald-900"
              />
              <div className="flex justify-between text-xs text-stone-400 mt-1">
                <span>1 saal</span>
                <span>30 saal</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 border border-stone-200 rounded-lg p-6 bg-stone-50 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">
                Repayment Summary
              </h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-baseline justify-between border-b border-stone-200 pb-3">
                  <span className="text-base font-semibold text-stone-950">Har Mahine EMI</span>
                  <span className="font-mono text-2xl font-bold text-emerald-900 tabular-nums">
                    {formatINR(emiResult.emi)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-b border-stone-200 pb-3">
                  <span className="text-sm text-stone-600">Principal Amount</span>
                  <span className="font-mono text-base font-semibold text-stone-900 tabular-nums">
                    {formatINR(loanAmount)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-b border-stone-200 pb-3">
                  <span className="text-sm text-stone-600">Kul Byaj (Total Interest)</span>
                  <span className="font-mono text-base font-semibold text-stone-900 tabular-nums">
                    {formatINR(emiResult.totalInterest)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-sm font-medium text-stone-700">Kul Bhugtan (Total Payment)</span>
                  <span className="font-mono text-lg font-bold text-stone-950 tabular-nums">
                    {formatINR(emiResult.totalPayment)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="h-3 w-full rounded-full overflow-hidden bg-amber-700 flex">
                <div
                  className="bg-emerald-900 h-full transition-all duration-150"
                  style={{ width: `${emiPrincipalPct}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-stone-600">
                <span>Principal ({Math.round(emiPrincipalPct)}%)</span>
                <span>Interest ({Math.round(100 - emiPrincipalPct)}%)</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Income Tax Calculator */}
      {activeTab === 'tax' && (
        <section aria-label="Income Tax Calculator" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 border border-stone-200 rounded-lg p-6 space-y-5 bg-white">
            <div>
              <label htmlFor="tax-income" className="block text-sm font-medium text-stone-900 mb-1.5">
                Salana Gross Salary / Income (₹)
              </label>
              <input
                id="tax-income"
                type="number"
                min={0}
                step={25000}
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md font-mono text-sm text-stone-950 focus:outline-2 focus:outline-emerald-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="tax-80c" className="block text-sm font-medium text-stone-900 mb-1.5">
                  Section 80C (Max ₹1.5L)
                </label>
                <input
                  id="tax-80c"
                  type="number"
                  min={0}
                  max={150000}
                  step={5000}
                  value={deduction80C}
                  onChange={(e) => setDeduction80C(Math.min(150000, Math.max(0, Number(e.target.value))))}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md font-mono text-sm text-stone-950 focus:outline-2 focus:outline-emerald-900"
                />
              </div>

              <div>
                <label htmlFor="tax-80d" className="block text-sm font-medium text-stone-900 mb-1.5">
                  Section 80D Health Ins.
                </label>
                <input
                  id="tax-80d"
                  type="number"
                  min={0}
                  max={100000}
                  step={5000}
                  value={deduction80D}
                  onChange={(e) => setDeduction80D(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md font-mono text-sm text-stone-950 focus:outline-2 focus:outline-emerald-900"
                />
              </div>
            </div>

            <div>
              <label htmlFor="tax-hra" className="block text-sm font-medium text-stone-900 mb-1.5">
                HRA Exemption / Home Loan Interest 24(b) / NPS
              </label>
              <input
                id="tax-hra"
                type="number"
                min={0}
                step={10000}
                value={hraOrHomeLoan}
                onChange={(e) => setHraOrHomeLoan(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md font-mono text-sm text-stone-950 focus:outline-2 focus:outline-emerald-900"
              />
            </div>

            <p className="text-xs text-stone-500">
              Ismein Standard Deduction (New Regime mein ₹75,000; Old Regime mein ₹50,000) aur 4% Health &amp; Education Cess shamil hai.
            </p>
          </div>

          <div className="lg:col-span-6 border border-stone-200 rounded-lg p-6 bg-stone-50 space-y-5">
            <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">
              FY 2026-27 Tax Regime Tulna (Comparison)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-stone-200 rounded-md p-4 space-y-2">
                <div className="text-xs font-semibold text-emerald-900">New Tax Regime</div>
                <div className="font-mono text-2xl font-bold text-stone-950 tabular-nums">
                  {formatINR(taxResult.newTotalTax)}
                </div>
                <div className="text-xs text-stone-500 font-mono tabular-nums">
                  Taxable: {formatINR(taxResult.newTaxable)}
                </div>
              </div>

              <div className="bg-white border border-stone-200 rounded-md p-4 space-y-2">
                <div className="text-xs font-semibold text-stone-600">Old Tax Regime</div>
                <div className="font-mono text-2xl font-bold text-stone-950 tabular-nums">
                  {formatINR(taxResult.oldTotalTax)}
                </div>
                <div className="text-xs text-stone-500 font-mono tabular-nums">
                  Taxable: {formatINR(taxResult.oldTaxable)}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200">
              <div className="text-sm font-medium text-stone-900">
                Kam Tax Wala Option:{' '}
                <span className="font-bold text-emerald-900">{taxResult.recommended}</span>
              </div>
              <p className="text-xs text-stone-600 mt-1 font-mono tabular-nums">
                Salana tax bachat (Estimated difference): {formatINR(taxResult.savings)}
              </p>
            </div>
          </div>
        </section>
      )}

      <p className="text-xs text-stone-500 border-t border-stone-200 pt-4">
        Soochna: Calculator ke results sirf planning estimate hain. ITR filing ke liye apne Chartered Accountant se salah zaroor lein.
      </p>
    </main>
  );
}
