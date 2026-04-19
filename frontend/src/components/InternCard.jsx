import {
    formatTime,
    duration,
    stringToHsl,
    isSlotLive,
} from "../utils/helpers";
import InternAvatar from "./InternAvatar";
import { DEPT_COLORS } from "../utils/helpers";
import { ChevronRight, PartyPopper } from "lucide-react";
import { useLiveTime } from "../hooks/useLiveTime";

export default function InternCard({ intern, slots, isToday, onClick }) {
    const now = useLiveTime();
    const deptStyle = DEPT_COLORS[intern.department] || {
        bg: "bg-slate-500/20",
        text: "text-slate-300",
        border: "border-slate-500/30",
    };

    const hasClass = slots && slots.length > 0;

    return (
        <div
            onClick={() => onClick(intern)}
            className="group relative bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/8 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20
        rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:scale-[1.01]
        shadow-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 active:scale-[0.99]"
        >
            {/* Top row */}
            <div className="flex items-center gap-3 mb-3">
                <InternAvatar intern={intern} size="md" />
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                        {intern.name}
                    </h3>
                    <span
                        className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium
              border ${deptStyle.bg} ${deptStyle.text} ${deptStyle.border}`}
                    >
                        {intern.department}
                    </span>
                </div>
            </div>

            {/* Arrow icon */}
            <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ChevronRight
                    size={18}
                    className="text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform"
                />
            </div>

            {/* Class slots */}
            {hasClass ? (
                <div className="flex flex-col gap-2 mt-2">
                    {slots.map((slot, i) => {
                        const slotColor = stringToHsl(
                            `${intern.id}-${i}`,
                            65,
                            50,
                        );
                        const isLive =
                            isToday && isSlotLive(slot.start, slot.end, now);
                        return (
                            <div
                                key={i}
                                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium border transition-colors
                  ${
                      isLive
                          ? "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30"
                          : "bg-slate-50 dark:bg-[#0a1122]/50 border-slate-200 dark:border-white/5 group-hover:bg-slate-100 dark:group-hover:bg-white/5 group-hover:border-slate-300 dark:group-hover:border-white/10"
                  }`}
                            >
                                {isLive ? (
                                    <div className="relative flex h-2.5 w-2.5 flex-shrink-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                    </div>
                                ) : (
                                    <div
                                        className="w-2 h-2 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: slotColor }}
                                    />
                                )}

                                <span
                                    className={
                                        isLive
                                            ? "text-red-600 dark:text-red-400 font-bold"
                                            : "text-slate-900 dark:text-white"
                                    }
                                >
                                    {formatTime(slot.start)}
                                </span>
                                <span
                                    className={
                                        isLive
                                            ? "text-red-400 dark:text-red-500/50"
                                            : "text-slate-400 dark:text-slate-500"
                                    }
                                >
                                    →
                                </span>
                                <span
                                    className={
                                        isLive
                                            ? "text-red-600 dark:text-red-400 font-bold"
                                            : "text-slate-900 dark:text-white"
                                    }
                                >
                                    {formatTime(slot.end)}
                                </span>

                                {isLive ? (
                                    <span className="ml-auto text-red-600 dark:text-red-500 font-bold px-2 py-0.5 bg-red-100 dark:bg-red-500/10 rounded-full animate-pulse">
                                        LIVE
                                    </span>
                                ) : (
                                    <span className="ml-auto text-slate-500">
                                        {duration(slot.start, slot.end)}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div
                    className="flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-medium text-amber-500/80
          bg-amber-500/10 border border-amber-500/20 mt-2"
                >
                    <PartyPopper size={18} className="text-amber-400" />
                    <span>Free day! No classes.</span>
                </div>
            )}

            {/* Class count & Total duration footer */}
            {hasClass && (
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3">
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-full">
                        {slots.length}{" "}
                        {slots.length === 1 ? "class" : "classes"}
                    </span>
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                        {duration(
                            slots.reduce(
                                (min, s) => (s.start < min ? s.start : min),
                                slots[0].start,
                            ),
                            slots.reduce(
                                (max, s) => (s.end > max ? s.end : max),
                                slots[0].end,
                            ),
                        )}
                    </span>
                </div>
            )}
        </div>
    );
}
