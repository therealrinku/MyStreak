export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen text-white bg-[#1e1e1e]">
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
}
