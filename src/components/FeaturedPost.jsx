import React from 'react';
import { Clock, BookOpen } from 'lucide-react';

export default function FeaturedPost({ article, onReadArticle }) {
  if (!article) return null;

  return (
    <div className="featured-box">
      {/* Visual background block */}
      <div className="bg-slate-900 min-h-[260px] md:min-h-full flex flex-col justify-between p-8 relative overflow-hidden select-none text-slate-400">
        {/* Subtle schematic elements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10">
          <span className="font-mono text-[10px] text-teal-400 font-bold uppercase tracking-widest border border-teal-500/30 px-2 py-0.5 rounded">
            FEATURED PROJECT ARCHIVE
          </span>
        </div>

        <div className="relative z-10 flex flex-col gap-2 mt-8 md:mt-0">
          <p className="font-mono text-slate-500 text-[10px]">REGISTER ADDRESS: 0x00A0</p>
          <p className="font-mono text-slate-500 text-[10px]">CPU: ESP32-WROOM-32D Dual-Core</p>
          <p className="font-mono text-teal-400 text-[10px] animate-pulse">STATUS: TELEMETRY_LINK_ONLINE</p>
        </div>
      </div>

      {/* Article text details */}
      <div className="p-8 md:p-10 flex flex-col gap-4 justify-center">
        <div>
          <span className="category-tag">{article.category}</span>
          <h2 
            onClick={() => onReadArticle(article.id)}
            className="title-serif text-2xl md:text-3xl lg:text-4xl hover:text-teal-600 transition-colors cursor-pointer"
          >
            {article.title}
          </h2>
        </div>

        <p className="text-editorial text-sm md:text-base">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
          <button 
            onClick={() => onReadArticle(article.id)}
            className="btn-editorial btn-editorial-brand"
          >
            <BookOpen className="w-4 h-4" />
            Read Case Study
          </button>
          
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span>{article.date}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
