import { useEffect, useRef, useState } from 'react';
import { GoPlus, GoFlame, GoClock } from 'react-icons/go';
import useTodos from '../hooks/use-todos.tsx';
import Toolbar from '../components/toolbar';

export default function MyStreakApp() {
  const { todos } = useTodos();

  return (
    <div className="w-full min-h-[100vh] bg-white dark:bg-[#303030] text-sm text-white flex flex-col">
      <Toolbar />

      <div className="mt-16 w-full max-w-[800px] mx-auto mb-12">
        <div className="md:-[#1f1f1f] bg-opacity-40 flex items-start gap-3 border-b border-[#383838] last:border-none">
          <button className="flex items-center gap-2 justify-between font-bold hover:bg-[#1f1f1f] w-full py-3 px-3">
            <div className="flex items-center gap-2">
              <GoPlus size={16} /> Add new todo{' '}
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#1f1f1f] px-3">⌘</span>
              <span className="bg-[#1f1f1f] px-3">n</span>
            </div>
          </button>
        </div>
        {todos.map((todo) => {
          return (
            <div
              key={todo.id}
              className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 flex items-start gap-3 border-b border-[#383838] last:border-none"
            >
              <input type="checkbox" className="mt-1" />

              <div className="flex flex-col gap-2">
                <p>{todo.title}</p>
                {todo.due && (
                  <p className="flex items-center gap-2">
                    <GoClock /> {todo.due}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
