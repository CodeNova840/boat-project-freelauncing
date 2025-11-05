import DashboardLayout from "../../layouts/dashboard-layouts";
import { useInventory } from '../../context/inventory-context'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const DealersHome = () => {
      const {
          categories,
          selectedCategory,
          setSelectedCategory,
          selectedSubcategory,
          setSelectedSubcategory,
          addItem,
          selectedItems
      } = useInventory();
  
      const [darkMode, setDarkMode] = useState(false);
  
      useEffect(() => {
          // Check system preference or stored preference
          const isDark = localStorage.getItem('darkMode') === 'true' ||
              window.matchMedia('(prefers-color-scheme: dark)').matches;
          setDarkMode(isDark);
      }, []);
  
      useEffect(() => {
          // Apply dark mode class to document
          if (darkMode) {
              document.documentElement.classList.add('dark');
          } else {
              document.documentElement.classList.remove('dark');
          }
          localStorage.setItem('darkMode', darkMode);
      }, [darkMode]);
  
      const handleCategoryChange = (e) => {
          setSelectedCategory(e.target.value);
          setSelectedSubcategory('');
      };
  
      const handleSubcategoryChange = (e) => {
          setSelectedSubcategory(e.target.value);
      };
  
      const handleItemSelect = (item) => {
          console.log('Item selected in Home:', item); // Debug log
          addItem(item);
      };
  
      const isItemSelected = (itemCode) => {
          return selectedItems.some(item => item.code === itemCode);
      };
  
      const currentSubcategories = selectedCategory ? Object.keys(categories[selectedCategory]) : [];
      const currentItems = selectedCategory && selectedSubcategory
          ? categories[selectedCategory][selectedSubcategory]
          : [];
  
  return (
    <DashboardLayout>
       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
                <div className="max-w-6xl mx-auto p-6">
                    {/* Header with Theme Toggle */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                                Boat Inventory Selector
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Select items for your boat configuration
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Selection Panel */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300">
                                {/* Category Selection */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                                        Select Category
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedCategory}
                                            onChange={handleCategoryChange}
                                            className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-all duration-200 appearance-none cursor-pointer text-gray-900 dark:text-white"
                                        >
                                            <option value="" className="text-gray-500">Choose a category</option>
                                            {Object.keys(categories).map(category => (
                                                <option key={category} value={category} className="py-2">
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Subcategory Selection */}
                                {selectedCategory && (
                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                                            Select Subcategory
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={selectedSubcategory}
                                                onChange={handleSubcategoryChange}
                                                className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-all duration-200 appearance-none cursor-pointer text-gray-900 dark:text-white"
                                            >
                                                <option value="" className="text-gray-500">Choose a subcategory</option>
                                                {currentSubcategories.map(subcategory => (
                                                    <option key={subcategory} value={subcategory} className="py-2">
                                                        {subcategory}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Selected Items Summary */}
                                {selectedItems.length > 0 && (
                                    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-green-800 dark:text-green-300 font-semibold">
                                                    {selectedItems.length} item(s) selected
                                                </span>
                                                <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                                                    Ready for checkout
                                                </p>
                                            </div>
                                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="lg:col-span-2">
                            {selectedSubcategory && currentItems.length > 0 && (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                            Available in <span className="text-blue-600 dark:text-blue-400">{selectedSubcategory}</span>
                                        </h3>
                                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                                            {currentItems.length} items
                                        </span>
                                    </div>

                                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                        {currentItems.map(item => (
                                            <div
                                                key={item.code}
                                                className={`p-5 border-2 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${isItemSelected(item.code)
                                                        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-lg'
                                                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600'
                                                    }`}
                                                onClick={() => handleItemSelect(item)}
                                            >
                                                <div className="flex items-start space-x-4">
                                                    <div className="flex-shrink-0 mt-1">
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isItemSelected(item.code)
                                                                ? 'bg-blue-500 border-blue-500'
                                                                : 'bg-white dark:bg-gray-600 border-gray-400'
                                                            }`}>
                                                            {isItemSelected(item.code) && (
                                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between">
                                                            <h4 className={`font-semibold text-lg truncate ${isItemSelected(item.code)
                                                                    ? 'text-blue-700 dark:text-blue-300'
                                                                    : 'text-gray-900 dark:text-white'
                                                                }`}>
                                                                {item.name}
                                                            </h4>
                                                            <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-md ml-2">
                                                                {item.code}
                                                            </span>
                                                        </div>

                                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                            <div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500">
                                                                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Cost</div>
                                                                <div className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
                                                                    ${item.costExGST.toFixed(2)}
                                                                </div>
                                                            </div>
                                                            <div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500">
                                                                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">RRP</div>
                                                                <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                                                                    ${item.rrpExGST.toFixed(2)}
                                                                </div>
                                                            </div>
                                                            <div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500">
                                                                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Dealer Price</div>
                                                                <div className="text-lg font-bold text-purple-600 dark:text-purple-400 mt-1">
                                                                    ${item.dealerPriceExGST.toFixed(2)}
                                                                </div>
                                                            </div>
                                                            <div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500">
                                                                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Margin</div>
                                                                <div className={`text-lg font-bold mt-1 ${item.dealerMargin > 0
                                                                        ? 'text-emerald-600 dark:text-emerald-400'
                                                                        : 'text-red-600 dark:text-red-400'
                                                                    }`}>
                                                                    ${item.dealerMargin.toFixed(2)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Empty State */}
                            {!selectedSubcategory && (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center border border-gray-200 dark:border-gray-700 transition-all duration-300">
                                    <div className="max-w-md mx-auto">
                                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
                                            <svg className="w-12 h-12 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                            Select a Category & Subcategory
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Choose from the options on the left to browse available inventory items for your boat configuration.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Checkout Button */}
                    {selectedItems.length > 0 && (
                        <div className="fixed bottom-6 right-6 z-10 animate-bounce">
                            <Link
                                to="/checkout"
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl shadow-2xl font-semibold flex items-center space-x-3 transition-all duration-300 transform hover:scale-105"
                            >
                                <span>Proceed to Checkout</span>
                                <span className="bg-white/20 px-2 py-1 rounded-lg text-sm">
                                    {selectedItems.length}
                                </span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
    </DashboardLayout>
  )
}

export default DealersHome;
