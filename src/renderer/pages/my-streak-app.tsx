import { useEffect, useRef, useState } from 'react';
import {
  GoPlus,
  GoPulse,
  GoLog,
  GoFlame,
  GoChecklist,
  GoClock,
} from 'react-icons/go';
import useTodos from '../hooks/use-todos.tsx';

export default function MyStreakApp() {
  const { todos } = useTodos();
  console.log(todos, 'todos');

  return (
    <div className="w-full min-h-[100vh] bg-white dark:bg-[#303030] text-sm text-white flex flex-col">
      <div className="flex items-center justify-between bg-[#1f1f1f] bg-opacity-90 h-7 p-5 titlebar fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2 mx-12">
          <b className="text-green-500 italic">MyStreak</b>
          <GoFlame className="text-green-500" />

          <select className="bg-inherit ml-5 outline-none">
            <option>Personal</option>
            <option>Work</option>
          </select>
        </div>

        <div className="flex items-center">
          <p className="flex items-center gap-2 font-bold text-green-500 h-[10px] w-8 bg-gray-200 mr-5">
            <p className="bg-yellow-500 h-full w-2"></p>
          </p>
          <button className="flex items-center gap-2 px-5 h-10 font-bold h-full border-l border-gray-800">
            <GoChecklist size={16} /> Todos
          </button>
          <button className="flex items-center gap-2 px-5 border-r border-l h-10 border-gray-800">
            <GoLog /> Next Up
          </button>
          <button className="flex items-center gap-2 pl-5">
            <GoPulse size={18} /> Analytics
          </button>
        </div>
      </div>

      <div className="mt-16 w-full max-w-[800px] mx-auto mb-12">
        <div className="md:-[#1f1f1f] bg-opacity-40 flex items-start gap-3 border-b border-gray-600 last:border-none">
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
              className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 flex items-start gap-3 border-b border-gray-600 last:border-none"
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
