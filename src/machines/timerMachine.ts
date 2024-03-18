import { assign, fromCallback, setup } from 'xstate';

type Input = {
  maxElapsedTimeBeforeStop: number;
  intervalTimeInMs: number;
};

type Context = Input & {
  elapsedTime: number;
};

type Events = {
  type: 'PLAY' | 'PAUSE' | 'RESET' | 'INCREMENT';
};

export const timerMachine = setup({
  types: {
    context: {} as Context,
    events: {} as Events,
    input: {} as Input,
  },
  actors: {
    startTimer: fromCallback(({ sendBack, input }) => {
      const intervalId = setInterval(
        () => {
          sendBack({ type: 'INCREMENT' });
        },
        (input as Input).intervalTimeInMs
      );
      return () => {
        clearInterval(intervalId);
      };
    }),
  },
  actions: {
    incrementTimer: assign({
      elapsedTime: ({ context }) => {
        return context.elapsedTime + 1;
      },
    }),
    resetTimer: assign({
      elapsedTime: 0,
    }),
  },
  guards: {
    isOver: ({ context }) => {
      return context.elapsedTime > context.maxElapsedTimeBeforeStop;
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BXAdgFzAJwBUBLAW3wDoBJCAGzAGIBlAgQQCUCB9AygWQFE2AbQAMAXUSgADqlhFsRVJkkgAHogDMIgJzkNAJhEaAjPoCsAGhABPRAA5j5MwF9nVtFlyFSFNlkxEmFBMBADyAArcfIKiEkggMnIKSirqCFq6BkamljaIxgau7hg4+MRkeOR+mAFB9Gz8jPxcPALC4iqJ8orK8WkZeoYm5la2CMZ2+k5FIB6l3hVV-oHBsZ2y3Sl9mjqD2SN5CPoA7Hbk2mbDLm6zJV7lvst1qrDYAIa45G8AZl4AFMYRECAJT0Ob3HyVaq1KBreJdZK9UBpY5mcgANgK+gcBzGpjO6NcN0wqAgcBU4LKkPWSR6qUQAFpjKNGYSbpSFhRqHQaZskWpEAAWSbnS45FlHIwY-Toszo8wzDkPKFPKC8xH0hCC44S-QncgiMUKolAA */
  id: 'timerMachine',

  initial: 'Idle',
  context: ({ input }) => {
    return {
      elapsedTime: 0,
      maxElapsedTimeBeforeStop: input.maxElapsedTimeBeforeStop ?? 20,
      intervalTimeInMs: input.intervalTimeInMs ?? 1000,
    };
  },
  states: {
    Idle: {
      on: {
        PLAY: 'Running',
      },
    },
    Running: {
      invoke: {
        src: 'startTimer',
        input: ({ context }) => ({ intervalTimeInMs: context.intervalTimeInMs }),
      },
      always: {
        target: 'Idle',
        guard: {
          type: 'isOver',
        },
      },
      on: {
        PAUSE: 'Idle',
        INCREMENT: { actions: 'incrementTimer' },
      },
    },
  },
  on: {
    RESET: { target: '.Idle', actions: 'resetTimer' },
  },
});
