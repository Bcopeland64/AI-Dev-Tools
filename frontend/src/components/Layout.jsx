import React from 'react';

const Layout = ({ left, middle, right }) => {
  return (
    <div className="grid grid-cols-12 h-screen bg-gray-900 text-white font-sans">
      <div className="col-span-2 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700 font-bold text-xl text-blue-400">PyTutor</div>
        <div className="flex-1 overflow-y-auto p-2">
          {left}
        </div>
      </div>
      <div className="col-span-7 border-r border-gray-700 flex flex-col">
        {middle}
      </div>
      <div className="col-span-3 flex flex-col bg-gray-800">
        <div className="p-4 border-b border-gray-700 font-bold text-lg text-yellow-400">Hints & Guide</div>
        <div className="flex-1 overflow-y-auto p-4">
          {right}
        </div>
      </div>
    </div>
  );
};

export default Layout;
