import { useState } from 'react';
import { Article, NavSection, SubCategory } from './types';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { CategoryView } from './components/CategoryView';
import { CalculatorsView } from './components/CalculatorsView';
import { ArticleDetailView } from './components/ArticleDetailView';
import { EssentialPageView } from './components/EssentialPageView';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavigate = (section: NavSection, subCategory?: SubCategory) => {
    setActiveSection(section);
    setActiveSubCategory(subCategory ?? null);
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (selectedArticle) {
      return (
        <ArticleDetailView
          article={selectedArticle}
          onBack={() => setSelectedArticle(null)}
          onSelectArticle={handleSelectArticle}
          onNavigate={handleNavigate}
        />
      );
    }

    switch (activeSection) {
      case 'home':
        return (
          <HomeView
            onSelectArticle={handleSelectArticle}
            onNavigate={handleNavigate}
          />
        );
      case 'personal-finance':
        return (
          <CategoryView
            desk="Personal Finance"
            initialSubCategory={activeSubCategory}
            onSelectArticle={handleSelectArticle}
          />
        );
      case 'ipo-market':
        return (
          <CategoryView
            desk="IPO & Market"
            initialSubCategory={activeSubCategory}
            onSelectArticle={handleSelectArticle}
          />
        );
      case 'sarkari-yojana':
        return (
          <CategoryView
            desk="Sarkari Yojana"
            initialSubCategory={activeSubCategory}
            onSelectArticle={handleSelectArticle}
          />
        );
      case 'calculators':
        return <CalculatorsView />;
      case 'about':
      case 'contact':
      case 'privacy':
      case 'disclaimer':
        return <EssentialPageView page={activeSection} onNavigate={handleNavigate} />;
      default:
        return (
          <HomeView
            onSelectArticle={handleSelectArticle}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-950">
      <Header
        activeSection={activeSection}
        onNavigate={(section) => handleNavigate(section)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <div className="flex-1">{renderContent()}</div>

      <Footer onNavigate={(section) => handleNavigate(section)} />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectArticle={handleSelectArticle}
        onNavigate={(section) => handleNavigate(section)}
      />
    </div>
  );
}
