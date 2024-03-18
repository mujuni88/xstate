import { Header } from '@/components/Header';
import { Toggle } from './components/Toggle';
import { Counter } from './components/Counter';

export const App = () => {
  return (
    <div className="grid gap-2 h-screen grid-rows-[auto_auto_1fr]">
      <Header title="Test App" className="bg-blue-500 p-6" />
      <div className="flex flex-col gap-4 max-w-xlg mx-auto p-6">
        <Toggle />
        <Counter />
      </div>
    </div>
  );
};
