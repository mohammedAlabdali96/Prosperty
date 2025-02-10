import { shallowMount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";
import AssetTable from "../AssetTable.vue";
import type { Asset } from "../../types";

describe("AssetTable.vue", () => {
  const assets: Asset[] = [
    {
      uuid: "123",
      title: "Office Space",
      type: { uuid: "type-1", name: "Commercial", value: 1 },
      size: 200,
      street: "Main St",
      street_number: "100",
      postal_code: "12345",
      description: "A spacious office space in the city center.",
      created_at: "2023-01-10T12:00:00Z",
      updated_at: "2023-02-15T12:00:00Z",
      price: "500000",
      bedrooms: 3,
      bathrooms: 2,
      amenities: ["Parking", "Elevator"],
      available_from: "2024-03-01",
    },
    {
      uuid: "456",
      title: "Apartment",
      type: { uuid: "type-2", name: "Residential", value: 2 },
      size: 85,
      street: "Elm St",
      street_number: "50",
      postal_code: "54321",
      description: "A cozy apartment in a quiet neighborhood.",
      created_at: "2022-11-05T12:00:00Z",
      updated_at: "2023-01-10T12:00:00Z",
      price: "250000",
      bedrooms: 2,
      bathrooms: 1,
      amenities: ["Balcony", "Garden"],
      available_from: "2024-06-01",
    },
  ];

  let router: any;

  beforeEach(async () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: "/", component: {} },
        { path: "/assets/:uuid", component: {} },
      ],
    });
    router.push("/");
    await router.isReady();
  });

  it("renders the table headers correctly", () => {
    const wrapper = shallowMount(AssetTable, {
      props: { assets, selectedAsset: null },
      global: { plugins: [router] },
    });

    const headers = [
      "Title",
      "Type",
      "Size",
      "Address",
      "Description",
      "Created",
      "Updated",
      "Actions",
    ];

    headers.forEach((header) => {
      expect(wrapper.text()).toContain(header);
    });
  });

  it("renders asset rows correctly", () => {
    const wrapper = shallowMount(AssetTable, {
      props: { assets, selectedAsset: null },
      global: { plugins: [router] },
    });

    expect(wrapper.findAll("tbody tr").length).toBe(2);
    expect(wrapper.text()).toContain("Office Space");
    expect(wrapper.text()).toContain("Apartment");
  });

  it("emits select event when a row is clicked", async () => {
    const wrapper = shallowMount(AssetTable, {
      props: { assets, selectedAsset: null },
      global: { plugins: [router] },
    });

    const firstRow = wrapper.findAll("tbody tr")[0];
    await firstRow.trigger("click");

    expect(wrapper.emitted("select")).toBeTruthy();
    expect(wrapper.emitted("select")![0]).toEqual([assets[0]]);
  });

  it("navigates to asset details when Details button is clicked", async () => {
    const mockPush = jest.fn();
    router.push = mockPush;

    const wrapper = shallowMount(AssetTable, {
      props: { assets, selectedAsset: null },
      global: { plugins: [router] },
    });

    const detailsButton = wrapper.findAll("button")[0]; // First row's button
    await detailsButton.trigger("click");

    expect(mockPush).toHaveBeenCalledWith("/assets/123");
  });

  it("applies selected row styling", () => {
    const wrapper = shallowMount(AssetTable, {
      props: { assets, selectedAsset: assets[0] }, // Select first asset
      global: { plugins: [router] },
    });

    const firstRow = wrapper.findAll("tbody tr")[0];
    expect(firstRow.classes()).toContain("bg-blue-100");
  });
});
