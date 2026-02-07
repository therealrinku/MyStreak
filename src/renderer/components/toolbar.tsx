import { GoPulse, GoLog, GoChecklist } from 'react-icons/go';
import useCategories from '../hooks/use-categories.tsx';

export default function Toolbar() {
  const { categories } = useCategories();

  return (
    <div className="flex items-center justify-between bg-[#1f1f1f] bg-opacity-90 h-7 p-5 titlebar fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2 ml-16">
        <b className="text-red-500">MyStreak</b>

        <select className="bg-inherit ml-5 outline-none">
          {categories.map((cat) => {
            return <option key={cat.id}>{cat.title}</option>;
          })}
        </select>
      </div>

      <div className="flex items-center">
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
  );
}
