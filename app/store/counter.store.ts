import { decrementUseCase } from '~/application/counter/decrement.use-case';
import { incrementUseCase } from '~/application/counter/increment.use-case';
import { create } from '~/libs/utils/zustand-refactor';

export interface CouterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounter = create<CouterStore>(set => ({
  count: 0,
  increment: () => {
    set(state => {
      state.count = incrementUseCase(state.count);
    });
  },
  decrement: () => {
    set(state => {
      state.count = decrementUseCase(state.count);
    });
  },
}));
