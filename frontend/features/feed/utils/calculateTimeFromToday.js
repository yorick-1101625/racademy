export default function calculateTimeFromToday(datetime) {
    const currentDate = new Date();
    const targetDate = new Date(datetime);

    const yearDifference = currentDate.getFullYear() - targetDate.getFullYear();
    if (yearDifference > 0) {
        return `${yearDifference} jaar geleden`;
    }

    const monthDifference = currentDate.getMonth() - targetDate.getMonth();
    if (monthDifference > 0) {
        return `${monthDifference} maanden geleden`;
    }

    const dayDifference = currentDate.getDay() - targetDate.getDay();
    if (dayDifference > 0) {
        return `${dayDifference} dagen geleden`;
    }

    const hourDifference = currentDate.getHours() - targetDate.getHours();
    if (hourDifference > 0) {
        return `${hourDifference} uur geleden`;
    }

    const minuteDifference = currentDate.getMinutes() - targetDate.getMinutes();
    if (minuteDifference > 0) {
        return `${minuteDifference} minuten geleden`;
    }

    const secondDifference = currentDate.getSeconds() - targetDate.getSeconds();
    return `${secondDifference} seconden geleden`;
}