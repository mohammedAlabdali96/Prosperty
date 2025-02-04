import { mount } from "@vue/test-utils";

import HomeView from "../HomeView.vue";

describe("HomeView.vue", () => {
  it("renders the correct message", () => {
    const wrapper = mount(HomeView);
    expect(wrapper.text()).toContain("Welcome to Prosperty App!");
  });

  it("renders a button with the correct text", () => {
    const wrapper = mount(HomeView);
    expect(wrapper.find("button").text()).toBe("Click Me!");
  });
});
