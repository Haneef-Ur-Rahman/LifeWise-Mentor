import React, { useState } from "react";
import { Briefcase, Heart, Zap, Compass, Copy, Check, Quote, Bookmark, BookmarkCheck } from "lucide-react";
import { motion } from "motion/react";
import { AdviceType } from "../types";

interface AdviceCardProps {
  question: string;
  advice: string;
  adviceType: AdviceType;
  timestamp?: string;
  onSave?: () => void;
  isSaved?: boolean;
}

const CATEGORY_CONFIG: Record<
  AdviceType,
  {
    icon: React.ElementType;
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    gradient: string;
  }
> = {
  Career: {
    icon: Briefcase,
    bg: "bg-blue-50/60",
    border: "border-blue-200/80",
    text: "text-blue-700",
    badgeBg: "bg-blue-100/80",
    badgeText: "text-blue-800",
    gradient: "from-blue-600 to-indigo-600",
  },
  Relationships: {
    icon: Heart,
    bg: "bg-rose-50/60",
    border: "border-rose-200/80",
    text: "text-rose-700",
    badgeBg: "bg-rose-100/80",
    badgeText: "text-rose-800",
    gradient: "from-rose-500 to-pink-600",
  },
  Motivation: {
    icon: Zap,
    bg: "bg-amber-50/60",
    border: "border-amber-200/80",
    text: "text-amber-700",
    badgeBg: "bg-amber-100/80",
    badgeText: "text-amber-800",
    gradient: "from-amber-500 to-orange-600",
  },
  General: {
    icon: Compass,
    bg: "bg-emerald-50/60",
    border: "border-emerald-200/80",
    text: "text-emerald-700",
    badgeBg: "bg-emerald-100/80",
    badgeText: "text-emerald-800",
    gradient: "from-emerald-600 to-teal-600",
  },
};

export const AdviceCard: React.FC<AdviceCardProps> = ({
  question,
  advice,
  adviceType,
  timestamp,
  onSave,
  isSaved = false,
}) => {
  const [copied, setCopied] = useState(false);

  const config = CATEGORY_CONFIG[adviceType] || CATEGORY_CONFIG.General;
  const CategoryIcon = config.icon;

  const handleCopy = async () => {
    try {
      const copyText = `Question: ${question}\n\nMentor Advice (${adviceType}):\n${advice}`;
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error("Failed to copy advice:", err);
    }
  };

  // Format advice into structured paragraphs
  const paragraphs = advice
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`relative rounded-2xl border ${config.border} bg-white shadow-lg shadow-slate-200/50 overflow-hidden text-slate-800`}
    >
      {/* Top Banner accent */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${config.gradient}`} />

      <div className="p-6 sm:p-8">
        {/* Header row */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-5 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl ${config.badgeBg} ${config.text} flex items-center justify-center shrink-0 shadow-xs`}>
              <CategoryIcon className="w-5 h-5" />
            </div>
            <div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.badgeBg} ${config.badgeText}`}>
                {adviceType} Advice
              </span>
              {timestamp && <p className="text-xs text-slate-400 mt-0.5">{timestamp}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {onSave && (
              <button
                onClick={onSave}
                type="button"
                className={`p-2 rounded-xl text-xs font-medium border transition-colors flex items-center space-x-1.5 ${
                  isSaved
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
                title={isSaved ? "Saved to history" : "Save advice"}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4" />}
                <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
              </button>
            )}

            <button
              onClick={handleCopy}
              type="button"
              id="copy-advice-button"
              className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200 shadow-xs active:scale-95 ${
                copied
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-emerald-200"
                  : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy Advice</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* User Question callout */}
        <div className="mt-5 mb-6 p-4 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-start space-x-3 text-slate-700">
          <Quote className="w-4 h-4 text-slate-400 shrink-0 mt-0.5 rotate-180" />
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Your Question</p>
            <p className="text-sm sm:text-base italic text-slate-800 font-medium leading-relaxed">{question}</p>
          </div>
        </div>

        {/* Advice Content Body */}
        <div className="space-y-4 text-slate-800 leading-relaxed text-sm sm:text-base">
          {paragraphs.map((paragraph, index) => {
            // If paragraph looks like bullet points
            if (paragraph.includes("\n- ") || paragraph.includes("\n* ") || paragraph.startsWith("- ") || paragraph.startsWith("1.")) {
              const lines = paragraph.split("\n");
              return (
                <div key={index} className="space-y-2">
                  {lines.map((line, lIdx) => {
                    const trimmed = line.trim();
                    if (/^[-*•]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
                      const cleanText = trimmed.replace(/^([-*•]|\d+\.)\s+/, "");
                      return (
                        <div key={lIdx} className="flex items-start space-x-2.5 pl-2">
                          <span className={`w-2 h-2 rounded-full ${config.text} bg-current mt-2 shrink-0`} />
                          <p className="text-slate-800 font-normal">{cleanText}</p>
                        </div>
                      );
                    }
                    return <p key={lIdx} className="font-normal text-slate-800">{line}</p>;
                  })}
                </div>
              );
            }

            return (
              <p key={index} className="font-normal text-slate-800 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Mentor sign-off footer */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium text-slate-600">LifeWise Mentor</span>
          <span>Psychologist & Career Coach perspective</span>
        </div>
      </div>
    </motion.div>
  );
};
