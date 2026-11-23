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
              About RupeeUpdate.in
            </h1>
          </header>

          <div className="space-y-5 text-base text-stone-700 leading-relaxed max-w-prose">
            <p>
              <strong>RupeeUpdate.in</strong> is an independent Indian personal finance and public
              policy news portal dedicated to explaining complex financial rules in clear, jargon-free
              language.
            </p>
            <p>
              Our editorial desks cover three core pillars that matter directly to Indian households,
              salaried professionals, and small business owners:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Personal Finance:</strong> Income tax regime breakdowns, EPFO passbook and
                withdrawal processes, RBI banking policies, and credit card disclosures.
              </li>
              <li>
                <strong>IPO &amp; Market:</strong> Mainboard and SME IPO calendars, indicative Grey
                Market Premium (GMP) sentiment tracking, and quarterly corporate earnings reviews.
              </li>
              <li>
                <strong>Sarkari Yojana:</strong> Verified step-by-step documentation guides for PM
                Mudra Yojana, Udyam MSME benefits, and Central &amp; State welfare schemes.
              </li>
            </ul>
            <p>
              Every report on RupeeUpdate.in is cross-checked against official notifications from the
              Reserve Bank of India (RBI), Income Tax India, EPFO, SEBI filings, and official{' '}
              <code>.gov.in</code> portals before publication.
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
              Contact Us
            </h1>
            <p className="text-base text-stone-600 max-w-2xl">
              Have a factual correction, press release, or feedback on our calculators? Reach out to
              our editorial desk directly.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 border border-stone-200 rounded-lg p-6 bg-white">
              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-800 mx-auto" />
                  <h2 className="font-editorial text-xl font-bold text-stone-950">
                    Message Received
                  </h2>
                  <p className="text-sm text-stone-600 max-w-sm mx-auto">
                    Thank you for contacting RupeeUpdate.in. Our editorial team reviews reader
                    submissions within 2 business days.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-950 rounded-md transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-stone-900 mb-1">
                      Full Name
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
                      Inquiry Topic
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
                      Message
                    </label>
                    <textarea
                      id="contact-msg"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share details of your query..."
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md text-sm text-stone-950 focus:outline-2 focus:outline-emerald-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-950 rounded-md transition-colors"
                  >
                    Submit Message
                  </button>
                </form>
              )}
            </div>

            <aside className="md:col-span-5 space-y-5">
              <div className="border border-stone-200 rounded-lg p-5 bg-stone-50 space-y-4">
                <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">
                  Editorial Desk Details
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
                    <div className="font-semibold text-stone-900">Newsroom Office</div>
                    <div className="text-stone-600">
                      RupeeUpdate Digital Media, Connaught Place, New Delhi – 110001
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Note: We do not offer personalized stock tips, mutual fund recommendations, or paid
                investment advisory over email.
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
              At <strong>RupeeUpdate.in</strong>, the privacy of our visitors is critically important.
              This Privacy Policy outlines the types of information collected and how it is used.
            </p>
            <h2 className="font-editorial text-xl font-bold text-stone-950 pt-2">
              1. Log Files &amp; Analytics
            </h2>
            <p>
              Like standard web publications, RupeeUpdate.in uses standard server log files recording
              non-personally identifiable details such as browser type, Internet Service Provider
              (ISP), date/time stamp, referring pages, and aggregate traffic trends to maintain site
              speed and security.
            </p>
            <h2 className="font-editorial text-xl font-bold text-stone-950 pt-2">
              2. Google AdSense &amp; Third-Party Cookies
            </h2>
            <p>
              Third-party vendors, including Google, use cookies (such as the Google DoubleClick
              DART cookie) to serve advertisements based on a user’s prior visits to RupeeUpdate.in
              or other websites on the internet. Users may opt out of personalized advertising by
              visiting Google Ads Settings.
            </p>
            <h2 className="font-editorial text-xl font-bold text-stone-950 pt-2">
              3. Financial Calculators
            </h2>
            <p>
              All calculations performed inside our SIP, EMI, and Income Tax tools run locally in
              your browser. RupeeUpdate.in does not store or transmit your salary, investment, or loan
              numbers to external servers.
            </p>
            <h2 className="font-editorial text-xl font-bold text-stone-950 pt-2">
              4. Consent
            </h2>
            <p>
              By using RupeeUpdate.in, you hereby consent to our Privacy Policy and agree to its
              terms.
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
              Disclaimer
            </h1>
          </header>

          <div className="p-5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 leading-relaxed">
            <strong>Important Notice:</strong> RupeeUpdate.in is strictly an independent news and
            educational information portal. <strong>We are NOT a SEBI-registered investment advisor</strong>,
            research analyst, stockbroker, or chartered tax consultant.
          </div>

          <div className="space-y-5 text-base text-stone-700 leading-relaxed max-w-prose">
            <h2 className="font-editorial text-xl font-bold text-stone-950 pt-1">
              1. No Investment or Financial Advice
            </h2>
            <p>
              All articles, market summaries, tax comparisons, and calculators published on
              RupeeUpdate.in are provided solely for educational and informational purposes. Nothing
              on this website constitutes a buy, sell, or hold recommendation for any equity, IPO,
              mutual fund, or fixed-income product.
            </p>
            <h2 className="font-editorial text-xl font-bold text-stone-950 pt-1">
              2. IPO Grey Market Premium (GMP) Disclaimer
            </h2>
            <p>
              Any Grey Market Premium (GMP) figures displayed on RupeeUpdate.in represent unofficial,
              unregulated over-the-counter market sentiment reported in public financial circles.
              GMP is volatile and not endorsed by SEBI, NSE, or BSE. Readers must review the
              company’s official Red Herring Prospectus (RHP) and consult a SEBI-registered
              investment advisor before applying for any IPO.
            </p>
            <h2 className="font-editorial text-xl font-bold text-stone-950 pt-1">
              3. Sarkari Yojana &amp; Policy Verification
            </h2>
            <p>
              While our editorial desk strives to cite current eligibility rules for Mudra Loans,
              Udyam MSME schemes, and central/state subsidies, government guidelines change
              periodically. Always verify final application requirements directly on official{' '}
              <code>.gov.in</code> portals or authorized scheduled bank branches.
            </p>
          </div>
        </article>
      )}
    </main>
  );
}
