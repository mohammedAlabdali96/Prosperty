import { shallowMount } from "@vue/test-utils";
import LoadingSpinner from "../LoadingSpinner.vue";

describe("LoadingSpinner.vue", () => {
  it("renders the loading text", () => {
    const wrapper = shallowMount(LoadingSpinner);
    expect(wrapper.text()).toContain("Loading...");
  });

  it("renders the spinner with correct class", () => {
    const wrapper = shallowMount(LoadingSpinner);
    const spinner = wrapper.find("div.animate-spin");
    expect(spinner.exists()).toBe(true);
  });

});
