import { useState } from 'react';
import { useInventory } from '../../context/inventory-context';
import ReceiptModal from '../../components/modal/receipt';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { selectedItems, removeItem, clearAllItems } = useInventory();
  const [showReceipt, setShowReceipt] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount);
  };

  const calculateTotals = () => {
    const totals = {
      totalRRP: 0,
      totalDealerPrice: 0,
      totalMargin: 0
    };

    selectedItems.forEach(item => {
      totals.totalRRP += item.rrpInGST;
      totals.totalDealerPrice += item.dealerPriceInGST;
      totals.totalMargin += item.dealerMargin;
    });

    return totals;
  };

  const totals = calculateTotals();

if (selectedItems.length === 0) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <div className="max-w-2xl w-full">
        {/* 3D Card Effect */}
        <div className="relative group cursor-pointer">
          {/* Card Shadow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          
          {/* Main Card */}
          <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl p-12 shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500">
            
            {/* Floating Icons */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>

            <div className="text-center space-y-8">
              {/* Animated Illustration */}
              <div className="relative mx-auto w-48 h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full transform rotate-6 opacity-20 animate-pulse"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center transform -rotate-6 transition duration-500 group-hover:rotate-0">
                  <svg className="w-20 h-20 text-white transform group-hover:scale-110 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h1 className="text-5xl font-black bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent">
                  Start Building
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                  Your collection is empty. Let's find some amazing items that match your style and needs.
                </p>
              </div>

              {/* Action Button */}
              <Link
                to="/dealer"
                className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-extrabold text-lg px-12 py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg group/btn"
              >
                <span>Browse Premium Items</span>
                <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex justify-center mt-12 gap-8 text-center">
          {[
            { label: 'Premium Items', value: '1K+' },
            { label: 'Categories', value: '50+' },
            { label: 'Instant Access', value: '24/7' }
          ].map((stat, index) => (
            <div key={index} className="text-center transform hover:scale-110 transition duration-300">
              <div className="text-2xl font-black bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="max-w-6xl mx-auto p-6">
     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Checkout Summary</h1>
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
      <Link
        to="/dealer"
        className="bg-gray-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium text-center text-sm sm:text-base"
      >
        Back to Selection
      </Link>
      <button
        onClick={() => setShowReceipt(true)}
        className="bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium text-center text-sm sm:text-base"
      >
        Show Receipt
      </button>
      <button
        onClick={clearAllItems}
        className="bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium text-center text-sm sm:text-base"
      >
        Clear All
      </button>
    </div>
  </div>


      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-sm text-gray-600">Total Items</div>
          <div className="text-2xl font-bold text-gray-800">{selectedItems.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-sm text-gray-600">Total RRP (inc GST)</div>
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(totals.totalRRP)}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-sm text-gray-600">Total Margin</div>
          <div className="text-2xl font-bold text-purple-600">{formatCurrency(totals.totalMargin)}</div>
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
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-xs text-gray-600">RRP (inc GST)</div>
                      <div className="font-semibold text-blue-600">{formatCurrency(item.rrpInGST)}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-xs text-gray-600">Dealer Price (inc GST)</div>
                      <div className="font-semibold text-purple-600">{formatCurrency(item.dealerPriceInGST)}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-xs text-gray-600">Dealer Margin</div>
                      <div className={`font-semibold ${item.dealerMargin > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(item.dealerMargin)}
                      </div>
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
            <p className="text-sm text-blue-700">All prices include GST</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-900">
              {formatCurrency(totals.totalDealerPrice)}
            </div>
            <div className="text-sm text-blue-700">
              Total Margin: {formatCurrency(totals.totalMargin)}
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