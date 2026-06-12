import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { bookshelf } from '../data/articles';

export default function Bookshelf() {
  return (
    <section id="bookshelf" className="border-t border-slate-200 pt-12 pb-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 select-none">
          <BookOpen className="w-5 h-5 text-teal-600" />
          <h3 className="font-tech text-sm font-extrabold uppercase tracking-widest text-slate-800">
            On My Tech Shelf
          </h3>
        </div>
        <p className="text-editorial text-sm md:text-base leading-relaxed">
          Inspired by Bill Gates' book recommendations, here are the core textbooks, software manuals, and hardware references that guide my design decisions and daily coding practices.
        </p>

        {/* Book list grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {bookshelf.map((book, bIdx) => (
            <div key={bIdx} className="bg-white border border-slate-200 p-6 rounded flex flex-col justify-between gap-4">
              <div>
                <span className="font-mono text-[9px] text-teal-600 font-bold uppercase tracking-wider block mb-1">
                  {book.category}
                </span>
                <h4 className="title-serif text-base font-bold text-slate-800 leading-snug">
                  {book.title}
                </h4>
                <p className="font-sans text-xs text-slate-400 mt-1 italic">
                  by {book.author}
                </p>
                <p className="text-xs text-slate-600 font-sans leading-relaxed mt-4">
                  "{book.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 select-none">
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-bold text-[10px] text-teal-600 hover:text-teal-800 transition-colors uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Resource
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
