import { FormEvent } from 'react';
import { GoTriangleUp, GoTriangleDown, GoPlus, GoClock } from 'react-icons/go';
import Toolbar from '../components/toolbar';
import Todos from '../components/todos';
import Backlog from '../components/backlog';
import Stats from '../components/stats';
import Settings from '../components/settings';
import { useState } from 'react';

export default function MyStreakApp() {
  const [selectedTab, setSelectedTab] = useState('todos');

  function getTab() {
    switch (selectedTab) {
      case 'todos':
        return <Todos />;
      case 'backlog':
        return <Backlog />;
      case 'stats':
        return <Stats />;
      case 'settings':
        return <Settings />;
    }
  }

  return (
    <div className="w-full min-h-[100vh] bg-white dark:bg-[#303030] text-sm text-white flex flex-col">
      <Toolbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      <div className="mt-16 w-full max-w-[800px] mx-auto mb-12">{getTab()}</div>
    </div>
  );
}
