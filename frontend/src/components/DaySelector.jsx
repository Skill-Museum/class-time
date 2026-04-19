import { DAYS, DAY_LABELS, todayKey } from "../utils/helpers";
import { startOfWeek, addDays, format, isSameDay } from "date-fns";
import { motion } from "framer-motion";

export default function DaySelector({ selectedDay, onSelect }) {
    const today = todayKey();

    // Calculate specific dates for the current week starting Sunday
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 0 }); // 0 = Sunday

    return (
        <div className="flex sm:grid sm:grid-cols-7 justify-between gap-1 sm:gap-2 pb-2 pt-1 w-full">
            {DAYS.map((day, i) => {
                const isToday = day === today;
                const isSelected = day === selectedDay;
                const dateObj = addDays(weekStart, i);
                const dayNumber = format(dateObj, "d");
                const isPast =
                    dateObj < new Date(now.setHours(0, 0, 0, 0)) && !isToday;

                return (
                    <button
                        key={day}
                        onClick={() => onSelect(day)}
                        className="relative flex-1 min-w-0 sm:min-w-[60px] flex flex-col items-center justify-center
              h-14 sm:h-[4.5rem] rounded-xl sm:rounded-2xl transition-all duration-300 focus:outline-none group overflow-hidden"
                    >
                        {/* Animated Active Background */}
                        {isSelected && (
                            <motion.div
                                layoutId="activeDay"
                                className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 rounded-xl sm:rounded-2xl"
                                initial={false}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30,
                                }}
                            />
                        )}

                        {/* Default background (visible when not selected) */}
                        {!isSelected && (
                            <div
                                className={`absolute inset-0 rounded-xl sm:rounded-2xl border transition-colors duration-300
                ${isToday ? "bg-cyan-50 dark:bg-white/10 border-cyan-200 dark:border-white/20" : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 group-hover:bg-slate-50 dark:group-hover:bg-white/10"}`}
                            />
                        )}

                        {/* Content Container */}
                        <div
                            className={`relative z-10 flex flex-col items-center gap-0 sm:gap-0.5 ${isPast ? "opacity-60" : "opacity-100"}`}
                        >
                            <span
                                className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors
                ${isSelected ? "text-white/90" : isToday ? "text-cyan-600 dark:text-cyan-400" : "text-slate-500 dark:text-slate-400"}`}
                            >
                                {DAY_LABELS[day].substring(0, 3)}
                            </span>

                            <span
                                className={`text-base sm:text-xl font-black tracking-tighter transition-colors
                ${isSelected ? "text-white" : "text-slate-900 dark:text-slate-200"}`}
                            >
                                {dayNumber}
                            </span>

                            {/* Today Indicator Dot */}
                            {isToday && (
                                <span
                                    className={`w-1.5 h-1.5 mt-0.5 rounded-full
                  ${isSelected ? "bg-white" : "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"}`}
                                />
                            )}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
