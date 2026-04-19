export default function SearchBar({ value, onChange, freeOnly, onToggleFree }) {
    return (
        <div className="flex gap-2 items-center">
            {/* Search input */}
            <div className="relative flex-1">
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Search intern..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10
            text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500/50
            focus:bg-slate-50 dark:focus:bg-white/8 transition-all duration-200 shadow-sm dark:shadow-none"
                />
                {value && (
                    <button
                        onClick={() => onChange("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* Free-day toggle */}
            <button
                onClick={onToggleFree}
                title="Show interns with no class today"
                className={[
                    "flex-shrink-0 flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold",
                    "border transition-all duration-200",
                    freeOnly
                        ? "bg-amber-500 text-white border-amber-400 shadow-lg shadow-amber-500/30 scale-105"
                        : "bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white shadow-sm dark:shadow-none",
                ].join(" ")}
            >
                <span>🎉</span>
                <span className="hidden sm:inline">Free</span>
            </button>
        </div>
    );
}
