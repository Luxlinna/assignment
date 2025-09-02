# React + TypeScript + Vite

## Hosting with Netlify:
https://jaksmok-assignment.netlify.app


## Book App ##


- Installation and Run
  - git clone https://github.com/Luxlinna/assignment.git
  - npm install

  - npm run dev


A responsive web application to browse, search, and view details of books. The app uses Firebase for authentication and integrates with a REST API to fetch book data. Built with Vite.js, React, TypeScript, TailwindCSS, and Material-UI.

Features
  . User Authentication
    . Sign up / login with email & password.
    . Sign in with Google.
    . Logout functionality.

  . Book Browsing
    . Display a list of books with pagination.
    . Highlight search results in the list.
    . Filter and search books by title or author.
    . Click a book to view detailed information.

  . Responsive Layout
    . Desktop: Book list (30%) on the left, book detail (70%) on the right.
    . Mobile: Book list on top, book detail below.

  . Full-page layout
    . No extra margins; BookList and BookDetail scroll independently.

  . API Integration
    . Fetch books from an external REST API.
    . Display detailed book info including image, author, year, country, language, pages, and Wikipedia link.


Tech Stack
  . Frontend
    . React + TypeScript
    . Vite.js
    . TailwindCSS 
    . Material-UI

  . Backend & API
    . External REST API for books
    . Firebase Firestore (optional)

  . Authentication
    . Firebase Auth (Email & Google Sign-in)


###
- npm install
- npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
- npm install react-router-dom
- npm install @mui/material @mui/icons-material @emotion/react @emotion/styled firebase

- npm install firebase

###









This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
