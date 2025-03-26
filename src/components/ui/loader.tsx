import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-row h-full justify-center align-middle gap-2">
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce" />
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]" />
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]" />
    </div>
  );
}

export default Loader;
