import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { ARTICLES, IPO_WATCHLIST } from '../data/editorialData';
import { Article, DeskCategory, SubCategory } from '../types';
import { EditorialImage } from './EditorialImage';

interface CategoryViewProps {
  desk: DeskCategory;
  initialSubCategory?: SubCategory | null;
  onSelectArticle: (article: Article) => void;
}

const DESK_META: Record<
  DeskCategory,
  {
    description: string;
    subCategories: SubCategory[];
  }
> = {
  'Personal Finance': {
    description:
      'Actionable reporting on Income Tax slabs, EPFO passbook & withdrawal rules, RBI banking rates, and credit card disclosures.',
    subCategories: ['Tax', 'PF / EPFO', 'Banking', 'Credit Cards'],
  },
  'IPO & Market': {
    description:
      'Mainboard & SME IPO calendars, indicative Grey Market Premium (GMP) updates, and quarterly corporate earnings coverage.',
    subCategories: ['Upcoming IPOs', 'GMP Tracker', 'Quarterly Results'],
  },
  'Sarkari Yojana': {
    description:
      'Verified guides on PM Mudra Loans, Udyam MSME credit guarantees, and central or state welfare subsidy schemes.',
    subCategories: ['Mudra Loan', 'MSME', 'Central Schemes', 'State Schemes'],
  },
};

export function CategoryView({ desk, initialSubCategory = null, onSelectArticle }: CategoryViewProps) {
  const [selectedSub, setSelectedSub] = useState<SubCategory | 'All'>(initialSubCategory ?? 'All');

  useEffect(() => {
    setSelectedSub(initialSubCategory ?? 'All');
  }, [desk, initialSubCategory]);

  const meta = DESK_META[desk];
  const deskArticles = ARTICLES.filter((a) => a.desk === desk);
  const filteredArticles =
    selectedSub === 'All' ? deskArticles : deskArticles.filter((a) => a.subCategory === selectedSub);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* Desk Header & Filter Segmented Bar */}
      <header className="pb-6 border-b border-stone-200 space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-900 mb-2">
            RupeeUpdate.in Editorial Desk
          </p>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-950">
            {desk}
          </h1>
          <p className="mt-2 text-base text-stone-600 max-w-3xl leading-relaxed">
            {meta.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label={`${desk} topics`}>
          <button
            type="button"
            role="tab"
            aria-selected={selectedSub === 'All'}
            onClick={() => setSelectedSub('All')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedSub === 'All'
                ? 'bg-emerald-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All {desk}
          </button>
          {meta.subCategories.map((sub) => (
            <button
              key={sub}
              type="button"
              role="tab"
              aria-selected={selectedSub === sub}
              onClick={() => setSelectedSub(sub)}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedSub === sub
                  ? 'bg-emerald-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </header>

      {/* IPO Watchlist Table shown on IPO & Market desk */}
      {desk === 'IPO & Market' && (selectedSub === 'All' || selectedSub === 'Upcoming IPOs' || selectedSub === 'GMP Tracker') && (
        <section aria-labelledby="ipo-desk-table" className="border border-stone-200 rounded-lg overflow-hidden bg-white">
          <div className="px-5 py-3.5 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2">
            <h2 id="ipo-desk-table" className="font-sans text-sm font-semibold text-stone-950">
              Mainboard &amp; SME IPO Calendar with Indicative GMP
            </h2>
            <span className="text-xs text-stone-500">Updated Nov 22, 2026</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-xs text-stone-500 bg-stone-50/50">
                  <th className="py-3 px-5 font-semibold">Issuer Company</th>
                  <th className="py-3 px-4 font-semibold">Board</th>
                  <th className="py-3 px-4 font-semibold">Issue Window</th>
                  <th className="py-3 px-4 font-semibold text-right">Price Band</th>
                  <th className="py-3 px-4 font-semibold text-right">Lot Size</th>
                  <th className="py-3 px-4 font-semibold text-right">GMP (Unofficial)</th>
                  <th className="py-3 px-5 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {IPO_WATCHLIST.map((ipo) => (
                  <tr key={ipo.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-5 font-medium text-stone-950">{ipo.company}</td>
                    <td className="py-3.5 px-4 text-xs text-stone-600">{ipo.segment}</td>
                    <td className="py-3.5 px-4 text-xs text-stone-600 whitespace-nowrap">{ipo.dates}</td>
                    <td className="py-3.5 px-4 text-right font-mono text-xs tabular-nums text-stone-900">
                      {ipo.priceBand}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-xs tabular-nums text-stone-700">
                      {ipo.lotSize}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-xs font-semibold tabular-nums text-emerald-800">
                      {ipo.gmpValue} ({ipo.estGainPct})
                    </td>
                    <td className="py-3.5 px-5 text-right text-xs font-medium text-stone-700 whitespace-nowrap">
                      {ipo.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-2.5 bg-stone-50 border-t border-stone-200 text-xs text-stone-500">
            Disclaimer: Grey Market Premium (GMP) is unregulated and shown solely for educational market context. RupeeUpdate.in is not SEBI-registered.
          </div>
        </section>
      )}

      {/* Filtered Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="py-12 text-center border border-stone-200 rounded-lg bg-stone-50">
          <p className="text-sm text-stone-600">No stories matched this filter right now.</p>
          <button
            type="button"
            onClick={() => setSelectedSub('All')}
            className="mt-3 text-xs font-semibold text-emerald-900 hover:underline"
          >
            Show all {desk} briefings
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article key={article.id} className="flex flex-col justify-between pb-6 border-b border-stone-200 group">
              <div>
                <button
                  type="button"
                  onClick={() => onSelectArticle(article)}
                  className="block w-full aspect-[4/3] overflow-hidden rounded-md border border-stone-200 bg-stone-100 mb-4"
                >
                  <EditorialImage
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                  />
                </button>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                  <span className="font-semibold text-emerald-900">{article.subCategory}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectArticle(article)}
                  className="text-left block"
                >
                  <h2 className="font-editorial text-xl font-semibold text-stone-950 leading-snug group-hover:text-emerald-900 transition-colors">
                    {article.title}
                  </h2>
                </button>
                <p className="mt-2.5 text-sm text-stone-600 leading-relaxed line-clamp-3">
                  {article.deck}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
                <span>By {article.author}</span>
                <button
                  type="button"
                  onClick={() => onSelectArticle(article)}
                  className="inline-flex items-center gap-1 font-semibold text-emerald-900 hover:text-emerald-950"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
