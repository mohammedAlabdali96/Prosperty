import SocmedItem from "@/components/Features/Agents/SocmedItem";
import BaseLayout from "@/components/Layouts/BaseLayout";
import PropertyLists from "@/components/Lists/PropertyLists";
import CallToAction from "@/components/UI/CallToAction";
import { getAgentBySlug } from "@/services/agents.service";
import { getProperties } from "@/services/properties.service";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import parse from "html-react-parser";
import { notFound } from "next/navigation";

const getData = async (params, locale, slug) => {
  const agent = await getAgentBySlug(slug, locale);

  if (!agent) {
    return notFound();
  }

  const properties = await getProperties({ agent_id: agent.id }, locale);

  return { agent, properties };
};

export default async function AgentDetailPage({ searchParams, params }) {
  const { agent, properties } = await getData(
    searchParams,
    params.locale,
    params.slug
  );

  return (
    <BaseLayout theme="dark">
      <div
        className="h-[300px] md:h-[250px] flex items-center justify-center"
        style={{
          background: "url(/assets/agent.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="custom-container space-y-6">
        {/* agent info card */}
        <div className="p-4 md:p-8 rounded-xl mt-[-200px] md:mt-[-100px] bg-white space-y-6 shadow-lg">
          {/* agent top container */}
          <div className="space-y-6 md:flex md:justify-start md:gap-20">
            {/* agent info container */}
            <div className="space-y-4 md:w-4/5">
              {/* wrapper agent picture desktop & agent info */}
              <div className="md:flex gap-6">
                {/* agent picture desktop */}
                <div className="md:w-1/5">
                  <img
                    src={agent?.acf?.profile_picture}
                    className="md:w-32 md:h-32"
                    alt=""
                  />
                </div>
                {/* wrapper agent info */}
                <div className="md:space-y-6 md:w-full">
                  {/* agent picture & name */}
                  <div className="flex items-center gap-4">
                    <img
                      src="/assets/agent-1.png"
                      className="w-14 h-14 md:hidden"
                      alt=""
                    />
                    <div>
                      <h1 className="text-md font-bold md:text-2xl">
                        {agent?.acf?.name}
                      </h1>
                      <p className="text-gray-600 text-sm md:text-base">
                        Member since {agent?.acf?.joined_date.split("/").pop()}
                      </p>
                    </div>
                  </div>
                  {/* socmed */}
                  <div className="flex items-center gap-3 md:gap-6">
                    <SocmedItem
                      link={agent?.acf?.social_media?.facebook}
                      icon="/assets/icons/ic-facebook.svg"
                    />
                    <SocmedItem
                      link={agent?.acf?.social_media?.twitter}
                      icon="/assets/icons/ic-twitter.svg"
                    />
                    <SocmedItem
                      link={agent?.acf?.social_media?.instagram}
                      icon="/assets/icons/ic-instagram.svg"
                    />
                    <SocmedItem
                      link={agent?.acf?.social_media?.linkedin}
                      icon="/assets/icons/ic-linkedin.svg"
                    />
                    <SocmedItem
                      link={agent?.acf?.social_media?.tiktok}
                      icon="/assets/icons/ic-tiktok.svg"
                    />
                  </div>
                  {/* stats */}
                  <div className="flex flex-col gap-4 w-full md:flex-row md:justify-between">
                    <div className="text-center flex items-center justify-between md:flex-col md:gap-3">
                      <p className="text-sm md:text-base">Total Property</p>
                      <p className="font-bold md:text-2xl">
                        {agent?.acf?.total_property}
                      </p>
                    </div>
                    <div className="text-center flex items-center justify-between md:flex-col md:gap-3">
                      <p className="text-sm md:text-base">
                        Total Sold Property
                      </p>
                      <p className="font-bold md:text-2xl">
                        {agent?.acf?.total_sold_property}
                      </p>
                    </div>
                    <div className="text-center flex items-center justify-between md:flex-col md:gap-3">
                      <p className="text-sm md:text-base">Middle Price</p>
                      <p className="font-bold md:text-2xl">
                        {agent?.acf?.price_range_property}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* description */}
              <div className="space-y-2">
                <p className="text-sm font-bold md:text-xl">Description</p>
                <div className="text-gray-600 text-xs md:text-base">
                  {parse(agent?.acf?.description)}
                </div>
              </div>
            </div>
            {/* agent button */}
            <div className="space-y-3 md:w-1/5">
              <a
                href={`//wa.me/${agent?.acf?.phone}`}
                className="btn btn-success btn-block"
                target="_blank"
                rel="noreferrer noopener"
              >
                <FaWhatsapp className="text-lg" />
                Contact Agent
              </a>
              <a
                href={`mailto:${agent?.acf?.email}`}
                className="btn btn-outline btn-block"
              >
                <HiOutlineMail className="text-lg" />
                Send an Email
              </a>
            </div>
          </div>
        </div>
        {/* property list */}
        <div className="mt-12 space-y-6">
          <h2 className="font-bold text-lg md:text-2xl">List Iklan</h2>
          <PropertyLists properties={properties} />
        </div>
        <CallToAction />
      </div>
    </BaseLayout>
  );
}
