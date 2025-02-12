import { create } from "zustand";

interface AlertStore {
  title: string | null;
  description: string | null;
  buttonText: string;
  setAlert: (title: string, description: string, buttonText?: string) => void;
}

const useAlertStore = create<AlertStore>((set) => ({
  title: null,
  description: null,
  buttonText: '확인',
  setAlert: (title: string, description: string, buttonText: string = '확인') => set({ title, description, buttonText }),
}));

export default useAlertStore;
