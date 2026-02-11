


export function setItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    }   catch (error) {
        console.log(error);
    }
}

export function getItem(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
    } catch (error) {
        console.log(error);
    }
}