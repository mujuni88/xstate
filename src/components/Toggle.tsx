import { useMachine } from '@xstate/react';
import { toggleMachine } from '@/machines';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export const Toggle: React.FC<{ className?: string }> = ({ className }) => {
  const [state, send] = useMachine(toggleMachine);

  return (
    <Card className={cn('w-[350px]', className)}>
      <CardHeader>
        <CardTitle>Toggle Machine</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 items-center">
        <p className="font-medium text-lg">Value</p>
        <Badge variant={state.matches('Active') ? 'default' : 'destructive'}> {state.value}</Badge>
      </CardContent>
      <CardFooter>
        <Button onClick={() => send({ type: 'TOGGLE' })}>Toggle</Button>
      </CardFooter>
    </Card>
  );
};
