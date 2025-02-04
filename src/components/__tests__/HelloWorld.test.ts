import { mount } from "@vue/test-utils";
import HelloWorld from "../HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "Hello Jest!";
    const wrapper = mount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toContain(msg);
  });

  it("increments count when button is clicked", async () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: "Test" },
    });

    const button = wrapper.find("button");
    expect(button.text()).toContain("count is 0");

    await button.trigger("click");

    expect(button.text()).toContain("count is 1");
  });
});
