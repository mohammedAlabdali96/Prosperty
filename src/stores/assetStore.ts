import { defineStore } from "pinia";
import type { Asset, Pagination, AssetType } from "../types";
import {
  fetchAssets,
  updateAsset,
  fetchAssetTypes,
  fetchAmenities,
  addAsset,
  fetchAssetById
} from "../api/assetApi";

export const useAssetStore = defineStore("assetStore", {
  state: () => ({
    assets: [] as Asset[],
    assetTypes: [] as AssetType[],
    amenities: [] as string[],
    loading: false,
    error: null as string | null,
    pagination: {} as Pagination | {},
  }),

  actions: {
    async loadAssets(filters: any = {}) {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetchAssets(filters);

        this.assets = response.data.data;
        this.pagination = response.data.meta
          ? {
              current_page: response.data.meta.current_page,
              last_page: response.data.meta.last_page,
              total: response.data.meta.total,
              next_page_url: response.data.links.next,
              prev_page_url: response.data.links.prev,
            }
          : {};
      } catch (err) {
        console.error("Error fetching assets:", err);
        this.error = "Failed to fetch assets";
        this.pagination = {};
      } finally {
        this.loading = false;
      }
    },

    async loadAssetTypes() {
      try {
        const response = await fetchAssetTypes();
        this.assetTypes = response.data.map(
          (type: AssetType, index: number) => ({
            uuid: type.uuid,
            name: type.name,
            value: index + 1,
          })
        );
      } catch (err) {
        this.error = "Failed to load asset types";
      }
    },

    async addAsset(newAsset: any) {
      this.loading = true;

      try {
        await addAsset(newAsset);
      } catch (error) {
        this.error = "Failed to update asset";
      } finally {
        this.loading = false;
      }
    },

    async updateAssetDetails(uuid: string, updatedData: Partial<Asset>) {
      try {
        this.loading = true;
        await updateAsset(uuid, updatedData);
      } catch (error) {
        this.error = "Failed to update asset";
      } finally {
        this.loading = false;
      }
    },

    async loadAmenities() {
      try {
        const response = await fetchAmenities();
        this.amenities = response.data;
      } catch (err) {
        this.error = "Failed to fetch amenities";
      }
    },
    
    async loadAssetById(uuid: string) {
      this.loading = true;
      try {
        const response = await fetchAssetById(uuid);
        return response.data;
      } catch (error) {
        console.error("Error fetching asset:", error);
        return null;
      } finally {
        this.loading = false;
      }
    }
  },
});
