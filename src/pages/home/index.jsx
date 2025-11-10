import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/dashboard-layouts";
import { useInventory } from "../../context/inventory-context";
import ReceiptModal from "../../components/modal/receipt";
import { Link } from "react-router-dom";

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

  const [darkMode, setDarkMode] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedDisplay, setSelectedDisplay] = useState('');
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Category configuration with organized labels
  const categoryConfig = {
    groups: [
      {
        label: "IRON 100",
        models: [
          {
            display: "IRON 100",
            value: "IRON 100"
          }
        ]
      },
      {
        label: "IRON 647",
        models: [
          {
            display: "IRON 647",
            variants: [
              { display: "IRON 647 - Mercury 150 V6 Pro XS", value: "IRON 647 - Mercury 150 V6 Pro XS" },
              { display: "IRON 647 - Mercury 200 V8 Pro XS", value: "IRON 647 - Mercury 200 V8 Pro XS" },
              { display: "IRON 647 - Mercury 200 V6 DTS", value: "IRON 647 - Mercury 200 V6 DTS" }
            ]
          },
        ]
      },
      {
        label: "IRON 707",
        models: [
          {
            display: "IRON 707",
            variants: [
              { display: "IRON 707 - Mercury 200 V6 DTS", value: "IRON 707 - Mercury 200 V6 DTS" },
              { display: "IRON 707 - Mercury 225 V6 DTS", value: "IRON 707 - Mercury 225 V6 DTS" },
              { display: "IRON 707 - Mercury 200 V8 PROXS", value: "IRON 707 - Mercury 200 V8 PROXS" },
              { display: "IRON 707 - Mercury 250 V8 PROXS", value: "IRON 707 - Mercury 250 V8 PROXS" },
              { display: "IRON 707 - Mercury 250 V8 Verado", value: "IRON 707 - Mercury 250 V8 Verado" }
            ]
          },
        ]
      },
      // IRON 767
      {
        label: "IRON 767",
        models: [
          {
            display: "IRON 767",
            variants: [
              { display: "IRON 767 - Mercury 250 V8 PROXS", value: "IRON 767 - Mercury 250 V8 PROXS" },
              { display: "IRON 767 - Mercury 250 V8 Verado", value: "IRON 767 - Mercury 250 V8 Verado" },
              { display: "IRON 767 - Mercury 300 V8 VERADO", value: "IRON 767 - Mercury 300 V8 VERADO" }
            ]
          },
        ]
      },
      // IRON 827
      {
        label: "IRON 827",
        models: [
          {
            display: "IRON 827",
            variants: [
              { display: "IRON 827 - Mercury 250 V8 PRO-XS", value: "IRON 827 - Mercury 250 V8 PRO-XS" },
              { display: "IRON 827 - Mercury 250 V8 Verado", value: "IRON 827 - Mercury 250 V8 Verado" },
              { display: "IRON 827 - Mercury 300 V8 VERADO", value: "IRON 827 - Mercury 300 V8 VERADO" },
              { display: "IRON 827 - Mercury 350 V10 VERADO", value: "IRON 827 - Mercury 350 V10 VERADO" },
              { display: "IRON 827 - Mercury 400 V10 VERADO", value: "IRON 827 - Mercury 400 V10 VERADO" },
              { display: "IRON 827 - Mercury 450R V8 VERADO", value: "IRON 827 - Mercury 400 V10 VERADO" }
            ]
          },
        ]
      },
      // IRON 827 COUPE
      {
        label: "IRON 827 Coupe",
        models: [
          {
            display: "IRON 827 Coupe",
            variants: [
              { display: "IRON 827 COUPE - Mercury 250 V8 Pro-XS", value: "IRON 827 COUPE - Mercury 250 V8 Pro-XS" },
              { display: "IRON 827 COUPE - Mercury 300 V8 VERADO", value: "IRON 827 COUPE - Mercury 300 V8 VERADO" },
              { display: "IRON 827 COUPE - Mercury 350 V10 VERADO", value: "IRON 827 COUPE - Mercury 350 V10 VERADO" },
              { display: "IRON 827 COUPE - Mercury 400 V10 VERADO", value: "IRON 827 COUPE - Mercury 400 V10 VERADO" },
              { display: "IRON 827 COUPE - Mercury 450R V8 VERADO", value: "IRON 827 COUPE - Mercury 450R V8 VERADO" }
            ]
          },
        ]
      },
      {
        label: "IRON 907",
        models: [
          {
            display: "IRON 907",
            value: "IRON 907"
          }
        ]
      }

    ]
  };

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
    setIsLoading(true);
    const selectedOption = e.target.options[e.target.selectedIndex];
    const displayText = selectedOption.text;
    const categoryValue = selectedOption.getAttribute('data-category');
    const categoryLabel = selectedOption.getAttribute('data-category-label');

    setSelectedDisplay(displayText);
    setSelectedCategory(categoryValue);
    setSelectedCategoryLabel(categoryLabel);

    localStorage.setItem('selectedCategory', categoryValue);
    localStorage.setItem('selectedDisplay', displayText);
    localStorage.setItem('selectedCategoryLabel', categoryLabel);

    // Simulate loading for better UX
    setTimeout(() => setIsLoading(false), 500);
  };

  const formatCurrency = (amount) => {
    const roundedAmount = Math.round(amount);
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(roundedAmount);
  };

  const calculateTotals = () => {
    const totals = selectedItems.reduce((acc, item) => {
      const roundedRRP = Math.round(item.rrpInGST);
      acc.totalRRP += roundedRRP;
      return acc;
    }, {
      totalRRP: 0
    });

    return totals;
  };

  const totals = calculateTotals();

  const getRoundedRRP = (rrpInGST) => {
    return Math.round(rrpInGST);
  };

  const handleItemSelect = (item) => {
    const roundedRRP = getRoundedRRP(item.rrpInGST);

    // FIXED: Use item.itemCode consistently
    if (selectedItems.some(selected => selected.code === item.itemCode)) {
      removeItem(item.itemCode);
    } else {
      addItem({
        code: item.itemCode, // CHANGED: from item.code to item.itemCode
        name: item.itemName, // CHANGED: from item.name to item.itemName
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

  // Safe current items with fallback
  const currentItems = selectedCategory && categories && categories[selectedCategory]
    ? categories[selectedCategory]
    : [];

  // Safe filtered items with fallback
  const filteredItems = currentItems ? currentItems.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemCode.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto p-6 relative z-10">
          {/* Enhanced Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400">
                    IRON Boats
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                    Build Your Dream Boat Package
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Enhanced Categories Sidebar */}
            <div className="lg:col-span-2 ">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/20 dark:border-gray-700/50 transition-all duration-500 sticky top-6 hover:shadow-2xl">
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Select Boat Model
                    </label>
                  </div>
                  <div className="relative group">
                    <select
                      value={selectedDisplay}
                      onChange={handleCategoryChange}
                      className="w-full px-5 text-lg bg-white/50 dark:bg-gray-700/50 border-2 border-gray-300/50 dark:border-gray-600/50 rounded-2xl shadow-lg focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 dark:focus:ring-blue-400/30 transition-all duration-300 appearance-none cursor-pointer focus:outline-none text-gray-900 dark:text-white backdrop-blur-sm group-hover:border-blue-400 dark:group-hover:border-blue-500 font-semibold h-16"
                    >
                      <option value="" className="text-gray-500 text-lg">Choose your boat model</option>

                      {categoryConfig.groups.map((group) => (
                        <optgroup
                          key={group.label}
                          label={group.label}
                          className="font-bold text-gray-900 dark:text-white text-lg"
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
                                  className={`py-4 ml-4 text-lg ${index < model.variants.length - 1
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
                                  className="py-4 text-lg"
                                >
                                  {model.display}
                                </option>
                              );
                            }
                          })}
                        </optgroup>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-700 dark:text-gray-300">
                      <svg className="h-7 w-7 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Enhanced Selected Items Summary */}
                {selectedItems.length > 0 && (
                  <div className="mt-6 p-5 bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20 border-2 border-emerald-200/50 dark:border-emerald-500/30 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-emerald-800 dark:text-emerald-300 font-bold text-lg">
                          {selectedItems.length} Item{selectedItems.length !== 1 ? 's' : ''} Selected
                        </span>
                      </div>
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {selectedItems.length}
                      </div>
                    </div>
                    <p className="text-emerald-700 dark:text-emerald-400 text-xl font-bold mb-4">
                      Total: {formatCurrency(totals.totalRRP)}
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowReceipt(true)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                      >
                        <span>View Quote</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                      <button
                        onClick={clearAllItems}
                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                      >
                        <span>Clear All</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Main Content */}
            <div className="lg:col-span-3 min-w-0">
              {selectedCategory ? (
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/20 dark:border-gray-700/50 transition-all duration-500 w-full min-w-0 hover:shadow-2xl">
                  {/* Enhanced Header with Search */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 min-w-0 space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-4 min-w-0 flex-1">
                      <div className="w-3 h-10 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                      <div className="min-w-0">
                        <h2 className="text-md lg:text-lg font-bold text-gray-800 dark:text-white truncate min-w-0">
                          {selectedDisplay || selectedCategory}
                        </h2>
                        {selectedCategoryLabel && (
                          <div className="flex items-center space-x-3 mt-2">
                            <span className="px-3 py-1 bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium whitespace-nowrap border border-blue-500/20">
                              {selectedCategoryLabel}
                            </span>
                            <span className="px-3 py-1 bg-purple-500/10 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium whitespace-nowrap border border-purple-500/20">
                              {filteredItems.length} items available
                            </span>
                            {isLoading && (
                              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-sm">Loading...</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full lg:w-64">
                      <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-300/50 dark:border-gray-600/50 focus:outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-all duration-300 text-gray-900 dark:text-white backdrop-blur-sm"
                      />
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Enhanced Items Grid */}
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 w-full min-w-0 custom-scrollbar">
                    {filteredItems.length > 0 ? (
                      filteredItems.map(item => {
                        const isSelected = isItemSelected(item.itemCode);
                        const roundedRRP = getRoundedRRP(item.rrpInGST);

                        return (
                          <div
                            key={item.itemCode}
                            className={`p-6 border-2 rounded-2xl transition-all duration-500 cursor-pointer transform w-full min-w-0 group ${isSelected
                              ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 shadow-lg ring-2 ring-emerald-500/20'
                              : 'border-gray-200/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-700/50 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg'
                              }`}
                            onClick={() => handleItemSelect(item)}
                          >
                            <div className="flex items-start space-x-4 min-w-0">
                              {/* Enhanced Selection Indicator */}
                              <div className="flex-shrink-0 mt-1">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 ${isSelected
                                  ? 'bg-emerald-500 border-emerald-500 shadow-lg'
                                  : 'bg-white dark:bg-gray-600 border-gray-400 group-hover:border-blue-400'
                                  }`}>
                                  {isSelected && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                              </div>

                              <div className="flex-1 min-w-0 overflow-hidden">
                                <div className="flex flex-col lg:flex-row lg:items-start justify-between min-w-0 space-y-3 lg:space-y-0">
                                  <div className="min-w-0 flex-1">
                                    <h4 className={`font-bold text-lg lg:text-xl break-words min-w-0 pr-2 leading-tight ${isSelected
                                      ? 'text-emerald-700 dark:text-emerald-300'
                                      : 'text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300'
                                      }`}>
                                      {item.itemName}
                                    </h4>
                                    <span className="inline-block mt-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-lg font-mono">
                                      {item.itemCode}
                                    </span>
                                  </div>

                                  {/* Enhanced Price Display */}
                                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-600 dark:to-gray-700 rounded-xl border-2 border-gray-200/50 dark:border-gray-500/50 p-4 min-w-[140px] text-center transform transition-all duration-300 group-hover:shadow-lg">
                                    <div className="text-xs text-gray-600 dark:text-gray-300 font-semibold uppercase tracking-wide mb-2">
                                      Your Price
                                    </div>
                                    <div className={`text-2xl font-bold ${isSelected
                                      ? 'text-emerald-600 dark:text-emerald-400'
                                      : 'text-gray-900 dark:text-white'
                                      }`}>
                                      {formatCurrency(roundedRRP)}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                      inc GST
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center">
                          <svg className="w-10 h-10 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {currentItems.length === 0 ? 'No items available for this category' : 'No items found'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          {currentItems.length === 0 ? 'Please select a different boat model' : 'Try adjusting your search terms'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Enhanced Welcome State
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-white/20 dark:border-gray-700/50 transition-all duration-500 w-full transform hover:scale-[1.01]">
                  <div className="max-w-2xl mx-auto">
                    <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                      <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                      </svg>
                    </div>
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 mb-6">
                      Welcome to IRON Boats
                    </h3>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                      Select a boat model to explore our premium collection and build your perfect marine package with cutting-edge technology and superior craftsmanship.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="p-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-2xl border-2 border-blue-200/50 dark:border-blue-500/30 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="w-12 h-12 mx-auto mb-4 bg-blue-500 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3 text-lg">Premium Models</h3>
                        <p className="text-blue-600 dark:text-blue-400 text-sm leading-relaxed">From agile 647 to luxurious 907 series</p>
                      </div>
                      <div className="p-8 bg-gradient-to-br from-emerald-500/10 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20 rounded-2xl border-2 border-emerald-200/50 dark:border-emerald-500/30 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="w-12 h-12 mx-auto mb-4 bg-emerald-500 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-emerald-800 dark:text-emerald-300 mb-3 text-lg">Advanced Features</h3>
                        <p className="text-emerald-600 dark:text-emerald-400 text-sm leading-relaxed">State-of-the-art electronics & fishing gear</p>
                      </div>
                      <div className="p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-2xl border-2 border-purple-200/50 dark:border-purple-500/30 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="w-12 h-12 mx-auto mb-4 bg-purple-500 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3 text-lg">Powerful Engines</h3>
                        <p className="text-purple-600 dark:text-purple-400 text-sm leading-relaxed">Mercury 150HP to 500HP performance</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Floating Checkout Button */}
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
                <span>View Quote</span>
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

        {/* Receipt Modal */}
        {showReceipt && (
          <ReceiptModal
            setShowReceipt={setShowReceipt}
            selectedItems={selectedItems}
            selectedDisplay={selectedDisplay}
            selectedCategoryLabel={selectedCategoryLabel}
            totals={{
              totalRRP: totals.totalRRP
            }}
          />
        )}

        {/* Custom CSS for enhanced scrollbar */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(156, 163, 175, 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(59, 130, 246, 0.3);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(59, 130, 246, 0.5);
          }
          .animate-bounce-slow {
            animation: bounce 3s infinite;
          }
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}</style>
      </div>
    </DashboardLayout>
  )
}

export default Home;