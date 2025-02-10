import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { useAssetStore } from "../../stores/assetStore";
import AssetFilters from "../AssetFilters.vue";

describe("AssetFilters.vue", () => {
  let assetStore: ReturnType<typeof useAssetStore>;

  const mockFilters = {
    types: [],
    amenities: [],
    sort: null,
    sortDesc: false,
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    assetStore = useAssetStore();

    jest.spyOn(assetStore, "loadAssetTypes").mockImplementation(() =>
      Promise.resolve()
    );
    jest.spyOn(assetStore, "loadAmenities").mockImplementation(() =>
      Promise.resolve()
    );

    assetStore.assetTypes = [
      {
        value: 1,
        name: "Apartment",
        uuid: "323455dfdf",
      },
      {
        value: 2,
        name: "House",
        uuid: "2323dff",
      },
    ];
    assetStore.amenities = ["Pool", "Gym"];
  });

  it("calls loadAssetTypes and loadAmenities on mount", () => {
    shallowMount(AssetFilters, { props: { filters: mockFilters } });

    expect(assetStore.loadAssetTypes).toHaveBeenCalled();
    expect(assetStore.loadAmenities).toHaveBeenCalled();
  });

  it("renders checkboxes for asset types", () => {
    const wrapper = shallowMount(AssetFilters, {
      props: { filters: mockFilters },
    });

    const typeCheckboxes = wrapper.findAll("input[type='checkbox']");
    expect(typeCheckboxes.length).toBeGreaterThanOrEqual(2); // Apartment, House
    expect(wrapper.text()).toContain("Apartment");
    expect(wrapper.text()).toContain("House");
  });

  it("renders checkboxes for amenities", () => {
    const wrapper = shallowMount(AssetFilters, {
      props: { filters: mockFilters },
    });

    expect(wrapper.text()).toContain("Pool");
    expect(wrapper.text()).toContain("Gym");
  });

  it("emits update:filters event when a type is selected", async () => {
    const wrapper = shallowMount(AssetFilters, {
      props: { filters: mockFilters },
    });

    const checkboxes = wrapper.findAll("input[type='checkbox']");
    await checkboxes[0].setValue(true); // Select "Apartment"

    expect(wrapper.emitted("update:filters")).toBeTruthy();
  });

  it("emits update:filters event when an amenity is selected", async () => {
    const wrapper = shallowMount(AssetFilters, {
      props: { filters: mockFilters },
    });

    const checkboxes = wrapper.findAll("input[type='checkbox']");
    await checkboxes[2].setValue(true); // Select "Pool"

    expect(wrapper.emitted("update:filters")).toBeTruthy();
  });

  it("updates sorting correctly", async () => {
    const wrapper = shallowMount(AssetFilters, {
      props: { filters: mockFilters },
    });

    const sortAsc = wrapper.findAll("input[type='checkbox']")[4]; // Ascending
    const sortDesc = wrapper.findAll("input[type='checkbox']")[5]; // Descending

    await sortAsc.trigger("change");
    expect(mockFilters.sort).toBe("size");
    expect(mockFilters.sortDesc).toBe(false);

    await sortDesc.trigger("change");
    expect(mockFilters.sort).toBe("size");
    expect(mockFilters.sortDesc).toBe(true);
  });
});
