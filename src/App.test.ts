import { createTestingPinia } from "@pinia/testing";
import { fireEvent, render } from "@testing-library/vue";
import App from "./App.vue";
import { useBooksStore } from "./stores/books";

describe("city search autocomplete", () => {
  test("it should list cities that partially match the entered query", async () => {
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

describe("book search autocomplete", () => {
  test("it should list books with a title that partially matches the entered query", async () => {
    const { getByText, getByLabelText, queryByText } = render(App, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    const store = useBooksStore();
    store.populateWithBooks([
      {
        title: "Don Quixote",
        author: "Miguel De Cervantes",
      },
      {
        title: "Pilgrim's Progress",
        author: "John Bunyan",
      },
    ]);

    const searchInput = getByLabelText<HTMLInputElement>(
      "Search for a book title:"
    );

    expect(queryByText("No matching books found.")).toBeNull();

    await fireEvent.update(searchInput, "abc");

    expect(getByText("No matching books found.")).toBeDefined();

    await fireEvent.update(searchInput, "Don");

    expect(queryByText("No matching books found.")).toBeNull();

    expect(getByText("Don Quixote")).toBeDefined();
    expect(getByText("Miguel De Cervantes")).toBeDefined();

    expect(queryByText("Pilgrim's Progress")).toBeNull();
    expect(queryByText("John Bunyan")).toBeNull();

    await fireEvent.update(searchInput, "Pilgrim");

    expect(queryByText("Don Quixote")).toBeNull();
    expect(queryByText("Miguel De Cervantes")).toBeNull();

    expect(getByText("Pilgrim's Progress")).toBeDefined();
    expect(getByText("John Bunyan")).toBeDefined();
  });
});
