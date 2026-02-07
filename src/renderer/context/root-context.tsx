import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  due_date: string | null;
  category_id: number;
}

interface ICategory {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface RootContextType {
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  categories: ICategory[];
  setTodos: Dispatch<SetStateAction<ICategory[]>>;
}

const noop = (() => {}) as unknown as Dispatch<SetStateAction<unknown>>;

export const RootContext = createContext<RootContextType>({
  todos: [],
  setTodos: noop as Dispatch<SetStateAction<ITodo[]>>,
  categories: [],
  setCategories: noop as Dispatch<SetStateAction<ICategory[]>>,
});

export function RootContextProvider({ children }: PropsWithChildren<{}>) {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    localStorage.setItem('selectedCategory', JSON.stringify(selectedCategory));
    const loadTodosHandler = (arg: unknown) => {
      const castedArg = arg as unknown as ITodo[] | undefined;
      setTodos(castedArg ?? []);
    };

    if (!selectedCategory) {
      return;
    }

    window.electron.ipcRenderer.sendMessage('load-todos', selectedCategory.id);
    window.electron.ipcRenderer.on('load-todos', loadTodosHandler);
  }, [selectedCategory]);

  useEffect(() => {
    const loadCategoriesHandler = (arg: unknown) => {
      const castedArg = arg as unknown as ICategory[] | undefined;
      setCategories(castedArg ?? []);

      // handle selecting the category
      const saved = localStorage.getItem('selectedCategory');
      if (!saved) return;
      const parsed = JSON.parse(saved);

      const cat = castedArg.find((cat) => cat.id === parsed?.id);
      if (cat) setSelectedCategory(cat);
      setSelectedCategory(castedArg[0]);
    };
    const errorHandler = (err: unknown) => {
      const msg = (err && (err as any).message) || String(err);
      // eslint-disable-next-line no-alert
      alert(msg);
    };

    // load data
    window.electron.ipcRenderer.sendMessage('load-categories');
    // handle data
    window.electron.ipcRenderer.on('error-happened', errorHandler);
    window.electron.ipcRenderer.on('load-categories', loadCategoriesHandler);
  }, []);

  const contextValue = useMemo<RootContextType>(
    () => ({
      todos,
      setTodos,
      categories,
      setCategories,
      selectedCategory,
      setSelectedCategory,
    }),
    [todos, setTodos, categories, setCategories],
  );

  return (
    <RootContext.Provider value={contextValue}>{children}</RootContext.Provider>
  );
}
