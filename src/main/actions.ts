import { app } from 'electron';
import sqlite3 from 'sqlite3';

const demoTodos = [
  {
    id: 1,
    title: 'Buy a laptop',
    due: 'Due today',
  },
  {
    id: 2,
    title: 'Buy a washing machine',
    due: 'Due tommorow',
  },
  {
    id: 3,
    title: 'Open one oss MR',
    due: 'Due tommorow',
  },
  {
    id: 4,
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    due: null,
  },
  {
    id: 5,
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    due: null,
  },
  {
    id: 7,
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    due: null,
  },
  {
    id: 8,
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    due: null,
  },
];

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

export default class MyStreakActions {
  private db: sqlite3.Database | null = null;

  constructor() {
    this.db = null;
  }

  private runQuery<T>(query: string, params: any[] = []): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db!.all(query, params, (err: Error | null, result: T) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  private runUpdate(
    query: string,
    params: any[] = [],
  ): Promise<sqlite3.RunResult> {
    return new Promise((resolve, reject) => {
      this.db!.run(query, params, function (err: Error | null) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }

  async #addDefaultData() {
    // create default category if none exists
    const defaultCat = await this.runQuery(`SELECT * FROM categories LIMIT 1`);
    let lastCatId = defaultCat[0]?.id;

    if (!lastCatId) {
      const last = await this.runUpdate(
        `INSERT into categories(title) values('Personal')`,
      );
      lastCatId = last.lastID;
    }

    // add demo todos if none exists
    const todos = await this.runQuery(`SELECT * FROM todos LIMIT 1`);
    if (todos.length === 0) {
      demoTodos.map(async (todo) => {
        await this.runUpdate(
          `INSERT into todos(title, completed, category_id) values('${todo.title}', 'false' , ${lastCatId})`,
        );
      });
    }
  }

  async #createTables() {
    const createCategoryTableQuery = `
      CREATE TABLE IF NOT EXISTS categories(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`;
    const createNoteTableQuery = `
      CREATE TABLE IF NOT EXISTS todos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        category_id INTEGER DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        due_date DATETIME DEFAULT NULL,
        completed BOOLEAN DEFAULT FALSE
      )`;

    await this.runUpdate(createCategoryTableQuery);
    await this.runUpdate(createNoteTableQuery);
  }

  async init(): Promise<void> {
    const dbPath = `${app.getPath('documents')}/mystreak.db`;
    this.db = new sqlite3.Database(dbPath);

    await this.#createTables();
    await this.#addDefaultData();
  }

  getTodos(categoryId?: number): Promise<ITodo[]> {
    if (categoryId) {
      return this.runQuery<ITodo[]>(
        `SELECT * FROM todos WHERE category_id = ?`,
        [categoryId],
      );
    }

    return this.runQuery<ITodo[]>('SELECT * FROM todos');
  }

  async upsertTodo({ id, title, categoryId, completed }): Promise<ITodo> {
    if (id) {
      await this.runUpdate(
        'UPDATE todos SET title = ?, updated_at = ?, completed = ?, category_id = ? WHERE id = ?',
        [
          ...queryParams,
          title,
          new Date().toISOString(),
          completed || false,
          categoryId,
        ],
      );
      const data = await this.runQuery<ITodo[]>(
        'SELECT * FROM todos WHERE id = ?',
        [id],
      );
      return data[0];
    }

    const res = await this.runUpdate(
      'INSERT INTO todos (title, category_id) VALUES(?, ?)',
      [title, categoryId],
    );
    const data = await this.runQuery<ITodo[]>(
      'SELECT * FROM todos WHERE id = ?',
      [res.lastID],
    );
    return data[0];
  }

  deleteTodo(id: number): Promise<sqlite3.RunResult> {
    return this.runUpdate('DELETE FROM todos WHERE id = ?', [id]);
  }

  getCategories(): Promise<ICategory[]> {
    return this.runQuery<ITodo[]>('SELECT * FROM categories');
  }

  async upsertCategory({ id: number, title: string } = {}): Promise<ICategory> {
    if (id) {
      await this.runUpdate(
        'UPDATE categories SET title = ?, updated_at = ? WHERE id = ?',
        [...queryParams, title, new Date().toISOString()],
      );
      const data = await this.runQuery<ICategory[]>(
        'SELECT * FROM categories WHERE id = ?',
        [id],
      );
      return data[0];
    }

    const res = await this.runUpdate(
      'INSERT INTO categories(title) VALUES(?)',
      [title],
    );
    const data = await this.runQuery<ICategory[]>(
      'SELECT * FROM categories WHERE id = ?',
      [res.lastID],
    );
    return data[0];
  }

  deleteCategory(id: number): Promise<sqlite3.RunResult> {
    return this.runUpdate('DELETE FROM categories WHERE id = ?', [id]);
  }
}
