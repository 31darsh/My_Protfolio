import React, { useEffect } from 'react';
import { ArrowLeft, Clock, Download, ExternalLink } from 'lucide-react';
import { LinkedinIcon } from './Icons';

export default function ArticleView({ article, onBack }) {
  useEffect(() => {
    // Scroll to top when loading a new article
    window.scrollTo(0, 0);
  }, [article]);

  if (!article) return null;

  return (
    <div className="article-container">
      {/* Back navigation */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 mb-8 transition-colors select-none cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Articles
      </button>

      {/* Article Header */}
      <div className="article-header">
        <span className="category-tag">{article.category}</span>
        <h1 className="title-serif text-3xl md:text-4xl lg:text-5xl mt-2 mb-6">
          {article.title}
        </h1>

        {/* Author Details row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-t border-slate-200 select-none">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
              <img 
                src={`${import.meta.env.BASE_URL}profile.png`} 
                alt="Darshan K" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <p className="font-sans text-xs font-bold text-slate-800">{article.author}</p>
              <p className="font-sans text-[10px] text-slate-400">Embedded Systems & Firmware Engineer</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
            <span>{article.date}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article 
        className="article-body"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Call to action boxes in body depends on article */}
      {article.id === 'academic-journey' && (
        <div className="glass-panel p-6 bg-slate-50 border-slate-200 rounded mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
          <div>
            <h4 className="title-sans text-sm font-bold text-slate-800">Need to verify academic or certification records?</h4>
            <p className="text-xs text-slate-500 font-sans mt-1">Download my latest signed resume containing references.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a 
              href={`${import.meta.env.BASE_URL}Darshan_K_Resume_Signify.pdf`}
              download="Darshan_K_Resume.pdf"
              className="btn-editorial btn-editorial-brand flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
            <a 
              href="https://www.linkedin.com/in/darshank123/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-editorial flex-shrink-0"
            >
              <LinkedinIcon className="w-4 h-4" />
              LinkedIn Link
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
