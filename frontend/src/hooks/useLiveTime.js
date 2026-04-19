import { useState, useEffect } from "react";

export function useLiveTime() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        // Update every minute (60000ms) to trigger re-renders for 'Live Now' indicators
        const interval = setInterval(() => {
            setNow(new Date());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return now;
}
