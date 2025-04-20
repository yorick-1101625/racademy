export default function calculateTimeFromToday(datetime) {
    const currentDate = new Date();
    const targetDate = new Date(datetime);

    const years = currentDate.getFullYear() - targetDate.getFullYear();
    if (years > 0) {
        return `${years} jaar geleden`;
    }

    const months = currentDate.getMonth() - targetDate.getMonth();
    if (months > 0) {
        return (
            months === 1
                ? '1 maand geleden'
                : `${months} maanden geleden`
        );
    }

    const difference = currentDate - targetDate;
    const weeks = Math.floor(difference / 1000 / 60 / 60 / 24 / 7);
    if (weeks > 0) {
        return (
            weeks === 1
                ? '1 week geleden'
                : `${weeks} weken geleden`
        );
    }

    const days = Math.floor(difference / 1000 / 60 / 60 / 24);
    if (days > 0) {
        return (
            days === 1
                ? '1 dag geleden'
                : `${days} dagen geleden`
        );
    }

    const hours = Math.floor(difference / 1000 / 60 / 60);
    if (hours > 0) {
        return `${hours} uur geleden`;
    }

    const minutes = Math.floor(difference / 1000 / 60) % 60;
    if (minutes > 0) {
        return (
            minutes === 1
                ? '1 minuut geleden'
                : `${minutes} minuten geleden`
        );
    }

    const seconds = Math.floor(difference / 1000) % 60;

    return (
        seconds === 1
            ? '1 seconde geleden'
            : `${seconds} seconden geleden`
    );
}