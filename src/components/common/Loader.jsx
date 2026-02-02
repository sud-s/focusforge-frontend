import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full w-full p-4">
      <Loader2 className="animate-spin text-primary" size={32} />
    </div>
  );
};

export default Loader;
