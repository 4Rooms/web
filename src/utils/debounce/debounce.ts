export default function debounce<T extends any[]>(func: (...args: T) => void, wait: number): (...args: T) => void {
    let timeout: number | null = null;

    return function executedFunction(...args: T): void {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}
