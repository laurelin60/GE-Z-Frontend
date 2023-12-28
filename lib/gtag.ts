// https://stackoverflow.com/questions/77063977/implementing-google-analytics-in-nextjs-13-app-directory

export const NEXT_PUBLIC_GA_TRACKING_ID: string | undefined =
    process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const pageview = (url: string) => {
    (window as any).gtag("config", NEXT_PUBLIC_GA_TRACKING_ID, {
        page_path: url,
    });
};

export const event = ({
    action,
    category,
    label,
    value,
}: {
    action: string;
    category: string;
    label: string;
    value: number;
}) => {
    (window as any).gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};
