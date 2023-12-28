export const analyticsEnum = {
    search: {
        title: "Search Page",
        actions: {
            SEARCH: "Search Course", // Label is school, value is
        },
    },
};

interface AnalyticsProps {
    category: string;
    action: string;
    label?: string;
    value?: number;
}

export function logAnalytics({
    category,
    action,
    label,
    value,
}: AnalyticsProps) {
    (window as any).gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
    });
}
