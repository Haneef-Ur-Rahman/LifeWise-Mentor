import React, { useState } from "react";
import { Send, Briefcase, Heart, Zap, Compass, Sparkles, AlertCircle, HelpCircle } from "lucide-react";
import { AdviceType } from "../types";
import { SAMPLE_QUESTIONS } from "../data/sampleQuestions";

interface AdviceFormProps {
  onSubmit: (question: string, adviceType: AdviceType) => void;
  isLoading: boolean;
}

const ADVICE_TYPES: { type: AdviceType; label: string; icon: React.ElementType; description: string }[] = [
  { type: "General", label: "General", icon: Compass, description: "Holistic, balanced perspective for life challenges" },
  { type: "Career", label: "Career", icon: Briefcase, description: "Specific steps for promotion, conflict, burnout, or job shifts" },
  { type: "Relationships", label: "Relationships", icon: Heart, description: "Empathy & action steps for friends, family, or partners" },
  { type: "Motivation", label: "Motivation", icon: Zap, description: "Powerful reminders & anti-procrastination mindset" },
];

export const AdviceForm: React.FC<AdviceFormProps> = ({ onSubmit, isLoading }) => {
  const [question, setQuestion] = useState("");
  const [adviceType, setAdviceType] = useState<AdviceType>("General");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setError("Please describe what's on your mind or select an example question.");
      return;
    }
    setError(null);
    onSubmit(question.trim(), adviceType);
  };

  const handleSelectSample = (sampleQuestion: string, category: AdviceType) => {
    setQuestion(sampleQuestion);
    setAdviceType(category);
    setError(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-100 p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Text Input */}
        <div>
          <label htmlFor="question-input" className="block text-sm font-semibold text-slate-800 mb-2 flex items-center justify-between">
            <span>What's your question or problem?</span>
            <span className="text-xs font-normal text-slate-400">{question.length}/500</span>
          </label>
          <div className="relative">
            <textarea
              id="question-input"
              rows={4}
              maxLength={500}
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. How do I navigate asking for a raise after taking on extra projects? Or how do I overcome feeling burnt out?"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-800 text-sm sm:text-base placeholder:text-slate-400 resize-none transition-all outline-none"
              disabled={isLoading}
            />
          </div>
          {error && (
            <p className="mt-2 text-xs sm:text-sm text-rose-600 flex items-center space-x-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </p>
          )}
        </div>

        {/* Dropdown for Advice Type Selection */}
        <div>
          <label htmlFor="advice-type-select" className="block text-sm font-semibold text-slate-800 mb-2">
            Select Advice Focus Area
          </label>
          <div className="relative">
            <select
              id="advice-type-select"
              value={adviceType}
              onChange={(e) => setAdviceType(e.target.value as AdviceType)}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm sm:text-base font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none cursor-pointer appearance-none shadow-xs"
            >
              {ADVICE_TYPES.map((item) => (
                <option key={item.type} value={item.type}>
                  {item.label} — {item.description}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          id="get-advice-button"
          disabled={isLoading}
          className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white text-sm sm:text-base flex items-center justify-center space-x-2 transition-all shadow-md active:scale-[0.99] ${
            isLoading
              ? "bg-emerald-400 cursor-not-allowed opacity-90"
              : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 hover:shadow-emerald-600/30"
          }`}
        >
          {isLoading ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>Seeking Mentor Advice...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Get Advice</span>
            </>
          )}
        </button>
      </form>

      {/* Sample Question Prompts */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="flex items-center space-x-2 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>Need inspiration? Try a sample question:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {SAMPLE_QUESTIONS.map((sq, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSample(sq.question, sq.category)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 transition-colors text-left"
            >
              <span className="font-medium text-emerald-700 mr-1">[{sq.category}]</span>
              {sq.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
