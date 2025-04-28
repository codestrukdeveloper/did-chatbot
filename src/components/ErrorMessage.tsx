"use client";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center my-2">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl max-w-sm w-full text-center animate-fadeIn">
        {message}
      </div>
    </div>
  );
}
