"use client";
import useMyFavorites from "@/hooks/useMyFavorites";
import { FaWhatsapp } from "react-icons/fa";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";

export default function AgentInfo({ property }) {
  const { handleAddToFavorite, checkIfFavorited } = useMyFavorites();
  return (
    <div className="space-y-6 p-6 shadow-lg rounded-xl md:w-1/4">
      <div className="flex gap-3">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={property?.agent?.acf?.profile_picture}
          alt=""
        />
        <div>
          <p className="text-lg font-bold mb-1">{property?.agent?.acf?.name}</p>
          <p className="text-gray-600">
            Member Since {property?.agent?.acf?.joined_date.split("/").pop()}
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <button className="btn btn-success btn-block">
          <FaWhatsapp className="text-lg" />
          Contact Agent
        </button>
        <button
          onClick={() => handleAddToFavorite(property)}
          className="btn btn-outline btn-block"
        >
          {checkIfFavorited(property.id) ? (
            <RiHeartFill className="text-lg" />
          ) : (
            <RiHeartLine className="text-lg" />
          )}
          Save Property
        </button>
      </div>
    </div>
  );
}
