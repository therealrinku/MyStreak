import { GoCheck } from 'react-icons/go';

export default function Settings() {
  return (
    <div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between gap-3 border-b border-[#383838]">
        <p>Show completed todos tab</p>
        <button>
          <GoCheck />
        </button>
      </div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between gap-3 border-b border-[#383838]">
        <p>Show todos serial number</p>
        <button>
          <GoCheck />
        </button>
      </div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between gap-3 border-b border-[#383838]">
        <p>Show move to top button</p>
        <button>
          <GoCheck />
        </button>
      </div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between gap-3 border-b border-[#383838]">
        <p>Show complete todo button</p>
        <button>
          <GoCheck />
        </button>
      </div>
    </div>
  );
}
