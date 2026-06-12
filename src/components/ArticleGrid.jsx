import React, { useState } from 'react';
import { Search, Clock, ArrowRight } from 'lucide-react';

export default function ArticleGrid({ articles, onReadArticle, activeCategory }) {
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Filter by Category
  const categoryFiltered = articles.filter((art) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'firmware') return art.tag === 'FIRMWARE';
    if (activeCategory === 'embedded') return art.tag === 'EMBEDDED';
    if (activeCategory === 'web') return art.tag === 'WEB CODE';
    if (activeCategory === 'education') return art.tag === 'JOURNAL';
    return true;
  });

  // 2. Filter by Search Query
  const searchedArticles = categoryFiltered.filter((art) => {
    const query = searchQuery.toLowerCase();
    return (
      art.title.toLowerCase().includes(query) ||
      art.excerpt.toLowerCase().includes(query) ||
      art.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Sub-header with search input */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <h3 className="font-tech text-sm font-extrabold uppercase tracking-widest text-slate-800">
          Recent Journals & Chronicles
        </h3>
        
        {/* Search Box */}
        <div className="relative w-full sm:w-[260px] select-none">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search logs & journals..."
            className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-teal-500 font-sans"
          />
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      {/* Grid listing */}
      {searchedArticles.length === 0 ? (
        <div className="text-center py-12 text-slate-400 font-serif">
          No journals or logs match your active filter.
        </div>
      ) : (
        <div className="editorial-grid">
          {searchedArticles.map((art) => {
            const Icon = art.icon;
            return (
              <article key={art.id} className="magazine-card">
                <div className="magazine-card-content">
                  {/* Category */}
                  <span className="category-tag">{art.category}</span>
                  
                  {/* Title */}
                  <h3 
                    onClick={() => onReadArticle(art.id)}
                    className="title-serif text-lg mb-3 hover:text-teal-600 transition-colors cursor-pointer"
                  >
                    {art.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-editorial text-xs mb-6 leading-relaxed flex-grow">
                    {art.excerpt}
                  </p>
                  
                  {/* Meta Footer */}
                  <div className="meta-row select-none">
                    <span className="font-mono">{art.date}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      <span>{art.readTime}</span>
                    </div>
                    
                    <button 
                      onClick={() => onReadArticle(art.id)}
                      className="ml-auto flex items-center gap-1 font-sans font-bold text-[10px] text-teal-600 hover:text-teal-800 transition-colors uppercase tracking-wider cursor-pointer"
                    >
                      Read
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
