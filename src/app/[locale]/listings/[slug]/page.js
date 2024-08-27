import GalleryItem from "@/components/Features/Listings/GalleryItem";
import SpecItem from "@/components/Features/Listings/SpecItem";
import BaseLayout from "@/components/Layouts/BaseLayout";
import PropertyLists from "@/components/Lists/PropertyLists";
import CallToAction from "@/components/UI/CallToAction";
import { HiOutlineHeart } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import {
  getProperties,
  getPropertyBySlug,
} from "@/services/properties.service";
import { formatThousand } from "@/utils";
import parse from "html-react-parser";
import AgentInfo from "@/components/Features/Listings/AgentInfo";
import Price from "@/components/Features/Listings/Price";
import { notFound } from "next/navigation";

const getData = async (params, locale, slug) => {
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return notFound();
  }

  const properties = await getProperties(
    { ...params, exclude: property.id, per_page: 3 },
    locale
  );

  return {
    properties,
    property,
  };
};

export default async function DetailPage({ searchParams, params }) {
  const { properties, property } = await getData(
    { ...searchParams },
    params.locale,
    params.slug
  );

  console.log(property);

  return (
    <BaseLayout theme="light">
      <div className="custom-container space-y-6">
        {/* wrapper image */}
        <div className="space-y-6 md:space-y-0 md:flex md:items-start md:gap-10">
          <div className="md:w-3/4">
            {/* big image */}
            <img
              src={property?.acf?.thumbnail}
              className="w-full h-[300px] md:h-[600px] object-cover object-center rounded-xl"
              alt=""
            />
          </div>
          <div className="md:w-1/4">
            {/* galleries */}
            <div className="flex md:h-[600px] flex-nowrap md:flex-col overflow-x-scroll md:overflow-x-hidden md:overflow-y-scroll gallery pb-3 md:gap-4 md:pr-4">
              {property?.acf?.galleries?.map((gallery, index) => {
                return (
                  <GalleryItem image={gallery.image} key={`gallery-${index}`} />
                );
              })}
            </div>
          </div>
        </div>
        {/* detail content & agent */}
        <div className="md:flex md:gap-10 md:items-start">
          {/* content & description */}
          <div className="md:w-3/4">
            {/* content */}
            <div>
              {/* main info */}
              <div className="space-y-3 md:flex md:justify-between md:items-center md:space-y-0">
                <div>
                  <h1 className="font-bold text-2xl mb-2">
                    {property?.title?.rendered}
                  </h1>
                  <p className="text-gray-600">
                    {property?.acf?.short_description}
                  </p>
                </div>
                <Price property={property} />
              </div>
            </div>
            {/* description & specification */}
            <div className="md:flex md:justify-between md:gap-10 md:pt-10">
              {/* description */}
              <div className="md:w-2/3">
                <h2 className="font-bold text-lg mb-3">
                  {property?.acf?.description_title}
                </h2>
                <div className="prose max-w-full text-sm md:text-base">
                  {parse(property?.acf?.description)}
                </div>
              </div>
              {/* specification */}
              <div className="pt-3 space-y-4 md:pt-0 md:w-1/3">
                <p className="font-bold text-lg">Specification</p>
                <div className="space-y-6">
                  <SpecItem
                    title="Kamar Tidur"
                    icon={property?.acf?.specification?.bed_room}
                    value={3}
                  />
                  <SpecItem
                    title="Kamar Mandi"
                    icon={property?.acf?.specification?.bath_room}
                    value={2}
                  />
                  <SpecItem
                    title="Luas Tanah"
                    icon="/assets/icons/detail/ic-land.svg"
                    value={property?.acf?.specification?.land_area + "m²"}
                  />
                  <SpecItem
                    title="Luas Bangunan"
                    icon="/assets/icons/detail/ic-house.svg"
                    value={property?.acf?.specification?.building_area + "m²"}
                  />
                  <SpecItem
                    title="Tipe Properti"
                    icon="/assets/icons/detail/ic-apart.svg"
                    value={"Rumah"}
                  />
                  <SpecItem
                    title="Sertifikat"
                    icon="/assets/icons/detail/ic-certif.svg"
                    value={property?.acf?.specification?.certificate?.value}
                  />
                  <SpecItem
                    title="Daya Listrik"
                    icon="/assets/icons/detail/ic-electric.svg"
                    value={property?.acf?.specification?.electricity + " Watt"}
                  />
                  <SpecItem
                    title="Periode Sewa"
                    icon="/assets/icons/detail/ic-period.svg"
                    value={property?.acf?.specification?.rent_period}
                  />
                  <SpecItem
                    title="Harga Per m2"
                    icon="/assets/icons/detail/ic-m2.svg"
                    value={
                      "Rp " +
                      formatThousand(property?.acf?.specification?.price_per_m2)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          {/* agent */}
          <AgentInfo property={property} />
        </div>
        {/* recommendation */}
        <div className="space-y-4 pt-4">
          <h4 className="text-lg font-bold">Recommendation for you</h4>
          <PropertyLists properties={properties} />
        </div>
        <CallToAction
          image="/assets/image-2.png"
          title="Tired of looking ? Contact us for Recommendation"
        />
      </div>
    </BaseLayout>
  );
}
