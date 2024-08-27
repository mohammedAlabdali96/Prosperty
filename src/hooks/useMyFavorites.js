"use client";
import { FavoriteContext } from "@/context/FavoriteProvider";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function useMyFavorites() {
  const { myFavorites, setMyFavorites } = useContext(FavoriteContext);

  const checkIfFavorited = (propertyId) => {
    const foundProperty = myFavorites.find((item) => item.id === propertyId);
    return foundProperty ? true : false;
  };

  const handleAddToFavorite = (property) => {
    const foundFavorite = myFavorites.find((item) => item.id === property.id);
    if (foundFavorite) {
      const filteredFavorites = myFavorites.filter(
        (item) => item.id !== property.id
      );
      setMyFavorites(filteredFavorites);
      toast.success("Berhasil dihapus dari favorit");

      window.localStorage.setItem(
        "__MY_FAVORITES",
        JSON.stringify(filteredFavorites)
      );

      return;
    }

    setMyFavorites((prev) => {
      const newFavorites = [...prev, property];

      window.localStorage.setItem(
        "__MY_FAVORITES",
        JSON.stringify(newFavorites)
      );

      return newFavorites;
    });
    toast.success("Berhasil ditambahkan ke favorit");
  };

  return { myFavorites, setMyFavorites, handleAddToFavorite, checkIfFavorited };
}
