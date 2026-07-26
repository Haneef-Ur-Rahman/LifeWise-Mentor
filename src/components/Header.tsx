import React from "react";
import { Compass, Sparkles } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 sm:mb-12">
      <div className="inline-flex items-center justify-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 mb-4 text-xs sm:text-sm font-medium tracking-wide shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
        <span>20+ Years Psychologist & Career Coach Perspective</span>
      </div>

      <div className="flex items-center justify-center space-x-3 mb-3">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
          <Compass className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
          LifeWise <span className="text-emerald-700">Mentor</span>
        </h1>
      </div>

      <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
        Wise, practical, and actionable guidance tailored to your specific situation.
      </p>
    </header>
  );
};
