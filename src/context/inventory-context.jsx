// context/inventory-context.js
import { createContext, useContext, useState, useEffect } from 'react';
import inventoryCategories from '../constants/boat-data';
import { useNavigate } from 'react-router-dom';

const InventoryContext = createContext();

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export const InventoryProvider = ({ children }) => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

useEffect(() => {
  const savedItems = localStorage.getItem('selectedInventoryItems');
  if (savedItems) {
    try {
      const parsedItems = JSON.parse(savedItems);
      setSelectedItems(parsedItems);
    } catch {
      setSelectedItems([]);
    }
  }
  setHasLoaded(true);
}, []);

useEffect(() => {
  if (!hasLoaded) return; // wait until data is loaded before saving
  localStorage.setItem('selectedInventoryItems', JSON.stringify(selectedItems));
}, [selectedItems, hasLoaded]);
  const addItem = (item) => {
    console.log('Adding item:', item); // Debug log
    setSelectedItems(prev => {
      // Check if item already exists
      const exists = prev.find(i => i.code === item.code);
      if (!exists) {
        const newItems = [...prev, item];
        console.log('New items array:', newItems); 
        return newItems;
      }
      console.log('Item already exists, returning previous state'); // Debug log
      return prev;
    });
  };

  const removeItem = (itemCode) => {
    console.log('Removing item:', itemCode); // Debug log
    setSelectedItems(prev => {
      const newItems = prev.filter(item => item.code !== itemCode);
      console.log('Items after removal:', newItems); // Debug log
      return newItems;
    });
  };

  const clearAllItems = () => {
    console.log('Clearing all items'); // Debug log
    setSelectedItems([]);
    localStorage.removeItem('selectedInventoryItems');
    if (selectedItems.length === 0) {
      console.log("hello")
      navigate('/home')
    }
  };

  const value = {
    selectedItems,
    addItem,
    removeItem,
    clearAllItems,
    selectedCategory,
    setSelectedCategory,
    categories: inventoryCategories
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};