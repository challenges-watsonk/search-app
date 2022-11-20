import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import { useBooksStore } from "./stores/books";

const app = createApp(App);

app.use(createPinia());

const booksStore = useBooksStore();
booksStore.populateWithBooks([
  {
    title: "Don Quixote",
    author: "Miguel De Cervantes",
  },
  {
    title: "Pilgrim's Progress",
    author: "John Bunyan",
  },
  {
    title: "Robinson Crusoe",
    author: "Daniel Defoe",
  },
  {
    title: "Gulliver's Travels",
    author: "Jonathan Swift",
  },
  {
    title: "Tom Jones",
    author: "Henry Fielding",
  },
  {
    title: "Clarissa",
    author: "Samuel Richardson",
  },
  {
    title: "Tristram Shandy",
    author: "Laurence Sterne",
  },
]);

app.mount("#app");
