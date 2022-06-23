import create from 'zustand';

type ThemeStore = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: 'light',
    toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
    })),
    setTheme: (theme) => set((state) => ({
        theme
    })),
}));
