import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { useAssetStore } from "../../stores/assetStore";
import AssetDetails from "../AssetDetails.vue";
import LoadingSpinner from "../../components/LoadingSpinner.vue";
import AssetEditModal from "../../components/AssetEditModal.vue";

jest.mock("vue-router", () => ({
  useRoute: jest.fn(() => ({
    params: { uuid: "123" },
  })),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("AssetDetails.vue", () => {
  let assetStore: ReturnType<typeof useAssetStore>;

  const mockAsset = {
    uuid: "123",
    title: "Luxury Apartment",
    type: { name: "Apartment" },
    size: 100,
    price: "500000",
    bathrooms: 2,
    bedrooms: 3,
    street: "Main Street",
    street_number: "12A",
    postal_code: "54321",
    description: "A luxurious apartment in the heart of the city.",
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    assetStore = useAssetStore();
    jest
      .spyOn(assetStore, "loadAssetById")
      .mockImplementation(() => Promise.resolve(mockAsset));
  });

  it("renders asset details when API call is successful", async () => {
    const wrapper = shallowMount(AssetDetails);

    // Wait for fetchAssetDetails to complete
    await wrapper.vm.fetchAssetDetails();
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Luxury Apartment");
    expect(wrapper.text()).toContain("Apartment");
    expect(wrapper.text()).toContain("100 sq.m");
    expect(wrapper.text()).toContain("€500000");
    expect(wrapper.text()).toContain("Bathrooms:");
    expect(wrapper.text()).toContain("Bedrooms:");
    expect(wrapper.text()).toContain(
      "A luxurious apartment in the heart of the city."
    );
  });

  it("shows loading spinner while fetching asset details", async () => {
    assetStore.loading = true; // Simulating loading state
    const wrapper = shallowMount(AssetDetails);

    expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(true);
  });

  it("displays an error message when asset is not found", async () => {
    jest
      .spyOn(assetStore, "loadAssetById")
      .mockImplementation(() => Promise.resolve(null));

    const wrapper = shallowMount(AssetDetails);
    await wrapper.vm.fetchAssetDetails();
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain(
      "Asset not found. The asset ID may be invalid."
    );
  });

  it("opens and closes the edit modal when button is clicked", async () => {
    const wrapper = shallowMount(AssetDetails);
    await wrapper.vm.fetchAssetDetails();
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(AssetEditModal).exists()).toBe(false);

    const editButton = wrapper.find("button");
    await editButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(AssetEditModal).exists()).toBe(true);

    wrapper.vm.showEditModal = false;
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(AssetEditModal).exists()).toBe(false);
  });
});
