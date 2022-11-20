import { createTestingPinia } from "@pinia/testing";
import { fireEvent, render } from "@testing-library/vue";
import App from "./App.vue";

describe("city search autocomplete", () => {
  test("it should show a prompt to enter more letters to show autocomplete", async () => {
    const { getByText, getByLabelText, queryByText } = render(App, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const searchInput = getByLabelText<HTMLInputElement>(
      "Search for a city name:"
    );
    expect(searchInput.value).toEqual("");

    expect(
      getByText("Enter 3 or more letters to see autocomplete options.")
    ).toBeDefined();

    await fireEvent.update(searchInput, "ab");
    expect(searchInput.value).toEqual("ab");

    expect(
      getByText("Enter 3 or more letters to see autocomplete options.")
    ).toBeDefined();

    await fireEvent.update(searchInput, "abc");
    expect(searchInput.value).toEqual("abc");

    expect(
      queryByText("Enter 3 or more letters to see autocomplete options.")
    ).toBeNull();
  });

  test("it should show a prompt if no autocomplete results are found", async () => {
    const { getByText, getByLabelText, queryByText } = render(App, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const searchInput = getByLabelText<HTMLInputElement>(
      "Search for a city name:"
    );

    expect(queryByText("No matching cities found.")).toBeNull();

    await fireEvent.update(searchInput, "abc");

    expect(getByText("No matching cities found.")).toBeDefined();

    await fireEvent.update(searchInput, "san");

    expect(queryByText("No matching cities found.")).toBeNull();
  });

  test("it should list cities that partially match the entered query", async () => {
    const { getByText, getByLabelText, queryByText } = render(App, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const searchInput = getByLabelText<HTMLInputElement>(
      "Search for a city name:"
    );
    await fireEvent.update(searchInput, "san");

    expect(getByText("san jose")).toBeDefined();
    expect(getByText("santiago")).toBeDefined();
    expect(getByText("san juan")).toBeDefined();
    expect(getByText("santa rosa")).toBeDefined();

    await fireEvent.update(searchInput, "sant");

    expect(queryByText("san jose")).toBeNull();
    expect(getByText("santiago")).toBeDefined();
    expect(queryByText("san juan")).toBeNull();
    expect(getByText("santa rosa")).toBeDefined();
  });
});
