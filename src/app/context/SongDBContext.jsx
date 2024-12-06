"use client"; 

import { createContext, useState, useEffect } from "react";


// Create the context
const DataContext = createContext(null); 

// Create the provider component
const DataProvider = ({ children }) => {
  const [songData, setSongData] = useState([]);

  // useEffect(() => {
  //   fetch("https://shalomworship.vercel.app/api/song")
  //   .then((res) => res.json())
  //   .then((data)=>{

  //     setSongData(data); 
  //   })
  // }, []);


  useEffect(() => {
    fetch("https://shalomworship.vercel.app/api/song")
      .then((res) => res.json())
      .then((data) => {
        setSongData(data);
      })
      .catch((error) => {
        console.error("Error fetching song data:", error);
      });
  }, []);

  console.log(songData,"songData")

  return (
    <DataContext.Provider value={{ songData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
