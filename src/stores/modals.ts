import create from 'zustand';

type ModalStore = {
    isCreateExerciseTypeModalVisible: boolean;
    showCreateExerciseTypeModal: () => void;
    hideCreateExerciseTypeModal: () => void;

    isCalendarWorkoutInfoModalVisible: boolean;
    showCalendarWorkoutInfoModal: () => void;
    hideCalendarWorkoutInfoModal: () => void;

    isConfirmDeleteExerciseTypeModalVisible: boolean;
    showConfirmDeleteExerciseTypeModal: () => void;
    hideConfirmDeleteExerciseTypeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    isCreateExerciseTypeModalVisible: false,
    showCreateExerciseTypeModal: () => set((state) => ({
        isCreateExerciseTypeModalVisible: true
    })),
    hideCreateExerciseTypeModal: () => set((state) => ({
        isCreateExerciseTypeModalVisible: false
    })),

    isCalendarWorkoutInfoModalVisible: false,
    showCalendarWorkoutInfoModal: () => set((state) => ({
        isCalendarWorkoutInfoModalVisible: true
    })),
    hideCalendarWorkoutInfoModal: () => set((state) => ({
        isCalendarWorkoutInfoModalVisible: false
    })),

    isConfirmDeleteExerciseTypeModalVisible: false,
    showConfirmDeleteExerciseTypeModal: () => set((state) => ({
        isConfirmDeleteExerciseTypeModalVisible: true
    })),
    hideConfirmDeleteExerciseTypeModal: () => set((state) => ({
        isConfirmDeleteExerciseTypeModalVisible: false
    }))
}));