import { assign, fromCallback, setup } from 'xstate';

const beginCounter = fromCallback(({ sendBack }) => {
  console.log('beginCounter');
  const intervalId = setInterval(() => {
    sendBack({ type: 'INCREMENT_TIMER' });
  }, 1000);
  return () => {
    clearInterval(intervalId);
  };
});

type Context = {
  intervalId: NodeJS.Timeout;
  counter: number;
};

type Events = {
  type: 'PLAY' | 'PAUSE' | 'RESET' | 'INCREMENT';
};

export const counterTimerMachine = setup({
  types: {
    context: {} as Context,
    events: {} as Events,
  },
  actors: {
    beginCounter,
  },
  actions: {
    incrementCounter: assign({
      counter: ({ context }) => {
        console.log('increment counter', context.counter);
        return context.counter + 1;
      },
    }),
    resetCounter: assign({
      counter: 0,
    }),
    beginCounter: () => {},
  },
  guards: {
    isOver: ({ context }) => {
      return context.counter > 20;
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BXAdgFzAJwBUBLAW3wDoBJCAGzAGIBlAgQQCUCB9AygWQFE2AbQAMAXUSgADqlhFsRVJkkgAHogDMIgJzkNAJhEaAjPoCsAGhABPRAA5j5MwF9nVtFlyFSFNlkxEmFBMBADyAArcfIKiEkggMnIKSirqCFq6BkamljaIxgau7hg4+MRkeOR+mAFB9Gz8jPxcPALC4iqJ8orK8WkZeoYm5la2CMZ2+k5FIB6l3hVV-oHBsZ2y3Sl9mjqD2SN5CPoA7Hbk2mbDLm6zJV7lvst1qrDYAIa45G8AZl4AFMYRECAJT0Ob3HyVaq1KBreJdZK9UBpY5mcgANgK+gcBzGpjO6NcN0wqAgcBU4LKkPWSR6qUQAFpjKNGYSbpSFhRqHQaZskWpEAAWSbnS45FlHIwY-Toszo8wzDkPKFPKC8xH0hCC44S-QncgiMUKolAA */
  id: 'counterTimer',

  initial: 'Idle',
  context: {
    intervalId: 0 as unknown as NodeJS.Timeout,
    counter: 0,
  },

  states: {
    Idle: {
      on: {
        PLAY: { target: 'Running' },
      },
    },
    Running: {
      invoke: {
        src: 'beginCounter',
      },
      always: {
        target: 'Idle',
        guard: {
          type: 'isOver',
          params: {
            overTime: 10,
          },
        },
      },
      on: {
        PAUSE: { target: 'Idle' },
      },
    },
  },
  on: {
    RESET: { target: '.Idle', actions: 'resetCounter' },
  },
});
