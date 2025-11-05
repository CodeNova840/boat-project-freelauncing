import { useState } from 'react';
import { useInventory } from '../../context/inventory-context';

import ReceiptModal from '../../components/modal/receipt';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { selectedItems, removeItem, clearAllItems } = useInventory();
  const [showReceipt, setShowReceipt] = useState(false);


  const calculateTotals = () => {
    const totals = {
      totalCost: 0,
      totalRRP: 0,
      totalDealerPrice: 0,
      totalMargin: 0
    };

    selectedItems.forEach(item => {
      totals.totalCost += item.costExGST;
      totals.totalRRP += item.rrpExGST;
      totals.totalDealerPrice += item.dealerPriceExGST;
      totals.totalMargin += item.dealerMargin;
    });

    return totals;
  };

  const totals = calculateTotals();



  if (selectedItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            No Items Selected
          </h2>
          <p className="text-gray-500 mb-6">
            Please go back and select some items from the inventory.
          </p>
          <Link
            to="/dealer"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Back to Inventory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Checkout Summary</h1>
        <div className="space-x-4">
          <a
            href="/"
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            Back to Selection
          </a>
          <button
            onClick={() => setShowReceipt(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            Show Receipt
          </button>
          <button
            onClick={clearAllItems}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-sm text-gray-600">Total Items</div>
          <div className="text-2xl font-bold text-gray-800">{selectedItems.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-sm text-gray-600">Total Cost</div>
          <div className="text-2xl font-bold text-green-600">${totals.totalCost.toFixed(2)}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-sm text-gray-600">Total RRP</div>
          <div className="text-2xl font-bold text-blue-600">${totals.totalRRP.toFixed(2)}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-sm text-gray-600">Total Margin</div>
          <div className="text-2xl font-bold text-purple-600">${totals.totalMargin.toFixed(2)}</div>
        </div>
      </div>

      {/* Selected Items List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Selected Items ({selectedItems.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {selectedItems.map((item, index) => (
            <div key={item.code} className="p-6 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Code: {item.code}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.code)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-xs text-gray-600">Cost ex GST</div>
                      <div className="font-semibold text-gray-900">${item.costExGST.toFixed(2)}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-xs text-gray-600">RRP ex GST</div>
                      <div className="font-semibold text-gray-900">${item.rrpExGST.toFixed(2)}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-xs text-gray-600">Dealer Price ex GST</div>
                      <div className="font-semibold text-gray-900">${item.dealerPriceExGST.toFixed(2)}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-xs text-gray-600">Dealer Margin</div>
                      <div className="font-semibold text-green-600">${item.dealerMargin.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grand Total */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Grand Total</h3>
            <p className="text-sm text-blue-700">All prices exclude GST</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-900">
              ${totals.totalDealerPrice.toFixed(2)}
            </div>
            <div className="text-sm text-blue-700">
              Total Margin: ${totals.totalMargin.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
       <ReceiptModal setShowReceipt={setShowReceipt} selectedItems={selectedItems} totals={totals} />
      )}
    </div>
  );
};

export default Checkout;