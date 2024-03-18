import { useMachine } from '@xstate/react';
import { toggleMachine } from '@/machines';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Toggle: React.FC<{ className?: string }> = ({ className }) => {
  const [state, send] = useMachine(toggleMachine);

  return (
    <div className={cn('p-2 flex flex-col gap-2', className)}>
      <p>Value: {state.value}</p>
      <Button onClick={() => send({ type: 'TOGGLE' })}>Toggle</Button>
    </div>
  );
};
