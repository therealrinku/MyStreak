import { useContext } from 'react';
import { RootContext } from '../context/root-context';

interface ICategory {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

export default function useCategories() {
  const { categories, selectedCategory, setSelectedCategory, setCategories } =
    useContext(RootContext);

  function handleSelectCategory(cat: ICategory) {
    setSelectedCategory(cat);
  }

  function handleCreateCategory({ title }) {
    window.electron.ipcRenderer.sendMessage('upsert-category', { title });

    window.electron.ipcRenderer.once('upsert-category', (category) => {
      setCategories((prev) => [category as ICategory, ...prev]);
    });
  }

  function handleUpdateCategory({ id: number, title: string }) {
    window.electron.ipcRenderer.sendMessage('upsert-category', { id, title });

    window.electron.ipcRenderer.once('upsert-category', (updatedCategory) => {
      const updatedCategories = [...categories];
      const catIndex = categories.findIndex((cat) => cat.id === id);

      updatedCategories[catIndex] = updatedCategory as ICategory;
      setCategories(updatedCategories);
    });
  }

  function handleDeleteCategory(id: number) {
    const confirmed = confirm(`Are you sure want to delete this category? `);
    if (!confirmed) {
      return;
    }

    window.electron.ipcRenderer.sendMessage('delete-category', id);

    window.electron.ipcRenderer.on('delete-category', () => {
      setCategories((prev) => prev.filter((todo) => todo.id !== id));
    });
  }

  return {
    categories,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    selectedCategory,
    handleSelectCategory,
  };
}
