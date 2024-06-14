import React, {createContext, useState, useEffect} from 'react';

// Create a context with an empty array as the default value
export const DataContext = createContext([]);

export const DataProvider = ({children}: {children: []}) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  return <DataContext.Provider value={items}>{children}</DataContext.Provider>;
};
