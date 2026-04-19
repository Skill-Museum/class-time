import React from "react";

export default function SkeletonCard() {
    return (
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 w-full h-40 animate-pulse flex flex-col justify-between shadow-sm dark:shadow-none">
            {/* Top half */}
            <div className="flex gap-3">
                {/* Avatar skeleton */}
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700/50 flex-shrink-0" />

                {/* Name and dept skeleton */}
                <div className="flex flex-col gap-2 flex-1 pt-1">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded-md w-3/4" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-700/50 rounded-full w-1/3" />
                </div>
            </div>

            {/* Footer skeleton */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded-full w-16" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded-md w-12" />
            </div>
        </div>
    );
}
