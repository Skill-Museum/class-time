import { getInitials, stringToHsl } from "../utils/helpers";

export default function InternAvatar({ intern, size = "md" }) {
    const sizes = {
        sm: "w-8 h-8 text-xs",
        md: "w-12 h-12 text-sm",
        lg: "w-16 h-16 text-base",
    };

    const initials = getInitials(intern.name);
    const bgColor = stringToHsl(intern.id, 60, 45);

    if (intern.image) {
        return (
            <img
                src={intern.image}
                alt={intern.name}
                className={`${sizes[size]} rounded-full object-cover ring-2 ring-white/10 flex-shrink-0`}
                onError={(e) => {
                    // Fallback to initials if image fails to load
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextSibling.style.display = "flex";
                }}
            />
        );
    }

    return (
        <div
            className={`${sizes[size]} rounded-full flex items-center justify-center flex-shrink-0
        font-bold text-white ring-2 ring-white/10`}
            style={{ background: bgColor }}
        >
            {initials}
        </div>
    );
}
