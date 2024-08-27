Default vite + ts + react code :

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

README:

- my features :
  1- add note using the button on the bottom right corner.(createdNoteDate is the date you make it and is readonly)
  2- editing note title and deadline date by double clicking on the element
  3- to delete a task click on the top left trashcan icon
  4- drag and drop system used for sorting using this resource
  https://www.smashingmagazine.com/2020/02/html-drag-drop-api-react/
  5- the tasks change color if the deadline > createdNoteDate. you can test this by changing the deadline
