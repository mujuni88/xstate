import { Button } from './ui/button';
import { useMachine } from '@xstate/react';
import { counterTimerMachine } from '@/machines';

export const Counter = () => {
  const [state, send] = useMachine(
    counterTimerMachine.provide({
      actions: {
        beginCounter: ({ context }) => {
          console.log('beginCounter', context.counter);
          context.intervalId = setInterval(() => {
            send({ type: 'INCREMENT' });
          }, 1000);
        },
      },
    })
  );

  return (
    <div className="flex flex-col gap-2">
      <pre>State {JSON.stringify(state, null, 2)}</pre>
      <h1>Counter {state.context.counter}</h1>
      <div className="flex justify-between gap-7">
        <Button onClick={() => send({ type: 'PLAY' })}>Play</Button>
        <Button variant="destructive" onClick={() => send({ type: 'PAUSE' })}>
          Pause
        </Button>
        <Button variant="outline" onClick={() => send({ type: 'RESET' })}>
          Reset
        </Button>
      </div>
    </div>
  );
};
