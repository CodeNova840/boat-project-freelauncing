import DashboardLayout from "../../layouts/dashboard-layouts";
import { useInventory } from '../../context/inventory-context'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { categoryConfig } from "../../constants/categories-config";

const DealersHome = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    addItem,
    removeItem,
    selectedItems
  } = useInventory();

  const [darkMode, setDarkMode] = useState(false);
  const [selectedDisplay, setSelectedDisplay] = useState('');
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);

    const savedCategory = localStorage.getItem('selectedCategory');
    const savedDisplay = localStorage.getItem('selectedDisplay');
    const savedCategoryLabel = localStorage.getItem('selectedCategoryLabel');

    if (savedCategory && categories && categories[savedCategory]) {
      setSelectedCategory(savedCategory);
      if (savedDisplay) {
        setSelectedDisplay(savedDisplay);
      }
      if (savedCategoryLabel) {
        setSelectedCategoryLabel(savedCategoryLabel);
      }
    }
  }, [categories, setSelectedCategory]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleCategoryChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const displayText = selectedOption.text;
    const categoryValue = selectedOption.getAttribute('data-category');
    const categoryLabel = selectedOption.getAttribute('data-category-label');

    setSelectedDisplay(displayText);
    setSelectedCategory(categoryValue);
    setSelectedCategoryLabel(categoryLabel);
    setSearchTerm(''); // Reset search when category changes

    localStorage.setItem('selectedCategory', categoryValue);
    localStorage.setItem('selectedDisplay', displayText);
    localStorage.setItem('selectedCategoryLabel', categoryLabel);
  };

  const handleItemSelect = (item) => {

    if (isItemSelected(item.code)) {
      console.log('Removing item:', item.code);
      removeItem(item.code);
    } else {
      console.log('Adding item:', item);
      // Add category information to the item just like in Home component
      addItem({
        code: item.code,
        name: item.name,
        rrpInGST: item.rrpInGST,
        dealerGST: item.dealerPriceInGST,
        dealerMargin: item.dealerMargin,
        category: selectedCategory,
        categoryLabel: selectedCategoryLabel
      });
    }
  };

  const isItemSelected = (itemCode) => {
    return selectedItems.some(item => item.code === itemCode);
  };

  const currentItems = selectedCategory && categories && categories[selectedCategory]
    ? categories[selectedCategory]
    : [];

  // Filter main items based on search term
  const filteredMainItems = currentItems.filter(item => 
    searchTerm === '' || 
    item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get accessories category
  const getAccessoriesCategory = () => {
    if (!selectedCategory) return null;

    // Find the accessories key from categoryConfig
    for (const group of categoryConfig.groups) {
      for (const model of group.models) {
        if (model.variants) {
          // Model with variants
          const variant = model.variants.find(v => v.value === selectedCategory);
          if (variant && variant.accessories) {
            return variant.accessories;
          }
        } else {
          // Simple model without variants
          if (model.value === selectedCategory && model.accessories) {
            return model.accessories;
          }
        }
      }
    }

    return null;
  };

  // Safe accessories items with fallback
  const accessoriesCategory = getAccessoriesCategory();
  const accessoriesItems = accessoriesCategory && categories && categories[accessoriesCategory]
    ? categories[accessoriesCategory]
    : [];

  // Check if we should show accessories section
  const showAccessoriesSection = accessoriesCategory && accessoriesItems.length > 0;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto p-6">
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

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Selection Panel */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300">
                {/* Category Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    Select Category
                  </label>
                  <div className="relative">
                    <select
                      value={selectedDisplay}
                      onChange={handleCategoryChange}
                      className="w-full text-md pr-10 ps-4 md:px-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-all duration-200 appearance-none cursor-pointer focus:outline-none text-gray-900 dark:text-white md:whitespace-normal truncate md:truncate-0 overflow-ellipsis whitespace-nowrap"
                    >
                      <option value="" className="text-gray-500">Choose a category</option>

                      {categoryConfig.groups.map((group) => (
                        <optgroup
                          key={group.label}
                          label={group.label}
                          className="font-bold text-gray-900 dark:text-white"
                        >
                          {group.models.map((model) => {
                            if (model.variants) {
                              // Model with multiple engine variants
                              return model.variants.map((variant, index) => (
                                <option
                                  key={variant.display}
                                  value={variant.display}
                                  data-category={variant.value}
                                  data-category-label={group.label}
                                  className={`py-2 ml-4 ${index < model.variants.length - 1
                                    ? 'border-b border-gray-200 dark:border-gray-600'
                                    : ''
                                    }`}
                                >
                                  {variant.display}
                                </option>
                              ));
                            } else {
                              // Simple model without variants
                              return (
                                <option
                                  key={model.display}
                                  value={model.display}
                                  data-category={model.value}
                                  data-category-label={group.label}
                                  className="py-2 ml-4"
                                >
                                  {model.display}
                                </option>
                              );
                            }
                          })}
                        </optgroup>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

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
            <div className="lg:col-span-3 min-w-0">
              {selectedCategory && currentItems.length > 0 && (
                <div className="space-y-6">
                  {/* Main Items Section */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 w-full min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 min-w-0 gap-4">
                      <div className="min-w-0">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white truncate min-w-0">
                          {selectedDisplay || selectedCategory}
                        </h3>
                        {selectedCategoryLabel && (
                          <div className="flex items-center flex-col md:flex-row gap-2 md:gap-0 space-x-3 mt-2">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium whitespace-nowrap">
                              {selectedCategoryLabel}
                            </span>
                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium whitespace-nowrap">
                              {filteredMainItems.length} of {currentItems.length} items
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Search Bar for Main Items */}
                      <div className="relative w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          placeholder="Search items..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            <svg className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 w-full min-w-0">
                      {filteredMainItems.length > 0 ? (
                        filteredMainItems.map(item => {
                          return (
                            <div
                              key={item.itemCode}
                              className={`p-5 border-2 rounded-xl transition-all duration-300 cursor-pointer hover:border-blue-800 w-full min-w-0 ${isItemSelected(item.itemCode)
                                ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-lg'
                                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                              onClick={() => handleItemSelect({
                                code: item.itemCode,
                                name: item.itemName,
                                rrpInGST: item.rrpInGST,
                                dealerPriceInGST: item.dealerPriceInGST,
                                dealerMargin: item.dealerMargin
                              })}
                            >
                              <div className="flex items-start space-x-4 min-w-0">
                                <div className="flex-shrink-0 mt-1">
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isItemSelected(item.itemCode)
                                    ? 'bg-blue-500 border-blue-500'
                                    : 'bg-white dark:bg-gray-600 border-gray-400'
                                    }`}>
                                    {isItemSelected(item.itemCode) && (
                                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0 overflow-hidden">
                                  <div className="flex flex-col md:flex-row items-start justify-between min-w-0 ">
                                    <h4 className={`font-semibold text-lg break-words min-w-0 pr-2 ${isItemSelected(item.itemCode)
                                      ? 'text-blue-700 dark:text-blue-300'
                                      : 'text-gray-900 dark:text-white'
                                      }`}>
                                      {item.itemName}
                                    </h4>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-md flex-shrink-0 whitespace-nowrap">
                                      {item.itemCode}
                                    </span>
                                  </div>

                                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                                    <div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 min-h-[80px] flex flex-col justify-center">
                                      <div className="text-sm text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap truncate">
                                        RRP (inc GST)
                                      </div>
                                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1 truncate">
                                        {item.rrpInGST}
                                      </div>
                                    </div>
                                    <div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 min-h-[80px] flex flex-col justify-center">
                                      <div className="text-sm text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap truncate">
                                        Dealer Price
                                      </div>
                                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400 mt-1 truncate">
                                        {item.dealerPriceInGST}
                                      </div>
                                    </div>
                                    <div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 min-h-[80px] flex flex-col justify-center">
                                      <div className="text-sm text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap truncate">
                                        Dealer Margin
                                      </div>
                                      <div className={`text-lg font-bold mt-1 truncate ${item.dealerMargin > 0
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-red-600 dark:text-red-400'
                                        }`}>
                                        {item.dealerMargin}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-8">
                          <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <p className="text-gray-500 dark:text-gray-400 mt-2">No items found matching "{searchTerm}"</p>
                          <button
                            onClick={() => setSearchTerm('')}
                            className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Clear search
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Accessories Section */}
                  {showAccessoriesSection && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 w-full min-w-0">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-3 h-10 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                            {selectedDisplay || selectedCategory} - Accessories
                          </h3>
                          <div className="flex items-center flex-col md:gap-0 md:flex-row gap-2  space-x-3 mt-2">
                            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium whitespace-nowrap">
                              Accessories
                            </span>
                            <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm font-medium whitespace-nowrap">
                              {accessoriesItems.length} accessories available
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 w-full min-w-0">
                        {accessoriesItems.map(item => {
                          return (
                            <div
                              key={item.itemCode}
                              className={`p-5 border-2 rounded-xl transition-all duration-300 cursor-pointer hover:border-orange-800 w-full min-w-0 ${isItemSelected(item.itemCode)
                                ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-lg'
                                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 hover:border-orange-300 dark:hover:border-orange-600'
                                }`}
                              onClick={() => handleItemSelect({
                                code: item.itemCode,
                                name: item.itemName,
                                rrpInGST: item.rrpInGST,
                                dealerPriceInGST: item.dealerPriceInGST,
                                dealerMargin: item.dealerMargin
                              })}
                            >
                              <div className="flex items-start space-x-4 min-w-0">
                                <div className="flex-shrink-0 mt-1">
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isItemSelected(item.itemCode)
                                    ? 'bg-blue-500 border-blue-500'
                                    : 'bg-white dark:bg-gray-600 border-gray-400'
                                    }`}>
                                    {isItemSelected(item.itemCode) && (
                                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0 overflow-hidden">
                                  <div className="flex flex-col md:flex-row items-start justify-between min-w-0 ">
                                    <h4 className={`font-semibold text-lg break-words min-w-0 pr-2 ${isItemSelected(item.itemCode)
                                      ? 'text-blue-700 dark:text-blue-300'
                                      : 'text-gray-900 dark:text-white'
                                      }`}>
                                      {item.itemName}
                                    </h4>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-md flex-shrink-0 whitespace-nowrap">
                                      {item.itemCode}
                                    </span>
                                  </div>

                                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                                    <div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 min-h-[80px] flex flex-col justify-center">
                                      <div className="text-sm text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap truncate">
                                        RRP (inc GST)
                                      </div>
                                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1 truncate">
                                        {item.rrpInGST}
                                      </div>
                                    </div>
                                    <div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 min-h-[80px] flex flex-col justify-center">
                                      <div className="text-sm text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap truncate">
                                        Dealer Price
                                      </div>
                                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400 mt-1 truncate">
                                        {item.dealerPriceInGST}
                                      </div>
                                    </div>
                                    <div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 min-h-[80px] flex flex-col justify-center">
                                      <div className="text-sm text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap truncate">
                                        Dealer Margin
                                      </div>
                                      <div className={`text-lg font-bold mt-1 truncate ${item.dealerMargin > 0
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-red-600 dark:text-red-400'
                                        }`}>
                                        {item.dealerMargin}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Empty State */}
              {!selectedCategory && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center border border-gray-200 dark:border-gray-700 transition-all duration-300 w-full">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      Select a Category
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
                state={{
                  selectedDisplay: selectedDisplay,
                  selectedCategoryLabel: selectedCategoryLabel
                }}
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