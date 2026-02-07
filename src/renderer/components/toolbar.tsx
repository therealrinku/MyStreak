import { useState } from 'react';
import {
  GoTrash,
  GoTriangleUp,
  GoCheckCircleFill,
  GoGear,
  GoStack,
  GoCheckCircle,
  GoTriangleDown,
  GoPulse,
  GoLog,
  GoPlus,
  GoChecklist,
} from 'react-icons/go';
import useCategories from '../hooks/use-categories.tsx';

function CategoriesDropdown({ onClose }) {
  const {
    categories,
    selectedCategory,
    handleSelectCategory,
    handleCreateCategory,
    handleDeleteCategory,
  } = useCategories();

  const [title, setTitle] = useState('');

  return (
    <div className="fixed top-9 w-60 flex flex-col bg-[#454545]">
      <div className="flex flex-col items-start w-full">
        {categories.map((cat) => {
          return (
            <div
              className="pr-3 w-full flex items-center justify-between hover:bg-[#404040]"
              key={cat.id}
            >
              <button
                className={`flex w-full items-center py-2 px-3 justify-between hover:bg-[#404040] ${selectedCategory.id === cat.id ? 'text-green-400' : 'text-white'} `}
                onClick={() => handleSelectCategory(cat)}
                disabled={selectedCategory.id === cat.id}
              >
                <span className="flex items-center gap-2">
                  {selectedCategory.id === cat.id && <GoCheckCircleFill />}{' '}
                  {cat.title}
                </span>
              </button>

              {selectedCategory.id !== cat.id &&  <button
                onClick={() => handleDeleteCategory(cat.id)}
                className="text-red-500"
              >
                <GoTrash />{' '}
              </button>}
            </div>
          );
        })}
      </div>

      <div className="flex items-center w-full">
        <input
          type="text"
          className="bg-inherit px-3 py-2 outline-none border-t border-gray-500 w-full"
          placeholder="Add new category"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="absolute right-3 disabled:text-gray-500"
          disabled={!title.trim()}
          onClick={() => handleCreateCategory({ title })}
        >
          <GoPlus />
        </button>
      </div>
    </div>
  );
}

export default function Toolbar() {
  const { categories, selectedCategory } = useCategories();

  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  return (
    <div className="flex items-center justify-between bg-[#1f1f1f] bg-opacity-90 h-7 pl-5 py-5 pr-3 titlebar fixed top-0 left-0 right-0 z-50 text-[13px]">
      <div className="flex items-center gap-2 ml-12">
        <b className="text-red-500">MyStreak</b>

        {categories.length > 0 && (
          <div>
            <button
              className={`flex items-center justify-between gap-2 bg-[#454545] px-3 py-1 font-bold ${showCategoriesDropdown ? 'w-60' : 'w-auto'}`}
              onClick={() => setShowCategoriesDropdown((prev) => !prev)}
            >
              {selectedCategory.title}
              {showCategoriesDropdown ? <GoTriangleUp /> : <GoTriangleDown />}
            </button>
            {showCategoriesDropdown && (
              <CategoriesDropdown
                onClose={() => setShowCategoriesDropdown(false)}
              />
            )}
          </div>
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
