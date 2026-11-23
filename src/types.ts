export type NavSection =
  | 'home'
  | 'personal-finance'
  | 'ipo-market'
  | 'sarkari-yojana'
  | 'calculators'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'disclaimer';

export type DeskCategory = 'Personal Finance' | 'IPO & Market' | 'Sarkari Yojana';

export type SubCategory =
  | 'Tax'
  | 'PF / EPFO'
  | 'Banking'
  | 'Credit Cards'
  | 'Upcoming IPOs'
  | 'GMP Tracker'
  | 'Quarterly Results'
  | 'Mudra Loan'
  | 'MSME'
  | 'Central Schemes'
  | 'State Schemes';

export interface KeyFigure {
  label: string;
  value: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  deck: string;
  desk: DeskCategory;
  subCategory: SubCategory;
  author: string;
  publishedAt: string;
  readTime: string;
  image: string;
  imageCaption: string;
  isLead?: boolean;
  isFeatured?: boolean;
  keyFigures: KeyFigure[];
  body: string[];
}

export interface IpoWatchItem {
  id: string;
  company: string;
  segment: 'Mainboard' | 'SME';
  dates: string;
  priceBand: string;
  lotSize: number;
  gmpValue: string;
  estGainPct: string;
  status: 'Open' | 'Upcoming' | 'Allotment Out';
}

export interface MarketMetric {
  label: string;
  value: string;
  change: string;
  direction: 'up' | 'down' | 'neutral';
}
