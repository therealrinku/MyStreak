import { ipcMain } from 'electron';
import MyStreakActions from './actions';

const actions = new MyStreakActions();

export default async function registerIpcHandlers() {
  ipcMain.on('delete-todo', async (event, id) => {
    try {
      await actions.init();
      await actions.deleteTodo(id);
      event.reply('delete-todo');
    } catch (err: any) {
      event.reply('error-happened', { message: err.message });
    }
  });

  ipcMain.on('upsert-todo', async (event, args = {}) => {
    try {
      await actions.init();
      const updatedTodo = await actions.upsertTodo({ ...args });
      event.reply('upsert-todo', updatedTodo);
    } catch (err: any) {
      event.reply('error-happened', { message: err.message });
    }
  });

  ipcMain.on('load-todos', async (event, cat_id) => {
    try {
      await actions.init();
      const todos = await actions.getTodos(cat_id);
      event.reply('load-todos', todos);
    } catch (err: any) {
      event.reply('error-happened', { message: err.message });
    }
  });

  ipcMain.on('delete-category', async (event, id) => {
    try {
      await actions.init();
      await actions.deleteCategory(id);
      event.reply('delete-category');
    } catch (err: any) {
      event.reply('error-happened', { message: err.message });
    }
  });

  ipcMain.on('upsert-category', async (event, args = {}) => {
    try {
      await actions.init();
      const updatedCategory = await actions.upsertCategory({ ...args });
      event.reply('upsert-category', updatedCategory);
    } catch (err: any) {
      event.reply('error-happened', { message: err.message });
    }
  });

  ipcMain.on('load-categories', async (event) => {
    try {
      await actions.init();
      const categories = await actions.getCategories();
      event.reply('load-categories', categories);
    } catch (err: any) {
      event.reply('error-happened', { message: err.message });
    }
  });
}
