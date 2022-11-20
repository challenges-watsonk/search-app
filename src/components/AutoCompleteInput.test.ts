import { fireEvent, render } from "@testing-library/vue";
import AutoCompleteInput from "./AutoCompleteInput.vue";

describe("city search autocomplete", () => {
  test("it should display the labels and input value", async () => {
    const { getByText, getByLabelText } = render(AutoCompleteInput, {
      props: {
        modelValue: "test",

        queryResults: [],
        label: "Input label",
        noResultText: "No results.",
      },
    });

    const searchInput = getByLabelText<HTMLInputElement>("Input label");
    expect(searchInput.value).toEqual("test");

    expect(getByText("No results.")).toBeDefined();
  });

  test("it should emit the value when the input changes", async () => {
    const { getByLabelText, emitted } = render(AutoCompleteInput, {
      props: {
        modelValue: "test",

        queryResults: [],
        label: "Input label",
        noResultText: "No results.",
      },
    });

    const searchInput = getByLabelText<HTMLInputElement>("Input label");
    expect(searchInput.value).toEqual("test");

    await fireEvent.update(searchInput, "new input value");
    expect(emitted()["update:modelValue"].length).toBe(1);
    expect(emitted()["update:modelValue"][0]).toEqual(["new input value"]);
  });

  test("it should display a prompt when the input value is less than the minimum length", async () => {
    const { getByText, getByLabelText, queryByText, rerender } = render(
      AutoCompleteInput,
      {
        props: {
          modelValue: "test",
          minimumQueryLength: 6,
          queryResults: [],
          label: "Input label",
          noResultText: "No results.",
        },
      }
    );

    const searchInput = getByLabelText<HTMLInputElement>("Input label");
    expect(searchInput.value).toEqual("test");

    expect(
      getByText("Enter 6 or more letters to see autocomplete options.")
    ).toBeDefined();

    await rerender({ modelValue: "enough" });
    expect(searchInput.value).toEqual("enough");

    expect(
      queryByText("Enter 6 or more letters to see autocomplete options.")
    ).toBeNull();

    await rerender({ modelValue: "more than enough" });
    expect(searchInput.value).toEqual("more than enough");

    expect(
      queryByText("Enter 6 or more letters to see autocomplete options.")
    ).toBeNull();

    await rerender({ minimumQueryLength: 20 });

    expect(
      getByText("Enter 20 or more letters to see autocomplete options.")
    ).toBeDefined();
  });

  test("it should display a prompt when no results are provided", async () => {
    const { getByText, getByLabelText, queryByText, rerender } = render(
      AutoCompleteInput,
      {
        props: {
          modelValue: "test",
          queryResults: [],
          label: "Input label",
          noResultText: "No results.",
        },
      }
    );

    const searchInput = getByLabelText<HTMLInputElement>("Input label");
    expect(searchInput.value).toEqual("test");

    expect(getByText("No results.")).toBeDefined();

    await rerender({ queryResults: [{ primaryText: "primary" }] });

    expect(queryByText("No results.")).toBeNull();
  });

  test("it should display the primary and secondary text in the results", async () => {
    const { getByText } = render(AutoCompleteInput, {
      props: {
        modelValue: "test",
        queryResults: [
          { primaryText: "primary", secondaryText: "secondary" },
          { primaryText: "only primary" },
        ],
        label: "Input label",
        noResultText: "No results.",
      },
    });

    expect(getByText("primary")).toBeDefined();
    expect(getByText("secondary")).toBeDefined();
    expect(getByText("only primary")).toBeDefined();
  });
});
