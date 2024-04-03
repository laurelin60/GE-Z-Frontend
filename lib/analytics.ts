export const analyticsEnum = {
    search: {
        title: "Search Page",
        actions: {
            SEARCH: "Search Course", // Label is school, value is index of GE
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
    });
}
