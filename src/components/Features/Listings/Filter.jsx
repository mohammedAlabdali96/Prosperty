"use client";
import FormSelect from "@/components/UI/FormSelect";
import {
  getPropertyLocations,
  getPropertyTypes,
} from "@/services/properties.service";
import { mapLabelValue, parseQueryParams } from "@/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import qs from "qs";

export default function Filter({ totalResults = 0 }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isTablet = useMediaQuery("(min-width: 768px)");

  const [types, setTypes] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    Promise.all([getPropertyTypes(), getPropertyLocations()]).then((res) => {
      const [typeData, locationData] = res;

      setTypes(mapLabelValue(typeData));
      setLocations(mapLabelValue(locationData));
    });
  }, []);

  const [filter, setFilter] = useState({
    "property-types": searchParams.get("property-types") || "",
    "property-locations": searchParams.get("property-locations") || "",
    bed_room: searchParams.get("bed_room") || "",
    search: searchParams.get("search") || "",
  });

  const handleFilterChange = (key, value) => {
    setFilter((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleFilter = () => {
    const queryParams = qs.stringify(parseQueryParams(filter), {
      skipNulls: true,
    });
    router.push(`?${queryParams}`);
  };

  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 md:mt-4">
          Found properties: {totalResults}
        </p>
        <button
          onClick={() => setOpen(!open)}
          className="btn btn-primary btn-outline btn-sm md:hidden"
        >
          <HiOutlineFilter />
        </button>
      </div>
      {/* filter */}
      {(open || isTablet) && (
        <div className="bg-[#C8E4FF]/30 md:bg-transparent md:flex md:justify-end md:items-end md:gap-3 p-3 rounded-lg mt-4">
          <FormSelect
            label="Type"
            options={types}
            value={filter["property-types"]}
            onChange={(e) =>
              handleFilterChange("property-types", e.target.value)
            }
          />
          <FormSelect
            label="Bed Room"
            value={filter.bed_room}
            onChange={(e) => handleFilterChange("bed_room", e.target.value)}
            options={[
              {
                label: "1 Bedroom",
                value: 1,
              },
              {
                label: "2 Bedroom",
                value: 2,
              },
              {
                label: "3 Bedroom",
                value: 3,
              },
              {
                label: "4 Bedroom",
                value: 4,
              },
              {
                label: "5 Bedroom",
                value: 5,
              },
              {
                label: "6 Bedroom",
                value: 6,
              },
            ]}
          />
          <FormSelect
            value={filter["property-locations"]}
            label="Location"
            options={locations}
            onChange={(e) =>
              handleFilterChange("property-locations", e.target.value)
            }
          />
          <button
            onClick={handleFilter}
            className="btn btn-primary mt-3 w-full md:w-auto"
          >
            Filter
          </button>
        </div>
      )}
    </div>
  );
}
