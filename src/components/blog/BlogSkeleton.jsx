import React from "react";

const BlogSkeleton = () => {
  return (
    <div className="max-w-full p-4 mt-20 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="max-w-lg bg-white p-4 rounded-lg shadow-lg">
          <div className="w-full h-64 bg-gray-300 animate-pulse mb-4"></div>
          <div className="flex space-x-4 mb-4">
            <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
          </div>
          <div className="h-4 bg-gray-300 animate-pulse mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-300 animate-pulse mb-2 w-2/3"></div>
        </div>

        <div className="max-w-lg bg-white p-4 rounded-lg shadow-lg">
          <div className="w-full h-64 bg-gray-300 animate-pulse mb-4"></div>
          <div className="flex space-x-4 mb-4">
            <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
          </div>
          <div className="h-4 bg-gray-300 animate-pulse mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-300 animate-pulse mb-2 w-2/3"></div>
        </div>

        <div className="max-w-lg bg-white p-4 rounded-lg shadow-lg">
          <div className="w-full h-64 bg-gray-300 animate-pulse mb-4"></div>
          <div className="flex space-x-4 mb-4">
            <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
          </div>
          <div className="h-4 bg-gray-300 animate-pulse mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-300 animate-pulse mb-2 w-2/3"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
