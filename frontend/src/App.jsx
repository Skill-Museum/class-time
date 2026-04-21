import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useClassData } from "./hooks/useClassData";
import { todayKey, DAYS } from "./utils/helpers";
import Header from "./components/Header";
import DaySelector from "./components/DaySelector";
import DepartmentFilter from "./components/DepartmentFilter";
import SearchBar from "./components/SearchBar";
import InternCard from "./components/InternCard";
import ListView from "./components/ListView";
import InternDetailModal from "./components/InternDetailModal";
import SkeletonCard from "./components/SkeletonCard";
import EmptyState from "./components/EmptyState";

function SchedulePage() {
    const { data, loading, error } = useClassData();

    const [selectedDay, setSelectedDay] = useState(todayKey());
    const [selectedDept, setSelectedDept] = useState("All");
    const [search, setSearch] = useState("");
    const [freeOnly, setFreeOnly] = useState(false);
    const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
    const [activeIntern, setActiveIntern] = useState(null);

    const filteredInterns = useMemo(() => {
        if (!data) return [];
        return data.interns.filter((intern) => {
            // Department filter
            if (selectedDept !== "All" && intern.department !== selectedDept)
                return false;
            // Search filter
            if (
                search &&
                !intern.name.toLowerCase().includes(search.toLowerCase())
            )
                return false;
            // Free-day filter
            if (freeOnly) {
                const slots = data.schedules?.[intern.id]?.[selectedDay] || [];
                if (slots.length > 0) return false;
            }
            return true;
        });
    }, [data, selectedDept, search, freeOnly, selectedDay]);

    const clearFilters = () => {
        setSelectedDept("All");
        setSearch("");
        setFreeOnly(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#060d19] p-6 transition-colors duration-300">
                <div className="max-w-5xl mx-auto space-y-6">
                    <div className="h-16 bg-slate-200 dark:bg-white/5 rounded-3xl animate-pulse" />{" "}
                    {/* Header skeleton */}
                    <div className="h-32 bg-slate-200 dark:bg-white/5 rounded-3xl animate-pulse" />{" "}
                    {/* Controls skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#060d19] flex items-center justify-center p-6 transition-colors duration-300">
                <div className="text-center">
                    <div className="text-4xl mb-4">⚠️</div>
                    <h2 className="text-slate-900 dark:text-white font-semibold mb-2">
                        Couldn't load data
                    </h2>
                    <p className="text-slate-600 dark:text-slate-500 text-sm">
                        {error}
                    </p>
                    <p className="text-slate-500 dark:text-slate-600 text-xs mt-2">
                        Check that{" "}
                        <code className="text-cyan-600 dark:text-cyan-400">
                            /public/data/classtime.json
                        </code>{" "}
                        exists.
                    </p>
                </div>
            </div>
        );
    }

    const hasNoResults = filteredInterns.length === 0;

    // FIX: totalFreeToday ignores filters (except selectedDay) to show global context
    const totalFreeToday =
        data?.interns?.filter(
            (i) => (data.schedules?.[i.id]?.[selectedDay] || []).length === 0,
        ).length ?? 0;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#060d19] text-slate-900 dark:text-white transition-colors duration-300">
            {/* Background gradient */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden transition-opacity duration-300 opacity-50 dark:opacity-100">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/4 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6 flex flex-col min-h-screen">
                {/* Header */}
                <Header />

                {/* Controls */}
                <div className="bg-white/80 dark:bg-white/3 border border-slate-200 dark:border-white/8 rounded-2xl sm:rounded-3xl p-3 sm:p-5 space-y-4 shadow-sm dark:shadow-none backdrop-blur-md transition-colors">
                    <DaySelector
                        selectedDay={selectedDay}
                        onSelect={setSelectedDay}
                    />
                    <div className="h-px bg-slate-200 dark:bg-white/8 transition-colors" />
                    <DepartmentFilter
                        departments={data.departments}
                        selected={selectedDept}
                        onSelect={setSelectedDept}
                    />
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        freeOnly={freeOnly}
                        onToggleFree={() => setFreeOnly((v) => !v)}
                    />
                </div>

                {/* Stats & View Toggle bar */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500 px-1 transition-colors">
                    <div className="flex items-center gap-4">
                        <span>
                            Showing{" "}
                            <span className="text-slate-900 dark:text-white font-semibold">
                                {filteredInterns.length}
                            </span>{" "}
                            member{filteredInterns.length !== 1 ? "s" : ""}
                        </span>
                        <span className="hidden sm:inline text-slate-300 dark:text-slate-700">
                            |
                        </span>
                        {/* Contextual global free stat */}
                        <span
                            className="hidden sm:flex items-center gap-1.5"
                            title={`Out of all ${data.interns.length} interns across all departments`}
                        >
                            <span>🎉</span>
                            <span className="text-amber-500 dark:text-amber-400 font-semibold">
                                {totalFreeToday}
                            </span>
                            <span>
                                free globally{" "}
                                {selectedDay === todayKey()
                                    ? "today"
                                    : "on this day"}
                            </span>
                        </span>
                    </div>

                    <div className="flex items-center bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg p-0.5 transition-colors">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-white dark:bg-white/10 text-cyan-600 dark:text-white shadow-sm dark:shadow-none" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
                            title="Grid View"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-white dark:bg-white/10 text-cyan-600 dark:text-white shadow-sm dark:shadow-none" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
                            title="List View"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4 6h2v2H4V6zm4 0h12v2H8V6zM4 11h2v2H4v-2zm4 0h12v2H8v-2zM4 16h2v2H4v-2zm4 0h12v2H8v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Short free stat for mobile only */}
                <div className="sm:hidden text-xs text-slate-500 dark:text-slate-500 px-1 -mt-2 transition-colors">
                    🎉{" "}
                    <span className="text-amber-500 dark:text-amber-400 font-semibold">
                        {totalFreeToday}
                    </span>{" "}
                    free globally{" "}
                    {selectedDay === todayKey() ? "today" : "on this day"}
                </div>

                {/* Content area */}
                <div className="flex-1">
                    {hasNoResults ? (
                        <EmptyState
                            isFreeFilter={freeOnly}
                            onClear={clearFilters}
                        />
                    ) : viewMode === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
                            {filteredInterns.map((intern) => {
                                const slots =
                                    data.schedules?.[intern.id]?.[
                                        selectedDay
                                    ] || [];
                                return (
                                    <InternCard
                                        key={intern.id}
                                        intern={intern}
                                        slots={slots}
                                        isToday={selectedDay === todayKey()}
                                        onClick={setActiveIntern}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="pb-12">
                            <ListView
                                interns={filteredInterns}
                                schedules={data.schedules}
                                selectedDay={selectedDay}
                                onClickIntern={setActiveIntern}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {activeIntern && (
                <InternDetailModal
                    intern={activeIntern}
                    schedule={data.schedules}
                    onClose={() => setActiveIntern(null)}
                />
            )}
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SchedulePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
