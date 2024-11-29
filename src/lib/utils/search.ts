export const getDismissedRecently = () => {
    const enjoymentDismissalTime = window.localStorage.getItem(
        "enjoymentDismissalTime"
    );
    const dismissedRecently =
        enjoymentDismissalTime !== null &&
        Date.now() - parseInt(enjoymentDismissalTime) <
            4 * 7 * 24 * 3600 * 1000;

    return dismissedRecently;
};

export const getNumSearches = () => {
    const gezSearches = window.localStorage.getItem("gezSearches");
    const numSearches = gezSearches ? parseInt(gezSearches) : 0;

    return numSearches;
};
