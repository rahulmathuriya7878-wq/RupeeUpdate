import { NavSection } from '../types';

interface FooterProps {
  onNavigate: (section: NavSection) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-stone-200">
          {/* Editorial Identity & Non-SEBI Summary */}
          <div className="md:col-span-5 space-y-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="font-editorial text-2xl font-bold tracking-tight text-stone-950 hover:text-emerald-900 transition-colors"
            >
              RupeeUpdate.in
            </button>
            <p className="text-sm text-stone-600 leading-relaxed max-w-md">
              Independent Indian personal finance news desk jahan aapko income tax rules, EPFO updates,
              banking rates, IPO &amp; GMP tracking, aur central/state Sarkari Yojana briefings milti hain.
            </p>
            <p className="text-xs text-stone-500 leading-relaxed max-w-md">
              Notice: RupeeUpdate.in ek informational news publication hai aur yeh{' '}
              <strong className="font-semibold text-stone-700">SEBI-registered investment advisor nahi hai</strong>.
              Kisi bhi investment se pehle certified financial planner se salah zaroor lein.
            </p>
          </div>

          {/* Coverage Desks */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">
              News Desks
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="text-stone-700 hover:text-emerald-900 transition-colors"
                >
                  Home Front Page
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('personal-finance')}
                  className="text-stone-700 hover:text-emerald-900 transition-colors"
                >
                  Personal Finance (Tax, EPFO, Banking)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('ipo-market')}
                  className="text-stone-700 hover:text-emerald-900 transition-colors"
                >
                  IPO &amp; Market (Upcoming IPOs, GMP)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('sarkari-yojana')}
                  className="text-stone-700 hover:text-emerald-900 transition-colors"
                >
                  Sarkari Yojana (Mudra, MSME)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('calculators')}
                  className="text-stone-700 hover:text-emerald-900 transition-colors"
                >
                  Calculators (SIP, EMI, Income Tax)
                </button>
              </li>
            </ul>
          </div>

          {/* Mandatory Essential Pages */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">
              Essential Pages (AdSense Ready)
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="text-stone-700 hover:text-emerald-900 transition-colors"
                >
                  About Us (Hmare Bare Me)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="text-stone-700 hover:text-emerald-900 transition-colors"
                >
                  Contact Us (Sampark Karein)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('privacy')}
                  className="text-stone-700 hover:text-emerald-900 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('disclaimer')}
                  className="text-stone-700 hover:text-emerald-900 transition-colors font-medium"
                >
                  Disclaimer (Non-SEBI Notice)
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 RupeeUpdate.in. All editorial rights reserved.</p>
          <p>Educational aur informational news purposes ke liye.</p>
        </div>
      </div>
    </footer>
  );
}
