import React from "react";
import { SearchX, PartyPopper } from "lucide-react";

export default function EmptyState({ isFreeFilter, onClear }) {
    const Icon = isFreeFilter ? PartyPopper : SearchX;
    const title = isFreeFilter ? "Everyone is busy!" : "No interns found";
    const description = isFreeFilter
        ? "There are no free interns on this day with your current layout filters."
        : "We couldn't find any interns matching your search and department filter.";

    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center h-full">
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-black/5 dark:shadow-black/20 transition-colors">
                <Icon
                    size={40}
                    className={
                        isFreeFilter
                            ? "text-amber-500"
                            : "text-slate-400 dark:text-slate-500"
                    }
                    strokeWidth={1.5}
                />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">
                {title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8 leading-relaxed transition-colors">
                {description}
            </p>

            {onClear && (
                <button
                    onClick={onClear}
                    className="px-6 py-2.5 bg-cyan-500/10 text-cyan-400 font-semibold rounded-full border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                    Clear filters
                </button>
            )}
        </div>
    );
}
