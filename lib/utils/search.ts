export const getDismissedRecently = () => {
    const enjoymentDismissalTime = window.localStorage.getItem(
        "enjoymentDismissalTime",
    );
    return (
        enjoymentDismissalTime !== null &&
        Date.now() - parseInt(enjoymentDismissalTime) < 4 * 7 * 24 * 3600 * 1000
    );
};

export const getNumSearches = () => {
    const gezSearches = window.localStorage.getItem("gezSearches");
    return gezSearches ? parseInt(gezSearches) : 0;
};
