import { create } from 'zustand';

export const useNotification = create((set) => ({
    notificationArr: [],
    setNotificationArr: (notification) => set((state) => ({
        notificationArr: [...state.notificationArr, notification],
    })),
    removeNotification: (notificationId) => set((state) => ({
        notificationArr: state.notificationArr.filter(
            (notification) => notification.id !== notificationId
        ),
    })),
}));
