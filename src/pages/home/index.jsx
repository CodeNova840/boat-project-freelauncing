import { useState } from "react";
import DashboardLayout from "../../layouts/dashboard-layouts";
import { useInventory } from "../../context/inventory-context";
import ReceiptModal from "../../components/modal/receipt";

const Home = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedItems,
    addItem,
    removeItem,
    clearAllItems
  } = useInventory();

  const [showReceipt, setShowReceipt] = useState(false);

  const formatCurrency = (amount) => {
    // Round to nearest dollar for retail customers
    const roundedAmount = Math.round(amount);
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0, // No cents for retail
      maximumFractionDigits: 0  // No cents for retail
    }).format(roundedAmount);
  };

  // Calculate totals for retail customers with rounding to dollars
  const calculateTotals = () => {
    const totals = selectedItems.reduce((acc, item) => {
      // For retail customers, we show RRP prices rounded to nearest dollar
      const roundedRRP = Math.round(item.rrpInGST);
      acc.totalRRP += roundedRRP;
      return acc;
    }, {
      totalRRP: 0
    });

    return totals;
  };

  const totals = calculateTotals();

  // Helper function to get rounded RRP for display (to nearest dollar)
  const getRoundedRRP = (rrpInGST) => {
    return Math.round(rrpInGST);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-200">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-200">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">IRON Boats - Retail Customer</h1>
              <p className="text-gray-600 dark:text-gray-300">Browse our complete inventory and build your quote</p>
            </div>
            
            {/* Selected Items Summary */}
            {selectedItems.length > 0 && (
              <div className="mt-4 lg:mt-0">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-blue-800 dark:text-blue-200 font-semibold">
                        {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                      </p>
                      <p className="text-blue-600 dark:text-blue-300 text-sm">
                        Total: {formatCurrency(totals.totalRRP)} inc GST
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowReceipt(true)}
                        className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm"
                      >
                        View Quote
                      </button>
                      <button
                        onClick={clearAllItems}
                        className="bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-700 dark:hover:bg-red-600 transition-colors text-sm"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sticky top-4 transition-colors duration-200">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Categories</h2>
              <div className="space-y-2">
                {Object.keys(categories).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="font-medium">{category}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedCategory ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedCategory}</h2>
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Categories
                  </button>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories[selectedCategory].map((item) => {
                    const isSelected = selectedItems.some(selected => selected.code === item.itemCode);
                    const roundedRRP = getRoundedRRP(item.rrpInGST);
                    
                    return (
                      <div
                        key={item.itemCode}
                        className={`border rounded-lg p-4 transition-all ${
                          isSelected
                            ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800 dark:text-white text-sm">{item.itemName}</h4>
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                            {item.itemCode}
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                          <div className="flex justify-between">
                            <span>Your Price:</span>
                            <span className="font-medium text-green-600 dark:text-green-400">
                              {formatCurrency(roundedRRP)} inc GST
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => isSelected ? removeItem(item.itemCode) : addItem({
                            code: item.itemCode,
                            name: item.itemName,
                            rrpInGST: roundedRRP, // Store rounded price for retail
                            rrpExGST: roundedRRP / 1.1, // Calculate ex GST from rounded price
                            costExGST: item.dealerPriceInGST / 1.1, // Calculate ex GST (this remains precise for internal use)
                            dealerMargin: item.dealerMargin
                          })}
                          className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                            isSelected
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50'
                              : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                          }`}
                        >
                          {isSelected ? 'Remove from Quote' : 'Add to Quote'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Welcome State
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center transition-colors duration-200">
                <div className="max-w-md mx-auto">
                  <svg
                    className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Welcome to IRON Boats</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Select a category to browse our complete inventory and build your custom boat package.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Boat Models</h3>
                      <p className="text-blue-600 dark:text-blue-400">From 647 to 907 models</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h3 className="font-semibold text-green-800 dark:text-green-300 mb-1">Accessories</h3>
                      <p className="text-green-600 dark:text-green-400">Electronics & fishing gear</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">Engines</h3>
                      <p className="text-purple-600 dark:text-purple-400">Mercury 150HP to 500HP</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Action Button */}
        {selectedItems.length > 0 && (
          <div className="fixed bottom-6 right-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border dark:border-gray-700 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {selectedItems.length}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">Quote Total</p>
                  <p className="text-green-600 dark:text-green-400 font-bold">{formatCurrency(totals.totalRRP)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">inc GST</p>
                </div>
                <button
                  onClick={() => setShowReceipt(true)}
                  className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors text-sm font-medium"
                >
                  View Quote
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Receipt Modal */}
        {showReceipt && (
          <ReceiptModal 
            setShowReceipt={setShowReceipt}
            selectedItems={selectedItems}
            totals={{
              totalRRP: totals.totalRRP
            }}
          />
        )}
      </div>
    </DashboardLayout>
  )
}

export default Home;