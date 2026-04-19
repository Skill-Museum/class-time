import { todayKey, DAY_LABELS } from "../utils/helpers";
import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

export default function Header() {
    const now = new Date();
    const todayFull = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const today = todayKey();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <div className="flex items-center gap-3">
                    {/* Logo mark */}
                    <div className="w-10 h-10 rounded-2xl bg-linear-to-br flex items-center justify-center shadow-lg shadow-orange-500/25 shrink-0">
                        {/* <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6V4m0 2a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m-6 8a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4
                    m0 4v2m0-6V4m6 6v10m6-2a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V4"
                            />
                        </svg> */}
                        <img src="/Skill-Museum.png" alt="Logo" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight transition-colors">
                            SMaRC{" "}
                            <span className="text-cyan-600 dark:text-cyan-400">
                                ClassTime
                            </span>
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">
                            Schedule Viewer
                        </p>
                    </div>
                </div>

                {/* Theme toggle moved to header logo row for mobile convenience if we wanted, but let's keep it in the controls area and just let it wrap or display at the end. Actually, a better mobile layout distributes the content. */}
            </div>

            {/* Controls & Date */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <button
                    onClick={toggleTheme}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-200/50 dark:bg-white/5 
            hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-all border border-slate-300/50 dark:border-white/10"
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Current day badge */}
                <div className="flex items-center gap-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-3 py-2 shadow-sm dark:shadow-none transition-colors">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
                    <span className="text-xs text-slate-600 dark:text-slate-400 hidden sm:inline font-medium transition-colors">
                        {todayFull}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 sm:hidden font-medium transition-colors">
                        {DAY_LABELS[today]},{" "}
                        {now.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                </div>
            </div>
        </header>
    );
}
