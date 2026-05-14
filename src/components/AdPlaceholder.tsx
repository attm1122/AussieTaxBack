export function AdPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center h-24 my-6 ${className}`}
    >
      <span className="text-gray-400 text-sm">Ad space</span>
    </div>
  );
}
