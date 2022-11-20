# search-app

## Prerequisites
- Install Node.js version 16.0 or higher
## Setup
First install the dependencies:
```
npm install
```
## Run
To run the project, use the command:
```
npm run dev
```
## Architecture
### Components
The app is made up of 3 components. 

The `App` component displays both city search autocomplete and book search autocomplete. This component also handles querying the search to the store.
The

The `AutoCompleteInput` component handles displaying the queried results in a list and displaying prompts when appropriate.

The `AutoCompleteResult` component handles displaying the result details and adding a click handler to the block.

### Store
The app has 2 separate Pinia stores.

The `Cities` store contains a list of city names and a query in the state. This query is used to filter the names for the `partiallyMatchingNames` getter. The list of city name is in the state from the start as the default value.

The `Books` store contains a list of objects containing the title and author, as well as a query. The query is used similarly to the cities store to filter the books by title for the `partiallyMatchingTitles` getter. The books are added to the store using the `populateWithBooks` action. If these books were retrieved from a server the network request could be added to this action, also if the store structure were to change (maybe storing book objects by title in a map) this action could easily be refactored to populate the store in the new structure.

## Things that can be done differently

The stores could be populated with data in many other ways but I thought the two implementations I used are somewhat common.

Unit tests could be added to the store to check the logic of the getters. Since this query logic is also tested in the `App` tests I found it unimportant for this app.

The tests could use page model and/or some setup function to avoid repeating common things like focussing the input to type (things that happen in the browser etc).

The `AutoCompleteInput` could accept slots for rendering the prompts (or even the results) instead of passing strings and objects in the props. Only text needed to be rendered for these prompts though so this wasn't essential.

Extra query logic could be used for the store. Things like only matching the query text to the start of the city name or title, or matching without case sensitivity.