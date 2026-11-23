import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { ARTICLES, IPO_WATCHLIST } from '../data/editorialData';
import { Article, NavSection } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onNavigate: (section: NavSection) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  onSelectArticle,
  onNavigate,
}: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();
  const matchedArticles = q
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.deck.toLowerCase().includes(q) ||
          a.desk.toLowerCase().includes(q) ||
          a.subCategory.toLowerCase().includes(q)
      )
    : ARTICLES.slice(0, 4);

  const matchedIpos = q
    ? IPO_WATCHLIST.filter(
        (i) => i.company.toLowerCase().includes(q) || i.segment.toLowerCase().includes(q)
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-xs flex items-start justify-center pt-16 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="RupeeUpdate.in Search"
    >
      <div className="w-full max-w-2xl bg-white border border-stone-200 rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-200">
          <Search className="w-4 h-4 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="EPFO, Tax, Mudra Loan, GMP ya IPO search karein..."
            className="w-full text-sm text-stone-950 placeholder:text-stone-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Search band karein"
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-5">
          {matchedIpos.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                IPO Watchlist Results
              </div>
              <div className="divide-y divide-stone-100 border border-stone-200 rounded-md">
                {matchedIpos.map((ipo) => (
                  <button
                    key={ipo.id}
                    type="button"
                    onClick={() => {
                      onNavigate('ipo-market');
                      onClose();
                    }}
                    className="w-full px-3.5 py-2.5 text-left flex items-center justify-between hover:bg-stone-50 transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-stone-950">{ipo.company}</div>
                      <div className="text-xs text-stone-500">
                        {ipo.segment} · {ipo.dates} · Band {ipo.priceBand}
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold text-emerald-800">
                      GMP {ipo.gmpValue}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              {q ? `Matching Khabrein (${matchedArticles.length})` : 'Taaza Khabrein'}
            </div>
            {matchedArticles.length === 0 ? (
              <p className="text-sm text-stone-500 py-6 text-center">
                &ldquo;{query}&rdquo; ke liye koi khabar nahi mili. Tax, EPFO, IPO ya Mudra search karke dekhein.
              </p>
            ) : (
              <div className="divide-y divide-stone-100">
                {matchedArticles.map((art) => (
                  <button
                    key={art.id}
                    type="button"
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="w-full py-3 text-left flex items-start justify-between gap-4 hover:bg-stone-50 px-2 rounded-md transition-colors group"
                  >
                    <div>
                      <div className="text-xs text-stone-500">
                        <span className="font-semibold text-emerald-900">{art.desk}</span> ·{' '}
                        {art.subCategory} · {art.publishedAt}
                      </div>
                      <div className="font-editorial text-base font-semibold text-stone-950 group-hover:text-emerald-900 mt-0.5">
                        {art.title}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-900 shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
