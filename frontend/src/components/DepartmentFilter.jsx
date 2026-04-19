export default function DepartmentFilter({ departments, selected, onSelect }) {
    const all = ["All", ...departments];

    return (
        <div className="flex flex-wrap gap-2 pb-1">
            {all.map((dept) => {
                const isActive = selected === dept;
                const colors = {
                    Robotics: isActive
                        ? "bg-indigo-600 text-white border-indigo-500"
                        : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10",
                    "Robotic AI": isActive
                        ? "bg-violet-600 text-white border-violet-500"
                        : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10",
                    Development: isActive
                        ? "bg-teal-600 text-white border-teal-500"
                        : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10",
                    All: isActive
                        ? "bg-slate-700 dark:bg-cyan-500 text-white border-slate-600 dark:border-cyan-500"
                        : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10",
                };

                return (
                    <button
                        key={dept}
                        onClick={() => onSelect(dept)}
                        className={[
                            "flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border transition-colors duration-200",
                            colors[dept] ||
                                (isActive
                                    ? "bg-slate-700 dark:bg-cyan-500 text-white border-slate-600 dark:border-cyan-500"
                                    : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10"),
                        ].join(" ")}
                    >
                        {dept}
                    </button>
                );
            })}
        </div>
    );
}
