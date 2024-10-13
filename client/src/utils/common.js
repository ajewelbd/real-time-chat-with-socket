export const uuid = () => crypto.randomUUID();
export const saveToStorage = (key, value) => localStorage.setItem(key, value);
export const removeFormStorage = (key) => localStorage.removeItem(key);
export const getFromStorage = (key) => localStorage.getItem(key);

export const isAutenticated = () => {
    const token = getFromStorage("token");
    return token;
};

export const getToken = () => {
    const token = getFromStorage("token");
    return token;
};

export const getRandomColor = () => {
    const number = Math.floor(Math.random() * 10);
    const colors = [
        "bg-slate-500",
        "bg-red-500",
        "bg-orange-500",
        "bg-amber-500",
        "bg-lime-500",
        "bg-green-500",
        "bg-blue-500",
        "bg-purple-500",
        "bg-rose-500",
        "bg-violet-500",
    ];

    return colors[number];
}