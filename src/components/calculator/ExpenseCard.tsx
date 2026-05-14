import React from "react";

interface ExpenseCardProps {
  title: string;
  description: string;
  examples: string[];
  helperWarning?: string;
  children: React.ReactNode;
}

export default function ExpenseCard({
  title,
  description,
  examples,
  helperWarning,
  children,
}: ExpenseCardProps) {
  return (
    <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50/60 p-4 md:p-5">
      <h3 className="text-base font-semibold text-slate-950 mb-1">{title}</h3>
      <p className="text-sm text-slate-600 mb-2">{description}</p>
      {examples.length > 0 && (
        <ul className="text-xs text-slate-500 mb-3 list-disc list-inside space-y-0.5">
          {examples.map((example, i) => (
            <li key={i}>{example}</li>
          ))}
        </ul>
      )}
      {helperWarning && (
        <p className="text-xs text-amber-700 bg-amber-50 rounded-md px-3 py-2 mb-3">
          {helperWarning}
        </p>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  );
}
