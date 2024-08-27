import api from "@/config/api";

export const getAgents = async (params, locale) => {
  return api.get("/agents", {
    params: {
      ...params,
      lang: locale,
      acf_format: "standard",
      _fields: "id,title,acf,slug",
    },
  });
};

export const getAgentBySlug = async (slug, locale) => {
  const agents = await api.get("/agents", {
    params: {
      slug,
      _embed: true,
      acf_format: "standard",
      _fields: "id,title,acf,slug",
      lang: locale,
    },
  });

  if (agents.length === 0) {
    return null;
  }

  return agents[0];
};
