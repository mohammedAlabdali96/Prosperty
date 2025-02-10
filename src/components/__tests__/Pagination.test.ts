import { shallowMount } from "@vue/test-utils";
import Pagination from "../Pagination.vue";

describe("Pagination.vue", () => {
  const paginationData = {
    current_page: 2,
    last_page: 5,
    prev_page_url: "page=1",
    next_page_url: "page=3",
  };

  it("renders Previous and Next buttons", () => {
    const wrapper = shallowMount(Pagination, {
      props: { pagination: paginationData },
    });

    expect(wrapper.text()).toContain("Previous");
    expect(wrapper.text()).toContain("Next");
  });

  it("displays the correct page number", () => {
    const wrapper = shallowMount(Pagination, {
      props: { pagination: paginationData },
    });

    expect(wrapper.text()).toContain("Page 2 of 5");
  });

  it("disables Previous button when there is no previous page", () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        pagination: {
          ...paginationData,
          prev_page_url: null, // No previous page
        },
      },
    });

    const prevButton = wrapper.find("button:first-child");
    expect(prevButton.attributes("disabled")).toBeDefined();
  });

  it("disables Next button when there is no next page", () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        pagination: {
          ...paginationData,
          next_page_url: null, // No next page
        },
      },
    });

    const nextButton = wrapper.find("button:last-child");
    expect(nextButton.attributes("disabled")).toBeDefined();
  });

  it("emits changePage event when Previous button is clicked", async () => {
    const wrapper = shallowMount(Pagination, {
      props: { pagination: paginationData },
    });

    const prevButton = wrapper.find("button:first-child");
    await prevButton.trigger("click");

    expect(wrapper.emitted("changePage")).toBeTruthy();
    expect(wrapper.emitted("changePage")![0]).toEqual([1]); // Should emit page 1
  });

  it("emits changePage event when Next button is clicked", async () => {
    const wrapper = shallowMount(Pagination, {
      props: { pagination: paginationData },
    });

    const nextButton = wrapper.find("button:last-child");
    await nextButton.trigger("click");

    expect(wrapper.emitted("changePage")).toBeTruthy();
    expect(wrapper.emitted("changePage")![0]).toEqual([3]); // Should emit page 3
  });
});
