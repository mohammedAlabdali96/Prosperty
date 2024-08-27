"use client";
import { createContext, useEffect, useState } from "react";

export const FavoriteContext = createContext(null);

export default function FavoriteProvider({ children }) {
  const [myFavorites, setMyFavorites] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMyFavorites(JSON.parse(localStorage.getItem("__MY_FAVORITES")) || []);
    }
  }, []);

  return (
    <FavoriteContext.Provider
      value={{
        myFavorites,
        setMyFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
