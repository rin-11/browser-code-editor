# browser-code-editor
## A CLI to launch an interactive development environment for writing & documenting code. 
### The goal of the project is to capture the following:
 - The ability to keep track of notes and executing code in an organized format
 - Will have the ability to acces libraries (i.e. axios)
 - The ability to save the code/notes to the local hard drive. 
 - The browser app will be best utilized for practicing algos and taking notes.
### This project is built using React & Typescript. 
- This project uses React Redux Store and Redux Thunk. It also incorporates the Immer package (https://www.npmjs.com/package/immer) produce function to allow direct updates of reduce product states.
- This project utilized ES Build (https://esbuild.github.io/) to transpile & bundle code (all in browser)
- This project uses UNPKG (https://www.unpkg.com/) to gain access to NPM directories 
- This project uses localforage (https://www.npmjs.com/package/localforage) to handle the storage of requests made to unpkg when aquiring npm packages
- This project uses Monaco (https://www.npmjs.com/package/@monaco-editor/react) for the code editor diplay, and Prettier (https://www.npmjs.com/package/prettier) for code editor formatting
- This project uses Markdown Editor (https://www.npmjs.com/package/@uiw/react-md-editor) for the text editing component and displaying the markdown
- This project uses @fortawesome/fontawesome-free (https://www.npmjs.com/package/@fortawesome/fontawesome-free)for icon button styling


