export default function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const lastPart = parts.pop();
        return lastPart ? lastPart.split(';').shift() : undefined;
    }
    return undefined;
}
