import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { AdviceForm } from "./components/AdviceForm";
import { AdviceCard } from "./components/AdviceCard";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { AdviceHistory } from "./components/AdviceHistory";
import { AdviceType, AdviceHistoryItem } from "./types";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<{
    id: string;
    question: string;
    advice: string;
    adviceType: AdviceType;
    timestamp: string;
  } | null>(null);

  const [history, setHistory] = useState<AdviceHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem("lifewise_advice_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("lifewise_advice_history", JSON.stringify(history));
    } catch (err) {
      console.error("Failed to save history:", err);
    }
  }, [history]);

  const handleGetAdvice = async (question: string, adviceType: AdviceType) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, adviceType }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reach LifeWise Mentor.");
      }

      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newItem: AdviceHistoryItem = {
        id: Date.now().toString(),
        question,
        advice: data.advice,
        adviceType,
        timestamp,
      };

      setCurrentResult(newItem);
      setHistory((prev) => [newItem, ...prev.slice(0, 19)]); // Keep last 20
    } catch (err: any) {
      console.error("API error:", err);
      setError(err.message || "An error occurred while getting advice. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistoryItem = (item: AdviceHistoryItem) => {
    setCurrentResult(item);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("lifewise_advice_history");
    } catch (err) {
      console.error("Failed to clear local storage:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900 pb-16">
      {/* Background ambient accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Top Branding Header */}
        <Header />

        {/* Form Container */}
        <main className="space-y-8">
          <AdviceForm onSubmit={handleGetAdvice} isLoading={isLoading} />

          {/* Error Banner */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">Unable to fetch advice</p>
                <p className="mt-0.5 text-rose-700">{error}</p>
                <button
                  onClick={() => setError(null)}
                  type="button"
                  className="mt-2 text-xs font-semibold text-rose-800 hover:underline inline-flex items-center space-x-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Dismiss</span>
                </button>
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && <LoadingSkeleton />}

          {/* Active Advice Result Card */}
          {currentResult && !isLoading && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 px-1">
                Mentor Advice
              </h2>
              <AdviceCard
                question={currentResult.question}
                advice={currentResult.advice}
                adviceType={currentResult.adviceType}
                timestamp={currentResult.timestamp}
              />
            </div>
          )}

          {/* History Drawer */}
          <AdviceHistory
            history={history}
            onSelect={handleSelectHistoryItem}
            onClear={handleClearHistory}
          />
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-slate-400 space-y-1">
          <p>LifeWise Mentor • Practical wisdom for career, relationships, and motivation.</p>
          <p className="text-slate-400/80">Always consult healthcare professionals for medical or emergency concerns.</p>
        </footer>
      </div>
    </div>
  );
}
