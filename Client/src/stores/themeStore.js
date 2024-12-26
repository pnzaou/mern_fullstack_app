import { create } from "zustand";

export const themeStore = create((set) => ({
    theme: localStorage.getItem('theme_color') || "dark",
    setTheme: (theme) => {
        localStorage.setItem('theme_color', theme)
        set({theme: theme})
    }
}))