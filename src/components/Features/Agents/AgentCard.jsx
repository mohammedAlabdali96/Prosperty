import { Link } from "@/navigation";
import { getProperties } from "@/services/properties.service";

const getData = async (agentId) => {
  return await getProperties({ agent_id: agentId, per_page: 3 });
};

export default async function AgentCard({ agent }) {
  const properties = await getData(agent.id);

  console.log(agent);

  return (
    <div className="p-3 md:p-6 rounded-lg md:rounded-xl border border-gray-200">
      <div className="space-y-6">
        <div className="space-y-6 relative">
          {/* agent profile picture & name */}
          <div className="flex items-center gap-3">
            <img
              src={agent?.acf?.profile_picture}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover object-center"
              alt=""
            />
            <div>
              <p className="font-bold md:text-lg">{agent?.acf?.name}</p>
              <span className="text-sm text-gray-600 md:text-base">
                Member since {agent?.acf?.joined_date.split("/").pop()}
              </span>
            </div>
          </div>
          {/* agent stats */}
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-xs md:text-base">Total Property</p>
              <p className="font-bold md:text-xl">
                {agent?.acf?.total_property}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs md:text-base">Total Sold Property</p>
              <p className="font-bold md:text-xl">
                {agent?.acf?.total_sold_property}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs md:text-base">Middle Price</p>
              <p className="font-bold md:text-xl">
                {agent?.acf?.price_range_property}
              </p>
            </div>
          </div>
          <Link
            className="absolute inset-0 w-full h-full"
            href={`/agents/${agent.slug}`}
          ></Link>
        </div>
        {/* agent ads */}
        <div className="space-y-3">
          <p className="text-gray-600 text-sm md:text-base">List Iklan</p>
          <div className="grid grid-cols-3 gap-4">
            {properties.map((property) => {
              return (
                <Link href={`/listings/${property.slug}`} className="w-full">
                  <img
                    key={property.id}
                    src={property?.acf?.thumbnail}
                    className="h-[40px] md:h-[80px] w-full rounded-lg object-cover"
                    alt=""
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
