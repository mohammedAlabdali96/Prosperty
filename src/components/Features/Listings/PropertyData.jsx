import PropertyLists from "@/components/Lists/PropertyLists";
import { getProperties } from "@/services/properties.service";

async function getData(params, locale) {
  try {
    return await getProperties(params, locale);
  } catch (error) {
    console.log(error);

    return [];
  }
}

export default async function PropertyData({ searchParams, locale }) {
  const properties = await getData({ ...searchParams }, locale);

  return <PropertyLists properties={properties} />;
}
