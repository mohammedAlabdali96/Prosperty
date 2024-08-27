import { propertySaleTypesMapper } from "@/constants";
import { getPropertySaleTypeById } from "@/services/properties.service";
import { formatThousand } from "@/utils";

const getData = async (id) => {
  if (!id) return null;
  return await getPropertySaleTypeById(id);
};

export default async function Price({ property }) {
  const data = await getData(property?.["property-sale-types"][0]);

  console.log(data);
  return (
    <div>
      <p className="font-bold text-xl">
        Rp {formatThousand(property?.acf?.price)}{" "}
        <span className={`text-gray-600 text-sm font-normal`}>
          {propertySaleTypesMapper[data?.slug]}
        </span>
      </p>
    </div>
  );
}
