import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Header({ activeCategory, onCategoryChange, onBack }) {
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'firmware', label: 'Firmware & IoT' },
    { id: 'embedded', label: 'Embedded Systems' },
    { id: 'web', label: 'Web Software' },
    { id: 'education', label: 'Education & Journey' },
  ];

  const handleNavClick = (catId) => {
    onCategoryChange(catId);
    onBack(); // Go back to grid if viewing an article
  };

  return (
    <header className="header-wrapper">
      <div className="magazine-container">
        {/* Brand details */}
        <div className="flex flex-col items-center justify-center border-b border-cyan-950/5 pb-6 mb-4 select-none">
          <h1 
            onClick={onBack}
            className="brand-title cursor-pointer hover:opacity-80 transition-opacity"
          >
            DARSHAN’S NOTES
          </h1>
          <p className="brand-subtitle">
            The Tech Journals of an Embedded Systems & Firmware Engineer
          </p>
        </div>

        {/* Categories navigation & Social Icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <nav className="flex flex-wrap justify-center gap-1">
            {categories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleNavClick(cat.id)}
                  className={`px-3 py-1.5 font-sans text-xs font-bold tracking-wider uppercase transition-colors rounded ${active ? 'bg-teal-500/10 text-teal-600' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4 text-slate-400">
            <a 
              href="https://www.linkedin.com/in/darshank123/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-teal-600 transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a 
              href="https://github.com/31darsh" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-teal-600 transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a 
              href="https://share.google/iTYL0XvZgfDPGX6m1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-teal-600 transition-colors"
              title="Google Share Link"
            >
              <ExternalLink className="w-4.5 h-4.5" />
            </a>
            <a 
              href="mailto:darshank9036@gmail.com" 
              className="hover:text-teal-600 transition-colors"
              title="Email"
            >
              <Mail className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
