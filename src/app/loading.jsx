// app/loading.jsx
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>

        {/* Optional inner circle for depth */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 border-t-4 border-blue-300 border-solid rounded-full animate-spin-reverse"></div>
        </div>

        {/* Loading text */}
        <p className="mt-4 text-center text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}
