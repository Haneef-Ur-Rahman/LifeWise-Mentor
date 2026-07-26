import React, { useEffect, useState } from "react";
import { Compass, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { MENTOR_QUOTES } from "../data/sampleQuestions";

export const LoadingSkeleton: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % MENTOR_QUOTES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 sm:p-10 rounded-2xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/50 to-teal-50/30 text-center shadow-sm"
    >
      <div className="relative inline-flex items-center justify-center mb-5">
        <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center animate-pulse shadow-lg shadow-emerald-600/30">
          <Compass className="w-8 h-8 stroke-[2]" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-xs">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        Consulting LifeWise Mentor...
      </h3>
      
      <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto italic transition-opacity duration-500">
        "{MENTOR_QUOTES[quoteIndex]}"
      </p>

      {/* Animated bars */}
      <div className="mt-6 max-w-sm mx-auto space-y-2">
        <div className="h-2 bg-emerald-200/60 rounded-full w-full animate-pulse" />
        <div className="h-2 bg-emerald-200/40 rounded-full w-4/5 mx-auto animate-pulse" />
        <div className="h-2 bg-emerald-200/20 rounded-full w-3/5 mx-auto animate-pulse" />
      </div>
    </motion.div>
  );
};
