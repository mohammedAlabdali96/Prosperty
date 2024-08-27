import PropertyCard from "../UI/PropertyCard";

export default function PropertyLists({ properties = [] }) {
  return (
    <div>
      {/* property card */}
      {properties.length === 0 ? (
        <div className="text-center space-y-6">
          <img
            src="/assets/3d-empty-house.svg"
            className="max-w-[400px] mx-auto"
          />
          <p className="text-xl font-bold">No Properties Found...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => {
            return <PropertyCard key={property.id} property={property} />;
          })}
        </div>
      )}
    </div>
  );
}
