import { ArrowRight, Calculator } from 'lucide-react';
import { ARTICLES, IPO_WATCHLIST } from '../data/editorialData';
import { Article, NavSection, SubCategory } from '../types';
import { EditorialImage } from './EditorialImage';

interface HomeViewProps {
  onSelectArticle: (article: Article) => void;
  onNavigate: (section: NavSection, subCategory?: SubCategory) => void;
}

export function HomeView({ onSelectArticle, onNavigate }: HomeViewProps) {
  const leadArticle = ARTICLES.find((a) => a.isLead) ?? ARTICLES[0];
  const featuredArticles = ARTICLES.filter((a) => a.id !== leadArticle.id && a.isFeatured).slice(0, 3);

  const personalFinanceArticles = ARTICLES.filter((a) => a.desk === 'Personal Finance');
  const ipoMarketArticles = ARTICLES.filter((a) => a.desk === 'IPO & Market');
  const sarkariArticles = ARTICLES.filter((a) => a.desk === 'Sarkari Yojana');

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-14">
      {/* Tier 1: Lead Story + Top Three Secondary Features */}
      <section aria-labelledby="front-page-heading">
        <h1 id="front-page-heading" className="sr-only">
          RupeeUpdate.in Mukhya Khabrein
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-stone-200 items-stretch">
          {/* Dominant Lead Story (7 columns) */}
          <article className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                <span className="font-semibold text-emerald-900">{leadArticle.desk}</span>
                <span aria-hidden="true">·</span>
                <span>{leadArticle.subCategory}</span>
                <span aria-hidden="true">·</span>
                <span>{leadArticle.publishedAt}</span>
                <span aria-hidden="true">·</span>
                <span>{leadArticle.readTime}</span>
              </div>

              <button
                type="button"
                onClick={() => onSelectArticle(leadArticle)}
                className="text-left group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
              >
                <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-stone-950 leading-tight group-hover:text-emerald-900 transition-colors">
                  {leadArticle.title}
                </h2>
              </button>

              <p className="mt-4 text-base text-stone-600 leading-relaxed max-w-2xl">
                {leadArticle.deck}
              </p>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => onSelectArticle(leadArticle)}
                className="block w-full aspect-video overflow-hidden rounded-lg border border-stone-200 bg-stone-100 group"
              >
                <EditorialImage
                  src={leadArticle.image}
                  alt={leadArticle.title}
                  className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-200"
                />
              </button>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
                <span>Lekhak: {leadArticle.author}</span>
                <button
                  type="button"
                  onClick={() => onSelectArticle(leadArticle)}
                  className="inline-flex items-center gap-1.5 font-semibold text-emerald-900 hover:text-emerald-950 transition-colors"
                >
                  <span>Puri Khabar Padhein</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>

          {/* Top Stories Rail (5 columns) */}
          <div className="lg:col-span-5 lg:border-l lg:border-stone-200 lg:pl-8 flex flex-col justify-between divide-y divide-stone-200">
            {featuredArticles.map((article, index) => (
              <article
                key={article.id}
                className={`${index === 0 ? 'pb-6' : index === featuredArticles.length - 1 ? 'pt-6' : 'py-6'} flex gap-4 items-start`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                    <span className="font-semibold text-emerald-900">{article.desk}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.subCategory}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectArticle(article)}
                    className="text-left group block"
                  >
                    <h3 className="font-editorial text-lg font-semibold text-stone-950 leading-snug group-hover:text-emerald-900 transition-colors">
                      {article.title}
                    </h3>
                  </button>
                  <p className="mt-2 text-xs text-stone-500">
                    {article.publishedAt} · {article.readTime}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectArticle(article)}
                  aria-label={`Padhein ${article.title}`}
                  className="w-24 sm:w-28 aspect-[4/3] shrink-0 overflow-hidden rounded-md border border-stone-200 bg-stone-100"
                >
                  <EditorialImage
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tier 2A: Personal Finance Desk */}
      <section aria-labelledby="desk-personal-finance" className="pb-12 border-b border-stone-200">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
          <div>
            <h2 id="desk-personal-finance" className="font-editorial text-2xl sm:text-3xl font-bold text-stone-950">
              Personal Finance
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Tax slabs, PF / EPFO claims, RBI banking updates, aur credit card rules
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            {(['Tax', 'PF / EPFO', 'Banking', 'Credit Cards'] as SubCategory[]).map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => onNavigate('personal-finance', sub)}
                className="text-stone-600 hover:text-emerald-900 transition-colors whitespace-nowrap"
              >
                {sub}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onNavigate('personal-finance')}
              className="inline-flex items-center gap-1 font-semibold text-emerald-900 hover:text-emerald-950 whitespace-nowrap"
            >
              <span>Sabhi Dekhein</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personalFinanceArticles.slice(0, 4).map((article) => (
            <article key={article.id} className="flex flex-col justify-between group">
              <div>
                <button
                  type="button"
                  onClick={() => onSelectArticle(article)}
                  className="block w-full aspect-[4/3] overflow-hidden rounded-md border border-stone-200 bg-stone-100 mb-3"
                >
                  <EditorialImage
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                  />
                </button>
                <div className="text-xs text-stone-500 mb-1.5">
                  <span className="font-semibold text-emerald-900">{article.subCategory}</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>{article.publishedAt}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectArticle(article)}
                  className="text-left block"
                >
                  <h3 className="font-editorial text-lg font-semibold text-stone-950 leading-snug group-hover:text-emerald-900 transition-colors">
                    {article.title}
                  </h3>
                </button>
                <p className="mt-2 text-sm text-stone-600 line-clamp-2 leading-relaxed">
                  {article.deck}
                </p>
              </div>
              <div className="mt-3 text-xs text-stone-500">
                {article.author} · {article.readTime}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tier 2B: IPO & Market Desk + Live GMP Watchlist Table */}
      <section aria-labelledby="desk-ipo-market" className="pb-12 border-b border-stone-200">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
          <div>
            <h2 id="desk-ipo-market" className="font-editorial text-2xl sm:text-3xl font-bold text-stone-950">
              IPO &amp; Market
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Upcoming mainboard &amp; SME IPOs, indicative GMP tracker, aur quarterly results
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            {(['Upcoming IPOs', 'GMP Tracker', 'Quarterly Results'] as SubCategory[]).map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => onNavigate('ipo-market', sub)}
                className="text-stone-600 hover:text-emerald-900 transition-colors whitespace-nowrap"
              >
                {sub}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onNavigate('ipo-market')}
              className="inline-flex items-center gap-1 font-semibold text-emerald-900 hover:text-emerald-950 whitespace-nowrap"
            >
              <span>Full IPO Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* IPO Articles (5 cols) */}
          <div className="lg:col-span-5 divide-y divide-stone-200">
            {ipoMarketArticles.map((article, idx) => (
              <article key={article.id} className={idx === 0 ? 'pb-5' : idx === ipoMarketArticles.length - 1 ? 'pt-5' : 'py-5'}>
                <div className="text-xs text-stone-500 mb-1">
                  <span className="font-semibold text-emerald-900">{article.subCategory}</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>{article.publishedAt}</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectArticle(article)}
                  className="text-left group block"
                >
                  <h3 className="font-editorial text-lg font-semibold text-stone-950 leading-snug group-hover:text-emerald-900 transition-colors">
                    {article.title}
                  </h3>
                </button>
                <p className="mt-1.5 text-sm text-stone-600 line-clamp-2">{article.deck}</p>
              </article>
            ))}
          </div>

          {/* Upcoming IPO & GMP Table (7 cols) */}
          <div className="lg:col-span-7">
            <div className="border border-stone-200 rounded-lg overflow-hidden bg-white">
              <div className="px-4 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between gap-4">
                <h3 className="font-sans text-sm font-semibold text-stone-900">
                  Upcoming &amp; Open IPO Watchlist
                </h3>
                <span className="text-xs text-stone-500">Indicative Unofficial GMP</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 text-xs text-stone-500 bg-stone-50/60">
                      <th className="py-2.5 px-4 font-semibold">Company</th>
                      <th className="py-2.5 px-3 font-semibold">Dates</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Price Band</th>
                      <th className="py-2.5 px-3 font-semibold text-right">GMP (Est.)</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {IPO_WATCHLIST.map((ipo) => (
                      <tr key={ipo.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-medium text-stone-950">{ipo.company}</div>
                          <div className="text-xs text-stone-500">
                            {ipo.segment} · Lot: {ipo.lotSize} shares
                          </div>
                        </td>
                        <td className="py-3 px-3 text-xs text-stone-600 whitespace-nowrap">
                          {ipo.dates}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-xs font-medium text-stone-900 tabular-nums whitespace-nowrap">
                          {ipo.priceBand}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-xs font-semibold text-emerald-800 tabular-nums whitespace-nowrap">
                          {ipo.gmpValue} ({ipo.estGainPct})
                        </td>
                        <td className="py-3 px-4 text-right text-xs font-medium text-stone-700 whitespace-nowrap">
                          {ipo.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 text-xs text-stone-500">
                Note: GMP unofficial OTC market sentiment hai. Apply karne se pehle RHP zaroor check karein.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tier 2C: Sarkari Yojana Desk */}
      <section aria-labelledby="desk-sarkari-yojana" className="pb-12 border-b border-stone-200">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
          <div>
            <h2 id="desk-sarkari-yojana" className="font-editorial text-2xl sm:text-3xl font-bold text-stone-950">
              Sarkari Yojana
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Mudra Loan limits, MSME Udyam benefits, aur Central &amp; State welfare schemes
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            {(['Mudra Loan', 'MSME', 'Central Schemes', 'State Schemes'] as SubCategory[]).map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => onNavigate('sarkari-yojana', sub)}
                className="text-stone-600 hover:text-emerald-900 transition-colors whitespace-nowrap"
              >
                {sub}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onNavigate('sarkari-yojana')}
              className="inline-flex items-center gap-1 font-semibold text-emerald-900 hover:text-emerald-950 whitespace-nowrap"
            >
              <span>Sabhi Schemes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sarkariArticles.map((article) => (
            <article key={article.id} className="flex flex-col justify-between group">
              <div>
                <button
                  type="button"
                  onClick={() => onSelectArticle(article)}
                  className="block w-full aspect-[4/3] overflow-hidden rounded-md border border-stone-200 bg-stone-100 mb-3"
                >
                  <EditorialImage
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                  />
                </button>
                <div className="text-xs text-stone-500 mb-1.5">
                  <span className="font-semibold text-emerald-900">{article.subCategory}</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>{article.publishedAt}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectArticle(article)}
                  className="text-left block"
                >
                  <h3 className="font-editorial text-lg font-semibold text-stone-950 leading-snug group-hover:text-emerald-900 transition-colors">
                    {article.title}
                  </h3>
                </button>
                <p className="mt-2 text-sm text-stone-600 line-clamp-2 leading-relaxed">
                  {article.deck}
                </p>
              </div>
              <div className="mt-3 text-xs text-stone-500">
                {article.author} · {article.readTime}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tier 3: Financial Calculators Strip */}
      <section aria-labelledby="calculators-teaser" className="bg-stone-50 border border-stone-200 rounded-lg p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 mb-2">
              <Calculator className="w-4 h-4" />
              <span>Interactive Rupee Tools</span>
            </div>
            <h2 id="calculators-teaser" className="font-editorial text-2xl font-bold text-stone-950">
              Apna SIP, Loan EMI aur FY 2026-27 Income Tax Kuch Hi Seconds Me Calculate Karein
            </h2>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              Fast, zero-clutter calculators jo specially Indian salaried taxpayers aur mutual fund investors ke liye banaye gaye hain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('calculators')}
              className="px-5 py-3 bg-white border border-stone-200 hover:border-emerald-900 rounded-md text-left transition-colors"
            >
              <div className="text-sm font-semibold text-stone-950">SIP Calculator</div>
              <div className="text-xs text-stone-500 mt-0.5">Mutual fund corpus</div>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('calculators')}
              className="px-5 py-3 bg-white border border-stone-200 hover:border-emerald-900 rounded-md text-left transition-colors"
            >
              <div className="text-sm font-semibold text-stone-950">EMI Calculator</div>
              <div className="text-xs text-stone-500 mt-0.5">Home &amp; Mudra loans</div>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('calculators')}
              className="px-5 py-3 bg-emerald-900 hover:bg-emerald-950 text-white rounded-md text-left transition-colors"
            >
              <div className="text-sm font-semibold">Tax Compare</div>
              <div className="text-xs text-emerald-100 mt-0.5">New vs Old Regime</div>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
