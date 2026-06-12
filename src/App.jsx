import React, { useState } from 'react';
import Header from './components/Header';
import FeaturedPost from './components/FeaturedPost';
import ArticleGrid from './components/ArticleGrid';
import ArticleView from './components/ArticleView';
import AboutSection from './components/AboutSection';
import Bookshelf from './components/Bookshelf';
import NewsletterContact from './components/NewsletterContact';
import { articles } from './data/articles';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const handleReadArticle = (id) => {
    setSelectedArticleId(id);
  };

  const handleBackToGrid = () => {
    setSelectedArticleId(null);
  };

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
  };

  // Find featured and list articles
  const featuredArticle = articles.find((a) => a.featured);
  
  // Articles in the list should exclude the featured article when showing 'all'
  // to avoid duplication, but filter normally for specific categories
  const gridArticles = articles.filter((a) => {
    if (activeCategory === 'all') {
      return !a.featured;
    }
    return true;
  });

  const activeArticle = articles.find((a) => a.id === selectedArticleId);

  return (
    <>
      {/* Sticky Magazine Header */}
      <Header 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
        onBack={handleBackToGrid} 
      />

      <main className="magazine-container">
        {selectedArticleId ? (
          /* Single Article Reader View */
          <ArticleView 
            article={activeArticle} 
            onBack={handleBackToGrid} 
          />
        ) : (
          /* Magazine Homepage Grid View */
          <>
            {/* Featured Post (only on 'all' or 'firmware') */}
            {(activeCategory === 'all' || activeCategory === 'firmware') && (
              <FeaturedPost 
                article={featuredArticle} 
                onReadArticle={handleReadArticle} 
              />
            )}

            {/* List Grid */}
            <ArticleGrid 
              articles={gridArticles} 
              onReadArticle={handleReadArticle} 
              activeCategory={activeCategory} 
            />

            {/* Biography & Shelf Sections */}
            <AboutSection />
            <Bookshelf />
          </>
        )}

        {/* Newsletter Subscription Contact Block */}
        <NewsletterContact />
      </main>

      {/* Clean Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 mt-12 select-none">
        <div className="magazine-container text-center flex flex-col gap-3">
          <p className="font-serif text-lg font-bold text-slate-800">DARSHAN’S NOTES</p>
          <p className="font-sans text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Darshan K. All rights reserved. Designed and compiled in Embedded C & React.
          </p>
          <p className="font-mono text-[9px] text-slate-300">
            SYSTEM_UPTIME: OK // BUS: SHIELDED // TELEMETRY: LINKED
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
