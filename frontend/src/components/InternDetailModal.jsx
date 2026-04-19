import { createPortal } from "react-dom";
import { useEffect } from "react";
import InternAvatar from "./InternAvatar";
import {
    DAYS,
    DAY_LABELS,
    formatTime,
    duration,
    stringToHsl,
    todayKey,
    isSlotLive,
} from "../utils/helpers";
import { DEPT_COLORS } from "../utils/helpers";
import { X, CalendarDays, Clock, PartyPopper } from "lucide-react";
import { useLiveTime } from "../hooks/useLiveTime";

export default function InternDetailModal({ intern, schedule, onClose }) {
    const today = todayKey();
    const now = useLiveTime();

    // Close on Escape key
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    // Prevent body scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const deptStyle = DEPT_COLORS[intern.department] || {
        bg: "bg-slate-500/20",
        text: "text-slate-300",
        border: "border-slate-500/30",
    };

    const internSchedule = schedule?.[intern.id] || {};
    const totalClasses = DAYS.reduce(
        (acc, d) => acc + (internSchedule[d]?.length || 0),
        0,
    );

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal panel */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-full sm:max-w-lg bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-white/10
          rounded-t-3xl sm:rounded-3xl shadow-2xl shadow-black/20 dark:shadow-black/50 max-h-[90vh] overflow-y-auto transition-colors"
            >
                {/* Drag handle (mobile) */}
                <div className="flex justify-center pt-3 pb-1 sm:hidden">
                    <div className="w-10 h-1 bg-slate-300 dark:bg-white/20 rounded-full" />
                </div>

                {/* Header */}
                <div className="flex items-center gap-4 px-6 pt-4 pb-5 border-b border-slate-200 dark:border-white/10 transition-colors">
                    <InternAvatar intern={intern} size="lg" />
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">
                            {intern.name}
                        </h2>
                        <span
                            className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium
              border ${deptStyle.bg} ${deptStyle.text} ${deptStyle.border}`}
                        >
                            {intern.department}
                        </span>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 transition-colors">
                            {totalClasses}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wide">
                            classes/wk
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/5
              hover:bg-cyan-50 dark:hover:bg-cyan-500/20 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 focus:outline-none transition-all"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Weekly schedule grid */}
                <div className="px-6 py-4 space-y-3">
                    <div className="flex items-center gap-2 mb-4 text-slate-500 dark:text-slate-400 transition-colors">
                        <CalendarDays size={18} strokeWidth={2} />
                        <h3 className="text-xs font-semibold uppercase tracking-wider">
                            Full Weekly Schedule
                        </h3>
                    </div>
                    {DAYS.map((day) => {
                        const slots = internSchedule[day] || [];
                        const isToday = day === today;

                        return (
                            <div
                                key={day}
                                className={[
                                    "rounded-2xl p-3 border transition-all",
                                    isToday
                                        ? "bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/30"
                                        : "bg-white dark:bg-white/3 border-slate-200 dark:border-white/8 shadow-sm dark:shadow-none",
                                ].join(" ")}
                            >
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span
                                        className={`text-xs font-bold uppercase tracking-wider transition-colors
                    ${isToday ? "text-cyan-600 dark:text-cyan-400" : "text-slate-500 dark:text-slate-400"}`}
                                    >
                                        {DAY_LABELS[day]}
                                    </span>
                                    {isToday && (
                                        <span className="text-[10px] bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30 px-2 py-0.5 rounded-full font-bold transition-colors">
                                            Today
                                        </span>
                                    )}
                                    {slots.length === 0 && (
                                        <span className="ml-auto text-xs text-slate-500 font-medium flex items-center gap-1.5">
                                            <PartyPopper
                                                size={14}
                                                className="text-amber-500/70"
                                            />
                                            Free
                                        </span>
                                    )}
                                </div>

                                {slots.length > 0 ? (
                                    <div className="flex flex-wrap gap-1.5">
                                        {slots.map((slot, i) => {
                                            const col = stringToHsl(
                                                `${intern.id}-${day}-${i}`,
                                                65,
                                                55,
                                            );
                                            const isLive =
                                                isToday &&
                                                isSlotLive(
                                                    slot.start,
                                                    slot.end,
                                                    now,
                                                );
                                            return (
                                                <div
                                                    key={i}
                                                    className={`flex items-center gap-2 flex-grow sm:flex-grow-0 px-3 py-2 rounded-xl text-xs border transition-colors
                            ${isLive ? "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30" : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10"}`}
                                                >
                                                    {isLive ? (
                                                        <div className="relative flex h-2 w-2">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                                                            style={{
                                                                backgroundColor:
                                                                    col,
                                                            }}
                                                        />
                                                    )}
                                                    <span
                                                        className={`${isLive ? "text-red-600 dark:text-red-400 font-bold" : "text-slate-900 dark:text-white font-medium"} flex-1 whitespace-nowrap transition-colors`}
                                                    >
                                                        {formatTime(slot.start)}{" "}
                                                        – {formatTime(slot.end)}
                                                    </span>

                                                    {isLive && (
                                                        <span className="text-[10px] text-red-600 dark:text-red-500 font-bold px-1.5 py-0.5 bg-red-100 dark:bg-red-500/10 rounded-md animate-pulse ml-1 transition-colors">
                                                            LIVE
                                                        </span>
                                                    )}

                                                    <span
                                                        className={`${isLive ? "text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10" : "text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-[#0a1122] border-slate-200 dark:border-white/5"} px-2 py-0.5 rounded-md flex items-center gap-1.5 border font-semibold transition-colors`}
                                                    >
                                                        <Clock
                                                            size={12}
                                                            className="opacity-70"
                                                        />
                                                        {duration(
                                                            slot.start,
                                                            slot.end,
                                                        )}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-xs text-slate-600 pl-1">
                                        No class
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="h-4" />
            </div>
        </div>,
        document.body,
    );
}
