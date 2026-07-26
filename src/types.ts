export type AdviceType = "Career" | "Relationships" | "Motivation" | "General";

export interface AdviceHistoryItem {
  id: string;
  question: string;
  advice: string;
  adviceType: AdviceType;
  timestamp: string;
}

export interface SampleQuestion {
  category: AdviceType;
  label: string;
  question: string;
}
