import apiClient from "./axios";

export const fetchAssets = (filters: Record<string, any> = {}) => {
  const allowedFilters = [
    "filter[type_id]",
    "filter[amenities]",
    "page",
    "sort",
    "sortDesc",
  ];

  const params = Object.entries(filters).reduce((acc, [key, value]) => {
    if (allowedFilters.includes(key) && value) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);

  return apiClient.get(`/listings`, { params });
};

export const updateAsset = (uuid: string, updatedData: any) => {
  return apiClient.put(`/listings/${uuid}`, updatedData);
};

export const fetchAssetTypes = () => {
  return apiClient.get(`/types`).then((response) => response.data);
};

export const fetchAmenities = () => {
  return apiClient.get(`/amenities`).then((response) => response.data);
};
export const fetchAssetById = (uuid:string) => {
  return apiClient.get(`/listings/${uuid}`).then((response) => response.data);
};

export const addAsset = (newAsset: any) => {
  return apiClient
    .post("/listings", newAsset)
    .then((response) => response.data);
};
