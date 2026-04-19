import {
    formatTime,
    duration,
    stringToHsl,
    DAYS,
    DAY_LABELS,
    todayKey,
    isSlotLive,
} from "../utils/helpers";
import InternAvatar from "./InternAvatar";
import { DEPT_COLORS } from "../utils/helpers";
import { useLiveTime } from "../hooks/useLiveTime";
import { ChevronRight, PartyPopper } from "lucide-react";

export default function ListView({
    interns,
    schedules,
    selectedDay,
    onClickIntern,
}) {
    const now = useLiveTime();
    const isToday = selectedDay === todayKey();
    return (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none transition-colors">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/3 transition-colors">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">
                            Intern
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">
                            Department
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">
                            Class Time — {DAY_LABELS[selectedDay]}
                        </th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                            Duration
                        </th>
                        <th className="text-center px-3 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">
                            &nbsp;
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {interns.map((intern, idx) => {
                        const slots =
                            schedules?.[intern.id]?.[selectedDay] || [];
                        const hasClass = slots.length > 0;
                        const deptStyle = DEPT_COLORS[intern.department] || {
                            bg: "bg-slate-500/20",
                            text: "text-slate-300",
                            border: "border-slate-500/30",
                        };
                        const totalDuration = slots.reduce((acc, s) => {
                            const h1 =
                                parseInt(s.start) +
                                parseInt(s.start.split(":")[1]) / 60;
                            const h2 =
                                parseInt(s.end) +
                                parseInt(s.end.split(":")[1]) / 60;
                            return acc + (h2 - h1);
                        }, 0);
                        const totalH = Math.floor(totalDuration);
                        const totalM = Math.round(
                            (totalDuration - totalH) * 60,
                        );
                        const totalLabel =
                            totalDuration === 0
                                ? ""
                                : totalH > 0 && totalM > 0
                                  ? `${totalH}h ${totalM}m`
                                  : totalH > 0
                                    ? `${totalH}h`
                                    : `${totalM}m`;

                        return (
                            <tr
                                key={intern.id}
                                onClick={() => onClickIntern(intern)}
                                className={[
                                    "border-b border-slate-100 dark:border-white/5 cursor-pointer transition-all duration-150",
                                    "hover:bg-slate-50 dark:hover:bg-white/5 group",
                                    idx % 2 === 0
                                        ? "bg-transparent"
                                        : "bg-slate-50/50 dark:bg-white/[0.02]",
                                ].join(" ")}
                            >
                                {/* Name & avatar */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <InternAvatar
                                            intern={intern}
                                            size="sm"
                                        />
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                                                {intern.name}
                                            </div>
                                            {/* Dept badge visible on mobile only */}
                                            <span
                                                className={`sm:hidden inline-block mt-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium
                        border ${deptStyle.bg} ${deptStyle.text} ${deptStyle.border}`}
                                            >
                                                {intern.department}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Department */}
                                <td className="px-4 py-3 hidden sm:table-cell">
                                    <span
                                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium
                    border ${deptStyle.bg} ${deptStyle.text} ${deptStyle.border}`}
                                    >
                                        {intern.department}
                                    </span>
                                </td>

                                {/* Class times */}
                                <td className="px-4 py-3">
                                    {hasClass ? (
                                        <div className="flex flex-wrap gap-1.5">
                                            {slots.map((slot, i) => {
                                                const col = stringToHsl(
                                                    `${intern.id}-${i}`,
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
                                                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs whitespace-nowrap transition-colors
                            ${isLive ? "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30" : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/8"}`}
                                                    >
                                                        {isLive ? (
                                                            <div className="relative flex h-1.5 w-1.5 flex-shrink-0">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                                style={{
                                                                    backgroundColor:
                                                                        col,
                                                                }}
                                                            />
                                                        )}
                                                        <span
                                                            className={
                                                                isLive
                                                                    ? "text-red-600 dark:text-red-400 font-bold"
                                                                    : "text-slate-900 dark:text-white font-medium"
                                                            }
                                                        >
                                                            {formatTime(
                                                                slot.start,
                                                            )}
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
                                                                    : "text-slate-900 dark:text-white font-medium"
                                                            }
                                                        >
                                                            {formatTime(
                                                                slot.end,
                                                            )}
                                                        </span>
                                                        {isLive && (
                                                            <span className="ml-1 text-[9px] text-red-600 dark:text-red-500 font-bold px-1.5 py-0.5 bg-red-100 dark:bg-red-500/10 rounded-md animate-pulse">
                                                                LIVE
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <span className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                            <PartyPopper
                                                size={14}
                                                className="text-amber-500/70"
                                            />
                                            Free day
                                        </span>
                                    )}
                                </td>

                                {/* Total duration */}
                                <td className="px-4 py-3 text-center hidden md:table-cell">
                                    {totalLabel ? (
                                        <span className="text-xs text-slate-400 font-medium">
                                            {totalLabel}
                                        </span>
                                    ) : (
                                        <span className="text-slate-700 text-xs">
                                            —
                                        </span>
                                    )}
                                </td>

                                {/* Arrow */}
                                <td className="px-3 py-3 text-center">
                                    <ChevronRight
                                        size={16}
                                        className="text-slate-400 dark:text-slate-600 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all mx-auto"
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
