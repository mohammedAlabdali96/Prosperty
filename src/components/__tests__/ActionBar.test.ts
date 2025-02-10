
import { shallowMount } from "@vue/test-utils";
import ActionBar from "../ActionBar.vue";

describe("ActionBar.vue", () => {
  it("renders Add Property button", () => {
    const wrapper = shallowMount(ActionBar, {
      props: { isActionBarVisible: false },
    });
    expect(wrapper.text()).toContain("Add Property");
  });

  it("renders Edit and Cancel buttons when isActionBarVisible is true", () => {
    const wrapper = shallowMount(ActionBar, {
      props: { isActionBarVisible: true },
    });
    expect(wrapper.text()).toContain("Edit");
    expect(wrapper.text()).toContain("Cancel");
  });

  it("does not render Edit and Cancel buttons when isActionBarVisible is false", () => {
    const wrapper = shallowMount(ActionBar, {
      props: { isActionBarVisible: false },
    });
    expect(wrapper.text()).not.toContain("Edit");
    expect(wrapper.text()).not.toContain("Cancel");
  });

  it("emits addProperty event when Add Property button is clicked", async () => {
    const wrapper = shallowMount(ActionBar, {
      props: { isActionBarVisible: false },
    });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("addProperty")).toBeTruthy();
  });

  it("emits edit event when Edit button is clicked", async () => {
    const wrapper = shallowMount(ActionBar, {
      props: { isActionBarVisible: true },
    });
    const editButton = wrapper.findAll("button")[1];
    await editButton.trigger("click");
    expect(wrapper.emitted("edit")).toBeTruthy();
  });

  it("emits clearSelection event when Cancel button is clicked", async () => {
    const wrapper = shallowMount(ActionBar, {
      props: { isActionBarVisible: true },
    });
    const cancelButton = wrapper.findAll("button")[2]; 
    await cancelButton.trigger("click");
    expect(wrapper.emitted("clearSelection")).toBeTruthy();
  });
});
