import { Button } from './ui/button';
import { useMachine } from '@xstate/react';
import { timerMachine } from '@/machines';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from './ui/card';

export const Timer: React.FC<{ maxElapsedTime: number; intervalTimeInMs: number }> = ({ maxElapsedTime, intervalTimeInMs }) => {
  const [state, send] = useMachine(timerMachine, {
    input: {
      maxElapsedTimeBeforeStop: maxElapsedTime,
      intervalTimeInMs,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timer Machine</CardTitle>
      </CardHeader>
      <CardContent>
        <pre>State {state.value}</pre>
        <h1>Elapsed Time {state.context.elapsedTime}</h1>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between gap-7">
          <Button onClick={() => send({ type: 'PLAY' })}>Play</Button>
          <Button variant="destructive" onClick={() => send({ type: 'PAUSE' })}>
            Pause
          </Button>
          <Button variant="outline" onClick={() => send({ type: 'RESET' })}>
            Reset
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
