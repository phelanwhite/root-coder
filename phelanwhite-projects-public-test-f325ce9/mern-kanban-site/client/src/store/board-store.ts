import { create } from "zustand";

interface Board {
  id: string;
  title: string;
  description: string;
  position: number;
}

interface State {
  boards: Board[];
}
interface Action {
  createBoard: (data: Board) => any;
}

export const useBoardStore = create<State & Action>()((set, get) => ({
  boards: [],
  createBoard: (data) => {
    set((state) => ({ boards: [...state.boards, data] }));
  },
}));
