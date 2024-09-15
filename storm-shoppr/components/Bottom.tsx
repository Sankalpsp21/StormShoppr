import React from 'react';

const BottomRow: React.FC = () => {
  return (
    <div className="absolute bottom-0 w-full z-50 bg-green-700 text-white font-bold text-center p-2 py-4 text-xl">
      Chance of hurricane within the next 7 days: 12% (not likely)
    </div>
  );
};

export default BottomRow;
