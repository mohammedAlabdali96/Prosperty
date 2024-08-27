import { Link } from "@/navigation";
import { getPropertyLocations } from "@/services/properties.service";

const getData = async () => {
  return await getPropertyLocations();
};

export default async function LocationList() {
  const propertyLocations = await getData();

  return (
    <div className="flex gap-2">
      {propertyLocations.map((location) => {
        return (
          <Link
            href={`/listings?property-locations=${location.id}`}
            key={location.id}
            className="btn btn-location"
          >
            {location.name}
          </Link>
        );
      })}
    </div>
  );
}
