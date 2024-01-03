export function formatTime(time: string | undefined, title?: string) {
    if (!time) {
        return "";
    }

    if (title === "information") {
        const date = new Date(time);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}.${formattedMonth}.${year}`;
    } else {
        const date = new Date(Number(time) * 1000);

        const hours = date.getHours();
        const minutes = date.getMinutes();
        console.log(hours);
        return hours + ":" + (minutes < 10 ? "0" : "") + minutes;
    }
}
