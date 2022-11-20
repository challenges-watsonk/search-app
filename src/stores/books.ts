import { defineStore } from "pinia";

interface Book {
  title: string;
  author: string;
}

export const useBooksStore = defineStore("books", {
  state: () => ({
    titleQuery: "",
    books: [] as Book[],
  }),
  getters: {
    partiallyMatchingTitles: (state) => {
      return state.books.filter((book) =>
        book.title.includes(state.titleQuery)
      );
    },
  },
  actions: {
    populateWithBooks(books: Book[]) {
      this.books = books;
    },
  },
});
