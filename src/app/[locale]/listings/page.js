import Filter from "@/components/Features/Listings/Filter";
import BaseLayout from "@/components/Layouts/BaseLayout";
import PropertyLists from "@/components/Lists/PropertyLists";
import CallToAction from "@/components/UI/CallToAction";
import SearchForm from "@/components/UI/SearchForm";
import { getProperties } from "@/services/properties.service";
import { getLocale } from "next-intl/server";

async function getData(params, locale) {
  try {
    return await getProperties(params, locale);
  } catch (error) {
    console.log(error);

    return [];
  }
}

export default async function ListingsPage({ searchParams }) {
  const locale = await getLocale();
  const properties = await getData({ ...searchParams }, locale);

  return (
    <BaseLayout>
      <div className="custom-container space-y-6">
        <div className="space-y-5 md:flex md:items-center md:justify-between md:space-y-0">
          <h1 className="text-xl font-bold">Browse Properties</h1>
          <SearchForm
            wrapperClassName="md:ml-auto md:mr-0 md:w-[400px]"
            inputClassName="border border-gray-300"
            btnClassName="bg-[#C8E4FF] text-primary border border-[#C8E4FF]"
          />
        </div>
        {/* filter & total results */}
        <Filter totalResults={properties.length} />
        <hr />
        <PropertyLists properties={properties} />
        <CallToAction
          image="/assets/image-2.png"
          title="Tired of looking ? Contact us for Recommendation"
        />
      </div>
    </BaseLayout>
  );
}
