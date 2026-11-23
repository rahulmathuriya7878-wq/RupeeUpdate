import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ARTICLES } from '../data/editorialData';
import { Article, NavSection } from '../types';
import { EditorialImage } from './EditorialImage';
import { useDynamicMetadata } from '../hooks/useDynamicMetadata';

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
  // Use custom hook to dynamically update document title and meta tags when article changes
  useDynamicMetadata(article);

  const related = ARTICLES.filter((a) => a.id !== article.id && a.desk === article.desk).slice(0, 3);
  const recommended = ARTICLES.filter((a) => a.id !== article.id && a.subCategory === article.subCategory).slice(0, 3);
  const fallbackRecommended = recommended.length > 0 ? recommended : related;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-emerald-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Wapas News Desk Par Jayein</span>
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
            Report: <span className="font-semibold text-stone-800">{article.author}</span> · RupeeUpdate.in Editorial Desk
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
            Editorial Soochna: Yeh report sirf jankari ke liye prakashit ki gayi hai. RupeeUpdate.in SEBI-registered investment advisor ya tax consultant nahi hai.
          </div>
        </article>

        {/* Margin Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-8 lg:border-l lg:border-stone-200 lg:pl-8">
          <section>
            <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500 pb-3 border-b border-stone-200">
              {article.desk} Ki Aur Khabrein
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
              Khud Calculate Karein
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              Koi bhi faisla lene se pehle apni monthly SIP, home loan EMI ya FY 2026-27 income tax ka hisab lagayein.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('calculators')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-950 rounded-md transition-colors"
            >
              <span>Calculators Kholein</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </section>
        </aside>
      </div>

      {/* Recommended for You / Aapke Liye Sujhav Section */}
      <section aria-labelledby="recommended-heading" className="pt-10 border-t border-stone-200">
        <div className="flex items-center justify-between mb-6">
          <h2 id="recommended-heading" className="font-editorial text-2xl font-bold text-stone-950">
            Recommended For You (Aapke Liye Sujhav)
          </h2>
          <span className="text-xs text-stone-500">Related to {article.subCategory}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fallbackRecommended.map((rec) => (
            <article key={rec.id} className="flex flex-col justify-between group border border-stone-200 rounded-lg p-4 bg-white">
              <div>
                <button
                  type="button"
                  onClick={() => onSelectArticle(rec)}
                  className="block w-full aspect-[16/9] overflow-hidden rounded-md border border-stone-200 bg-stone-100 mb-3"
                >
                  <EditorialImage
                    src={rec.image}
                    alt={rec.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                  />
                </button>
                <div className="text-xs text-stone-500 mb-1.5">
                  <span className="font-semibold text-emerald-900">{rec.subCategory}</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>{rec.publishedAt}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectArticle(rec)}
                  className="text-left block"
                >
                  <h3 className="font-editorial text-base font-semibold text-stone-950 leading-snug group-hover:text-emerald-900 transition-colors">
                    {rec.title}
                  </h3>
                </button>
                <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {rec.deck}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-100">
                <span>{rec.readTime}</span>
                <button
                  type="button"
                  onClick={() => onSelectArticle(rec)}
                  className="inline-flex items-center gap-1 font-semibold text-emerald-900 hover:text-emerald-950"
                >
                  <span>Padhein</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
