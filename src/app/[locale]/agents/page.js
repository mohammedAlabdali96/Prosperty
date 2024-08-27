import AgentList from "@/components/Features/Agents/AgentList";
import BaseLayout from "@/components/Layouts/BaseLayout";
import CallToAction from "@/components/UI/CallToAction";
import SearchForm from "@/components/UI/SearchForm";
import { getAgents } from "@/services/agents.service";

const getData = async (params, locale) => {
  return await getAgents(params, locale);
};

export default async function AgentsPage({ searchParams, params }) {
  const data = await getData(searchParams, params.locale);
  return (
    <BaseLayout theme="dark">
      <div
        className="h-[500px] md:h-[550px] flex items-center justify-center"
        style={{
          background: "url(/assets/agent.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="custom-container space-y-6 text-center">
          <div className="space-y-2 md:space-y-4">
            <h1 className="text-white text-4xl md:text-6xl md:max-w-[500px] md:mx-auto font-bold leading-relaxed md:leading-[1.5]">
              Our Agent
            </h1>
            <p className="text-white leading-relaxed md:text-xl">
              Explore our extensive listings and find the perfect property for
              you
            </p>
          </div>

          <SearchForm placeholder="Search Agent Name..." />
        </div>
      </div>
      <section className="custom-container py-6 space-y-6 md:space-y-12 md:py-12">
        {/* page title */}
        <h2 className="font-bold text-xl md:text-2xl">Browse Agents</h2>
        {/* agent list */}
        <AgentList agents={data} />
        {/* call to action */}
        <CallToAction
          image="/assets/image-2.png"
          title="Tired of looking ? Contact us for Recommendation"
        />
      </section>
    </BaseLayout>
  );
}
