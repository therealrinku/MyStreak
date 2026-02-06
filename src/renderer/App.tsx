import { useEffect, useState } from 'react';
import './App.css';
import { RootContextProvider } from './context/root-context';
import Loading from './components/loading';
import MyStreakApp from './pages/my-streak-app';

export function App() {
  const [showLoading, setShowLoading] = useState(true);

  function keyboardShortcutsHandler(e: KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
    }

    if ((e.ctrlKey || e.metaKey) && e.key === '=') {
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
    }

    if (e.key === 'Escape') {
    }
  }

  function toggleTheme() {
    if (localStorage.getItem('color-theme') === 'dark') {
      localStorage.setItem('color-theme', 'light');
      document.documentElement.classList.remove('dark');
      return;
    }
    localStorage.setItem('color-theme', 'dark');
    document.documentElement.classList.add('dark');
  }

  useEffect(() => {
    setTimeout(() => setShowLoading(false), 2000);

    if (localStorage.getItem('color-theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
    window.electron.ipcRenderer.on('toggle-theme', () => {
      toggleTheme();
    });

    window.addEventListener('keydown', keyboardShortcutsHandler);
    return () => {
      window.removeEventListener('keydown', keyboardShortcutsHandler);
    };
  }, []);

  if (showLoading) {
    return <Loading />;
  }

  return <MyStreakApp />;
}

export function Main() {
  return (
    <RootContextProvider>
      <App />
    </RootContextProvider>
  );
}
