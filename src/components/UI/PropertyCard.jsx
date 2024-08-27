"use client";
import useMyFavorites from "@/hooks/useMyFavorites";
import { Link } from "@/navigation";
import { formatThousand } from "@/utils";
import { RiHeartLine } from "react-icons/ri";
import { RiHeartFill } from "react-icons/ri";

export default function PropertyCard({ property }) {
  const { handleAddToFavorite, checkIfFavorited } = useMyFavorites();
  return (
    <div className="rounded-lg md:rounded-xl border border-gray-200 overflow-hidden">
      <div className="h-[230px] md:h-[200px] 2xl:h-[250px] relative">
        <Link href={`/listings/${property.slug}`}>
          <img
            className="h-[230px] md:h-[200px] 2xl:h-[250px] w-full object-cover object-center"
            src={property?.acf?.thumbnail}
            alt=""
          />
        </Link>
        <button
          onClick={() => handleAddToFavorite(property)}
          className="w-[46px] h-[46px] rounded-full bg-white absolute right-0 translate-y-[-26px] translate-x-[-20px] flex items-center justify-center active:scale-[1.1] transition-all"
        >
          {checkIfFavorited(property.id) ? (
            <RiHeartFill className="text-primary text-xl" />
          ) : (
            <RiHeartLine className="text-primary text-xl" />
          )}
        </button>
      </div>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6 relative">
        <div className="space-y-1 md:space-y-2">
          <p>
            <span className="text-primary font-semibold">
              Rp {formatThousand(property?.acf?.price ?? 0)}
            </span>{" "}
          </p>
          <p className="text-xl font-bold">{property?.title?.rendered}</p>
          <p className="text-sm text-gray-600">
            {property?.acf?.short_description}
          </p>
        </div>
        <hr />
        <div className="flex justify-between text-sm max-w-full md:max-w-[90%] mx-auto">
          <div className="flex gap-2">
            <img src="/assets/icons/ic-bed-small.svg" alt="" />
            <p>{property?.acf?.specification?.bed_room} Beds</p>
          </div>
          <div className="flex gap-2">
            <img src="/assets/icons/ic-bath-small.svg" alt="" />
            <p>{property?.acf?.specification?.bath_room} Bathrooms</p>
          </div>
          <div className="flex gap-2">
            <img src="/assets/icons/ic-land-small.svg" alt="" />
            <p>{property?.acf?.specification?.land_area}</p>
          </div>
        </div>
        <Link
          className="absolute inset-0 w-full h-full"
          href={`/listings/${property.slug}`}
        ></Link>
      </div>
    </div>
  );
}
