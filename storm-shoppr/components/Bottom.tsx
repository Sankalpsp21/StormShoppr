import React from 'react';

interface BottomRowProps {
  isHurricane: boolean;
}

const BottomRow: React.FC<BottomRowProps> = ({ isHurricane }) => {
  return (
    <>
    {!isHurricane && (
      <div className="absolute bottom-0 w-full z-50 bg-green-700 text-white font-bold text-center p-2 py-4 text-xl">
        Chance of hurricane within the next 7 days: 12% (not likely)
      </div>

    )}
    {isHurricane && (
      <div className="absolute bottom-0 w-full z-50 bg-red-700 text-white font-bold text-center p-2 py-4 text-xl">
        Chance of hurricane within the next 7 days: 82% (very likely)
      </div>
    )}
    </>
  );
};

export default BottomRow;
