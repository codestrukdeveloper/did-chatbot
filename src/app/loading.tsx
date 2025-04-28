import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F7F8FA]">

      <div className="flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>

      <p className="mt-6 text-gray-600 text-sm">Loading, please wait...</p>
    </div>
  );
}
