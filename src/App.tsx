import { Header } from '@/components/Header';
import { Toggle } from './components/Toggle';
import { Timer } from './components/Timer';

export const App = () => {
  return (
    <div className="flex flex-col gap-2">
      <Header title="Xstate Playground" className="bg-blue-500 px-8 py-6" />
      <div className="grid p-8 grid-flow-col auto-cols-max gap-6">
        <Toggle />
        <Timer intervalTimeInMs={2000} maxElapsedTime={10} />
      </div>
    </div>
  );
};
