import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ARTICLES } from '../data/editorialData';
import { Article, NavSection } from '../types';
import { EditorialImage } from './EditorialImage';

interface ArticleDetailViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  onNavigate: (section: NavSection) => void;
}

export function ArticleDetailView({
  article,
  onBack,
  onSelectArticle,
  onNavigate,
}: ArticleDetailViewProps) {
  const related = ARTICLES.filter((a) => a.id !== article.id && a.desk === article.desk).slice(0, 3);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-emerald-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to News Desk</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Broadsheet Reading Column (8 cols) */}
        <article className="lg:col-span-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-3">
            <span className="font-semibold text-emerald-900">{article.desk}</span>
            <span aria-hidden="true">·</span>
            <span>{article.subCategory}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[42px] font-bold text-stone-950 leading-tight">
            {article.title}
          </h1>

          <p className="mt-4 text-lg text-stone-600 leading-relaxed max-w-2xl">
            {article.deck}
          </p>

          <div className="mt-4 pb-6 border-b border-stone-200 text-xs text-stone-500">
            By <span className="font-semibold text-stone-800">{article.author}</span> · RupeeUpdate.in Editorial Desk
          </div>

          <figure className="my-6">
            <div className="aspect-video overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
              <EditorialImage
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-2 text-xs font-editorial italic text-stone-500">
              {article.imageCaption}
            </figcaption>
          </figure>

          {/* Key Figures Summary Strip */}
          {article.keyFigures.length > 0 && (
            <dl className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-5 bg-stone-50 border border-stone-200 rounded-lg">
              {article.keyFigures.map((kf) => (
                <div key={kf.label}>
                  <dt className="text-xs text-stone-500">{kf.label}</dt>
                  <dd className="mt-1 font-mono text-sm font-semibold text-stone-950 tabular-nums">
                    {kf.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {/* Editorial Prose with Subtle Drop Cap on Opening Paragraph */}
          <div className="max-w-prose space-y-5 text-base sm:text-[17px] text-stone-800 leading-[1.78]">
            {article.body.map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? 'first-letter:font-editorial first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-950'
                    : ''
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 pt-5 border-t border-stone-200 text-xs text-stone-500 leading-relaxed">
            Editorial Disclosure: This report is published for informational purposes only. RupeeUpdate.in is not a SEBI-registered investment advisor or tax practitioner.
          </div>
        </article>

        {/* Margin Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-8 lg:border-l lg:border-stone-200 lg:pl-8">
          <section>
            <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500 pb-3 border-b border-stone-200">
              More in {article.desk}
            </h2>
            <div className="divide-y divide-stone-200">
              {related.map((rel) => (
                <div key={rel.id} className="py-4">
                  <div className="text-xs text-stone-500 mb-1">
                    <span className="font-semibold text-emerald-900">{rel.subCategory}</span> · {rel.publishedAt}
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectArticle(rel)}
                    className="text-left group block"
                  >
                    <h3 className="font-editorial text-base font-semibold text-stone-950 leading-snug group-hover:text-emerald-900 transition-colors">
                      {rel.title}
                    </h3>
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="p-5 bg-stone-50 border border-stone-200 rounded-lg space-y-3">
            <h2 className="font-editorial text-lg font-bold text-stone-950">
              Run the Numbers Yourself
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              Calculate your monthly SIP maturity, home loan EMI, or FY 2026-27 income tax before making financial decisions.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('calculators')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-950 rounded-md transition-colors"
            >
              <span>Open Financial Calculators</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </section>
        </aside>
      </div>
    </main>
  );
}
