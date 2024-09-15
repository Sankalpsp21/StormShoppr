import React from 'react';

export interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  orderedItems: Item[];
  deliveryTime: string;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, orderedItems, deliveryTime }) => {
  const calculateTotal = () => {
    return orderedItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg max-w-lg w-full relative">
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-gray-600 hover:text-black">
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Order Confirmation</h2>
            <ul className="space-y-4 mb-4">
              {orderedItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <span className="flex-1 ml-4">{item.name}</span>
                  <span className="font-semibold">${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-300 pt-4 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${calculateTotal()}</span>
            </div>
            <p className="mt-4 text-sm text-gray-500">Estimated delivery time: {deliveryTime}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;