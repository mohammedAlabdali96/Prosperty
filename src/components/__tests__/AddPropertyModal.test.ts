import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { useAssetStore } from "../../stores/assetStore";
import AddPropertyModal from "../AddPropertyModal.vue";

jest.mock("vue-router", () => ({
  useRoute: jest.fn(() => ({ query: {} })),
}));

describe("AddPropertyModal.vue", () => {
  let assetStore: ReturnType<typeof useAssetStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    assetStore = useAssetStore();
    jest.spyOn(assetStore, "loadAssetTypes").mockImplementation(() => Promise.resolve());
    jest.spyOn(assetStore, "loadAmenities").mockImplementation(() => Promise.resolve());
    jest.spyOn(assetStore, "addAsset").mockImplementation(() => Promise.resolve());
    jest.spyOn(assetStore, "loadAssets").mockImplementation(() => Promise.resolve());
  });

  it("renders correctly", () => {
    const wrapper = shallowMount(AddPropertyModal);
    expect(wrapper.text()).toContain("Add New Property");
    expect(wrapper.text()).toContain("Title");
    expect(wrapper.text()).toContain("Size (sq.m)");
  });

  it("shows validation error when required fields are missing", async () => {
    const wrapper = shallowMount(AddPropertyModal);

    const buttons = wrapper.findAll("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
    
    const saveButton = buttons[1]; // Save button
    expect(saveButton.exists()).toBe(true);
    
    await saveButton.trigger("click");

    expect(wrapper.text()).toContain("Title, Type, and Size are required.");
  });

  it("emits close event when cancel button is clicked", async () => {
    const wrapper = shallowMount(AddPropertyModal);

    const buttons = wrapper.findAll("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);

    const cancelButton = buttons[0]; // Cancel button
    expect(cancelButton.exists()).toBe(true);

    await cancelButton.trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });
});
