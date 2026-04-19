// Deterministic colour from a string (for initials circles & dept badges)
export function stringToHsl(str, saturation = 65, lightness = 55) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Initials from full name, up to 2 chars
export function getInitials(name = "") {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("");
}

// "09:00" -> "9:00 AM"
export function formatTime(t = "") {
    const [h, m] = t.split(":").map(Number);
    if (isNaN(h)) return t;
    const period = h < 12 ? "AM" : "PM";
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

// "09:00" -> fractional hour (for duration calc)
export function toHours(t = "") {
    const [h, m] = t.split(":").map(Number);
    return h + m / 60;
}

// Duration string e.g. "2h 30m"
export function duration(start, end) {
    const diff = toHours(end) - toHours(start);
    if (diff <= 0) return "";
    const h = Math.floor(diff);
    const m = Math.round((diff - h) * 60);
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
}

// Today's day-of-week string, e.g. "wednesday"
export function todayKey() {
    return new Date()
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();
}

// Array of ordered week days starting Sunday
export const DAYS = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

export const DAY_LABELS = {
    sunday: "Sun",
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
    saturday: "Sat",
};

export const DEPT_COLORS = {
    Robotics: {
        bg: "bg-blue-500/20",
        text: "text-blue-300",
        border: "border-blue-500/30",
    },
    "Robotic AI": {
        bg: "bg-purple-500/20",
        text: "text-purple-300",
        border: "border-purple-500/30",
    },
    Development: {
        bg: "bg-emerald-500/20",
        text: "text-emerald-300",
        border: "border-emerald-500/30",
    },
};

// Check if current Date (nowObj) falls between "09:00" and "12:00"
export function isSlotLive(startStr, endStr, nowObj) {
    if (!startStr || !endStr || !nowObj) return false;

    const currentTotalMins = nowObj.getHours() * 60 + nowObj.getMinutes();

    const [sh, sm] = startStr.split(":").map(Number);
    const startTotalMins = sh * 60 + sm;

    const [eh, em] = endStr.split(":").map(Number);
    const endTotalMins = eh * 60 + em;

    return (
        currentTotalMins >= startTotalMins && currentTotalMins < endTotalMins
    );
}
