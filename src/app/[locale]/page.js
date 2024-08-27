import ChooseCard from "@/components/Features/Homepage/ChooseCard";
import BaseLayout from "@/components/Layouts/BaseLayout";
import LocationList from "@/components/Lists/LocationList";
import PropertyLists from "@/components/Lists/PropertyLists";
import CallToAction from "@/components/UI/CallToAction";
import SearchForm from "@/components/UI/SearchForm";
import { getProperties } from "@/services/properties.service";
import { getLocale, getTranslations } from "next-intl/server";

async function getData(params, locale) {
  return await getProperties(params, locale);
}

export default async function page({ searchParams }) {
  const t = await getTranslations();
  const locale = await getLocale();
  const properties = await getData({ ...searchParams }, locale);

  return (
    <BaseLayout theme="dark">
      <div
        className="h-[500px] md:h-screen flex items-center justify-center"
        style={{
          background: "url(/assets/homepage.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="custom-container space-y-6 text-center">
          <div className="space-y-2 md:space-y-4">
            <h1 className="text-white text-4xl md:text-6xl md:max-w-[500px] md:mx-auto font-bold leading-relaxed md:leading-[1.5]">
              {t("bannerHome.title")}
            </h1>
            <p className="text-white leading-relaxed md:text-xl">
              {t("bannerHome.subtitle")}
            </p>
          </div>
          <SearchForm />
        </div>
      </div>
      <section className="py-12">
        <div className="custom-container space-y-6 md:space-y-12">
          <h2 className="text-xl font-bold text-center">Why Choose Us</h2>
          {/* wrapper */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* card */}
            <ChooseCard
              image="/assets/icon-1.png"
              title="Property Insurance"
              description="We offer our customer property protection of liability coverage and insurance for their better life."
            />
            <ChooseCard
              image="/assets/icon-2.png"
              title="Property Insurance"
              description="We offer our customer property protection of liability coverage and insurance for their better life."
            />
            <ChooseCard
              image="/assets/icon-3.png"
              title="Property Insurance"
              description="We offer our customer property protection of liability coverage and insurance for their better life."
            />
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="custom-container space-y-6 md:space-y-12">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-xl font-bold">Browse Properties</h2>
            <LocationList />
          </div>

          {/* properties */}
          <PropertyLists properties={properties} />
        </div>
      </section>
      <CallToAction />
    </BaseLayout>
  );
}

// getServerSideProps
