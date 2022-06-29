import create from 'zustand';

type NavigationStore = {
    headerBarSelectedItem: string;
    setHeaderBarSelectedItem: (headerBarSelectedItem: string) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
    headerBarSelectedItem: 'home',
    setHeaderBarSelectedItem: (headerBarSelectedItem: string) => set((state) => ({
        headerBarSelectedItem
    }))
}));