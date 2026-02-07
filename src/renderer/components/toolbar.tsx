import {
  GoGear,
  GoStack,
  GoCheckCircle,
  GoTriangleDown,
  GoPulse,
  GoLog,
  GoChecklist,
} from 'react-icons/go';
import useCategories from '../hooks/use-categories.tsx';

export default function Toolbar() {
  const { categories } = useCategories();

  return (
    <div className="flex items-center justify-between bg-[#1f1f1f] bg-opacity-90 h-7 pl-5 py-5 pr-3 titlebar fixed top-0 left-0 right-0 z-50 text-[13px]">
      <div className="flex items-center gap-2 ml-12">
        <b className="text-red-500">MyStreak</b>

        {categories.length > 0 && (
          <button className="flex items-center gap-2 bg-[#454545] pr-3 pl-4 py-1 ">
            {categories[0].title} <GoTriangleDown />
          </button>
        )}
      </div>

      <div className="flex items-center bg-[#303030] ">
        <button className="flex items-center gap-2 font-bold bg-[#454545] px-5 py-1 ">
          <GoCheckCircle size={18} /> <span>Todos</span>
        </button>
        <button className="flex items-center gap-2 px-5">
          <GoStack size={18} />
        </button>
        <button className="flex items-center gap-2 px-5">
          <GoPulse size={18} />
        </button>
        <button className="flex items-center gap-2 px-5">
          <GoGear size={18} />
        </button>
      </div>
    </div>
  );
}
