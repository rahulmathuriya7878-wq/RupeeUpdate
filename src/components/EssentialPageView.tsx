import { useState, FormEvent } from 'react';
import { CheckCircle2, Mail, MapPin } from 'lucide-react';
import { NavSection } from '../types';

interface EssentialPageViewProps {
  page: 'about' | 'contact' | 'privacy' | 'disclaimer';
  onNavigate: (section: NavSection) => void;
}

export function EssentialPageView({ page, onNavigate }: EssentialPageViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Editorial Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      {/* Page Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-6 mb-8 border-b border-stone-200">
        {(
          [
            { id: 'about', label: 'About Us' },
            { id: 'contact', label: 'Contact Us' },
            { id: 'privacy', label: 'Privacy Policy' },
            { id: 'disclaimer', label: 'Disclaimer' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onNavigate(tab.id)}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              page === tab.id
                ? 'bg-emerald-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {page === 'about' && (
        <article className="space-y-6">
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
              Editorial Mission
            </p>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-950">
              About Us — RupeeUpdate.in
            </h1>
          </header>

          <div className="space-y-5 text-base text-stone-700 leading-relaxed max-w-prose">
            <p>
              <strong>RupeeUpdate.in</strong> ek independent Indian personal finance aur public
              policy news portal hai jo complex financial rules ko aasaan Hinglish aur clear bhasha me
              samjhata hai.
            </p>
            <p>
              Hmare editorial desks tin mukhya pillars par focus karte hain jo Indian households,
              salaried professionals aur small business owners ke liye zaroori hain:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Personal Finance:</strong> Income tax regime breakdowns, EPFO passbook aur
                withdrawal process, RBI banking policies, aur credit card updates.
              </li>
              <li>
                <strong>IPO &amp; Market:</strong> Mainboard aur SME IPO calendars, indicative Grey
                Market Premium (GMP) sentiment, aur quarterly corporate earnings reviews.
              </li>
              <li>
                <strong>Sarkari Yojana:</strong> PM Mudra Loans, Udyam MSME benefits, aur central ya
                state welfare schemes ke verified step-by-step guides.
              </li>
            </ul>
            <p>
              RupeeUpdate.in par publish hone wali har khabar ko Reserve Bank of India (RBI), Income
              Tax India, EPFO, SEBI filings aur official <code>.gov.in</code> portals ke mutabiq
              cross-check kiya jata hai.
            </p>
          </div>
        </article>
      )}

      {page === 'contact' && (
        <section className="space-y-8">
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
              Reader Desk
            </p>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-950">
              Contact Us (Sampark Karein)
            </h1>
            <p className="text-base text-stone-600 max-w-2xl">
              Koi correction hai, press release bhejni hai ya calculators par feedback dena hai? Aap
              seedhe hmare editorial desk se sampark kar sakte hain.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 border border-stone-200 rounded-lg p-6 bg-white">
              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-800 mx-auto" />
                  <h2 className="font-editorial text-xl font-bold text-stone-950">
                    Message Mil Gaya Hai
                  </h2>
                  <p className="text-sm text-stone-600 max-w-sm mx-auto">
                    RupeeUpdate.in se sampark karne ke liye shukriya. Hmari team 2 business days ke
                    andar aapke message ko review karegi.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-950 rounded-md transition-colors"
                  >
                    Ek Aur Message Bhejein
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-stone-900 mb-1">
                      Pura Naam (Full Name)
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Rajesh Sharma"
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md text-sm text-stone-950 focus:outline-2 focus:outline-emerald-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-stone-900 mb-1">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md text-sm text-stone-950 focus:outline-2 focus:outline-emerald-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-topic" className="block text-sm font-medium text-stone-900 mb-1">
                      Subject / Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md text-sm text-stone-950 bg-white focus:outline-2 focus:outline-emerald-900"
                    >
                      <option>Editorial Feedback</option>
                      <option>Fact Check / Correction</option>
                      <option>Calculator Suggestion</option>
                      <option>Advertising &amp; Partnerships</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-msg" className="block text-sm font-medium text-stone-900 mb-1">
                      Aapka Message
                    </label>
                    <textarea
                      id="contact-msg"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Apne query ke details yahan likhein..."
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md text-sm text-stone-950 focus:outline-2 focus:outline-emerald-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-950 rounded-md transition-colors"
                  >
                    Message Bhejein
                  </button>
                </form>
              )}
            </div>

            <aside className="md:col-span-5 space-y-5">
              <div className="border border-stone-200 rounded-lg p-5 bg-stone-50 space-y-4">
                <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">
                  Newsroom Contact Details
                </h2>
                <div className="flex items-start gap-3 text-sm text-stone-700">
                  <Mail className="w-4 h-4 text-emerald-900 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-stone-900">Editorial &amp; Corrections</div>
                    <div className="text-stone-600">editorial@rupeeupdate.in</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm text-stone-700">
                  <MapPin className="w-4 h-4 text-emerald-900 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-stone-900">Office Address</div>
                    <div className="text-stone-600">
                      RupeeUpdate Digital Media, Connaught Place, New Delhi – 110001
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Note: Hum email par koi personalized stock tips ya paid investment advice provide nahi karte hain.
              </p>
            </aside>
          </div>
        </section>
      )}

      {page === 'privacy' && (
        <article className="space-y-6">
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
              Legal &amp; Compliance
            </p>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-950">
              Privacy Policy
            </h1>
            <p className="text-xs text-stone-500">Effective Date: November 2026</p>
          </header>

          <div className="space-y-5 text-base text-stone-700 leading-relaxed max-w-prose">
            <p>
              <strong>RupeeUpdate.in</strong> par aane wale har visitor ki privacy hmare liye behad
              zaroori hai. Yeh Privacy Policy batati hai ki hum kaunsi information collect karte hain aur
              uska kaise use hota hai.
            </p>
            <h2 className="font-editorial text-xl font-bold text-stone-950 pt-2">
              1. Log Files &amp; Analytics
            </h2>
            <p>
              Baaki standard websites ki tarah, RupeeUpdate.in standard server log files use karta hai
              jisme browser type, ISP, date/time stamp, aur traffic trends shamil hain taaki site ki
              speed aur security maintain ki ja sake.
            </p>
            <h2 className="font-editorial text-xl font-bold text-stone-950 pt-2">
              2. Google AdSense &amp; Cookies
            </h2>
            <p>
              Google jaise third-party vendors cookies (jaise DART cookie) ka use karte hain taaki
              users ko RupeeUpdate.in ya other sites par unke visit ke adhar par ads dikhaye ja sakein.
              Aap Google Ads settings se personalization off kar sakte hain.
            </p>
            <h2 className="font-editorial text-xl font-bold text-stone-950 pt-2">
              3. Financial Calculators
            </h2>
            <p>
              Hmare SIP, EMI, aur Tax calculators aapke browser me locally run hote hain. RupeeUpdate.in
              aapka koi bhi salary ya loan data external servers par store nahi karta hai.
            </p>
          </div>
        </article>
      )}

      {page === 'disclaimer' && (
        <article className="space-y-6">
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
              Mandatory Regulatory Disclosure
            </p>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-950">
              Disclaimer (Non-SEBI Registered Notice)
            </h1>
          </header>

          <div className="p-5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 leading-relaxed">
            <strong>Important Notice:</strong> RupeeUpdate.in ek independent news aur educational
            information portal hai. <strong>Hum SEBI-registered investment advisor nahi hain</strong>,
            na hi research analyst ya tax consultant hain.
          </div>

          <div className="space-y-5 text-base text-stone-700 leading-relaxed max-w-prose">
            <h2 className="font-editorial text-xl font-bold text-stone-950 pt-1">
              1. No Financial Advice
            </h2>
            <p>
              Hmare sabhi articles, market summaries, tax comparisons, aur calculators sirf
              educational aur informational purposes ke liye hain. Kuch bhi buy, sell ya hold karne ki
              financial advice nahi hai.
            </p>
            <h2 className="font-editorial text-xl font-bold text-stone-950 pt-1">
              2. IPO Grey Market Premium (GMP) Disclaimer
            </h2>
            <p>
              IPO GMP figures unofficial aur unregulated market sentiment par adharit hain. SEBI ya
              stock exchanges ka isse koi lena-dena nahi hai. Apply karne se pehle company ka official
              RHP zaroor padhein aur SEBI-registered advisor se salah lein.
            </p>
          </div>
        </article>
      )}
    </main>
  );
}
