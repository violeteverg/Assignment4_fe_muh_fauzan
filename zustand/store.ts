import { createStore } from "zustand/vanilla";

// Initial value
export type StoreState = {
  count: number;
};

// Actions
export type StoreActions = {
  increment: () => void;
  decrement: () => void;
};

export type MainStore = StoreState & StoreActions;

export const defaultInitState: StoreState = {
  count: 1,
};

export const createMainStore = (initState: StoreState = defaultInitState) => {
  return createStore<MainStore>()((set) => ({
    ...initState,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  }));
};
