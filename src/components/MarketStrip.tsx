import { MARKET_METRICS } from '../data/editorialData';

export function MarketStrip() {
  return (
    <div className="bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-6 overflow-x-auto">
        <div className="flex items-center gap-6 text-xs whitespace-nowrap">
          {MARKET_METRICS.map((metric) => (
            <div key={metric.label} className="flex items-center gap-2 shrink-0">
              <span className="font-semibold text-stone-600">{metric.label}:</span>
              <span className="font-mono font-medium text-stone-950 tabular-nums">{metric.value}</span>
              <span
                className={`font-mono tabular-nums ${
                  metric.direction === 'up'
                    ? 'text-emerald-800'
                    : metric.direction === 'down'
                      ? 'text-rose-700'
                      : 'text-stone-500'
                }`}
              >
                ({metric.change})
              </span>
            </div>
          ))}
        </div>
        <div className="hidden xl:block text-xs text-stone-500 whitespace-nowrap shrink-0">
          Edition: India · Updated Nov 22, 2026
        </div>
      </div>
    </div>
  );
}
