export const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return diffInMinutes > 1 ? `il y a ${diffInMinutes} min` : `il y a moins d'une min`;
    }

    return diffInHours > 1 ? `il y a ${diffInHours} h` : `il y a une h`;
}