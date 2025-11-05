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
  const navigate=useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  // Load selected items from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('selectedInventoryItems');
    console.log('Loading from localStorage:', savedItems); // Debug log
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        setSelectedItems(parsedItems);
        console.log('Loaded items:', parsedItems); // Debug log
      } catch (error) {
        console.error('Error parsing saved items:', error);
        setSelectedItems([]);
      }
    }
  }, []);

  // Save selected items to localStorage whenever they change
  useEffect(() => {
    console.log('Saving to localStorage:', selectedItems); // Debug log
    localStorage.setItem('selectedInventoryItems', JSON.stringify(selectedItems));
  }, [selectedItems]);

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
    if(selectedItems.length===0){
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
    selectedSubcategory,
    setSelectedSubcategory,
    categories: inventoryCategories
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};