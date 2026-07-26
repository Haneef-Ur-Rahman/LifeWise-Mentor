import React from "react";
import { History, Trash2, ArrowUpRight } from "lucide-react";
import { AdviceHistoryItem } from "../types";

interface AdviceHistoryProps {
  history: AdviceHistoryItem[];
  onSelect: (item: AdviceHistoryItem) => void;
  onClear: () => void;
}

export const AdviceHistory: React.FC<AdviceHistoryProps> = ({ history, onSelect, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-12 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-semibold text-slate-800">
            Session Advice History ({history.length})
          </h2>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-slate-400 hover:text-rose-600 flex items-center space-x-1 transition-colors"
          title="Clear session history"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="mt-4 space-y-3 max-h-80 overflow-y-auto pr-1">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="p-3.5 rounded-xl border border-slate-100 hover:border-emerald-200 bg-slate-50/50 hover:bg-emerald-50/40 cursor-pointer transition-all flex items-start justify-between group"
          >
            <div className="space-y-1 pr-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {item.adviceType}
                </span>
                <span className="text-xs text-slate-400">{item.timestamp}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium line-clamp-1">
                "{item.question}"
              </p>
              <p className="text-xs text-slate-500 line-clamp-1">{item.advice}</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
};
