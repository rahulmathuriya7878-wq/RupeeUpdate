import { useEffect } from 'react';
import { Article } from '../types';

export function useDynamicMetadata(article: Article | null) {
  useEffect(() => {
    if (!article) return;

    const originalTitle = document.title;
    document.title = `${article.title} — RupeeUpdate.in`;

    const updateMetaTag = (property: string, content: string, isName = false) => {
      const selector = isName ? `meta[name="${property}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (isName) {
          element.setAttribute('name', property);
        } else {
          element.setAttribute('property', property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMetaTag('description', article.deck, true);
    updateMetaTag('og:title', `${article.title} — RupeeUpdate.in`);
    updateMetaTag('og:description', article.deck);
    updateMetaTag('og:image', article.image);
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', `${article.title} — RupeeUpdate.in`, true);
    updateMetaTag('twitter:description', article.deck, true);

    return () => {
      document.title = originalTitle;
    };
  }, [article]);
}
