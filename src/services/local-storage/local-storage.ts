export const localStorageService = {
    set: (key: string, value: unknown) => {
        console.log(key, value);
        localStorage.setItem(key, JSON.stringify(value));
    },

    get: (key: string) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },

    remove: (key: string) => {
        localStorage.removeItem(key);
    },

    clear: () => {
        localStorage.clear();
    }
};
