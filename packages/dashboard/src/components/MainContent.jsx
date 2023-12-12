import React from 'react';

const MainContent = ({ children }) => {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div className="container mx-auto px-6 py-8">
        {children}
      </div>
    </main>
  );
};

export default MainContent;
