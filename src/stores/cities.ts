import { defineStore } from "pinia";

export const useCitiesStore = defineStore("cities", {
  state: () => ({
    nameQuery: "",
    names: [
      "san jose",
      "santiago",
      "san francisco",
      "santa rosa",
      "san juan",
      "sabadell",
      "salamanca",
      "salt lake city",
      "salinas",
      "salem",
      "sausalito",
      "taipei",
      "tel aviv",
      "tempe",
      "termez",
      "temuco",
      "tiajuna",
      "tieling",
      "thousand oaks",
      "thunder bay",
      "tokyo",
      "tulsa",
    ],
  }),
  getters: {
    partiallyMatchingNames: (state) => {
      return state.names.filter((name) => name.includes(state.nameQuery));
    },
  },
});
