"use client"; 

import { createContext, useState, useEffect } from "react";
// import data from "../data/data"; 
// import data from "../data/blogData"; 

// Create the context
const DataContext = createContext(null); 

// Create the provider component
const DataProvider = ({ children }) => {
  const [songData, setSongData] = useState([]);

  // useEffect(() => {
  //   setSongData(data); 
  // }, []);
  // console.log(songData)


  useEffect(() => {
    fetch("https://shalomworship.vercel.app/api/song")
      .then((res) => res.json())
      .then((data) => {
        let okdata = data.result
        setSongData(okdata);
      })
      .catch((error) => {
        console.error("Error fetching song data:", error);
      });
  }, []);
  console.log(songData)

  return (
    <DataContext.Provider value={{ songData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
