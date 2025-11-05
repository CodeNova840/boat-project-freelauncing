import { useInventory } from '../context/InventoryContext';

const InventorySelector = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    addItem,
    selectedItems
  } = useInventory();

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory('');
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleItemSelect = (item) => {
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Boat Inventory Selector
      </h1>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Category:
        </label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Choose a category</option>
          {Object.keys(categories).map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Selection */}
      {selectedCategory && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Subcategory:
          </label>
          <select
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose a subcategory</option>
            {currentSubcategories.map(subcategory => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Items List */}
      {selectedSubcategory && currentItems.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Available Items in {selectedSubcategory}
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {currentItems.map(item => (
              <div
                key={item.code}
                className={`p-4 border rounded-lg transition-all duration-200 ${
                  isItemSelected(item.code)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isItemSelected(item.code)}
                    onChange={() => handleItemSelect(item)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Cost:</span> ${item.costExGST.toFixed(2)}
                      </div>
                      <div>
                        <span className="font-medium">RRP:</span> ${item.rrpExGST.toFixed(2)}
                      </div>
                      <div>
                        <span className="font-medium">Dealer Price:</span> ${item.dealerPriceExGST.toFixed(2)}
                      </div>
                      <div>
                        <span className="font-medium">Margin:</span> ${item.dealerMargin.toFixed(2)}
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Code: {item.code}
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation to Checkout */}
      {selectedItems.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-green-800">
              {selectedItems.length} item(s) selected
            </span>
            <a
              href="/checkout"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Proceed to Checkout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventorySelector;