import create from 'zustand';

type ModalStore = {
    isCreateExerciseTypeModalVisible: boolean;
    showCreateExerciseTypeModal: () => void;
    hideCreateExerciseTypeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    isCreateExerciseTypeModalVisible: false,
    showCreateExerciseTypeModal: () => set((state) => ({
        isCreateExerciseTypeModalVisible: true
    })),
    hideCreateExerciseTypeModal: () => set((state) => ({
        isCreateExerciseTypeModalVisible: false
    }))
}));