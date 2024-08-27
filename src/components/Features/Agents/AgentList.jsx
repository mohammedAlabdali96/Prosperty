import AgentCard from "./AgentCard";

export default function AgentList({ agents }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
      {agents.map((agent) => {
        return <AgentCard agent={agent} key={agent.id} />;
      })}
    </div>
  );
}
