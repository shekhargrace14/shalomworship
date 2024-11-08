"use client"; 

import { createContext, useState, useEffect } from "react";
import data from "../data/blogData"; 

// Create the context
const DataContext = createContext(null); 

// Create the provider component
const DataProvider = ({ children }) => {
  const [songData, setSongData] = useState([]);

  useEffect(() => {
    setSongData(data); 
  }, []);
  console.log(songData)

  return (
    <DataContext.Provider value={{ songData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
