# Task Manager

A modern, feature-rich task management application built with React, TypeScript, and Vite. Organize your tasks efficiently with categories, due dates, and powerful filtering options.

## Overview

Task Manager is a comprehensive productivity tool that helps you organize, track, and manage your daily tasks. With an intuitive interface, dark/light theme support, and advanced features like drag-and-drop reordering, data export/import, and detailed statistics, it's designed to boost your productivity.

## Features

- ✅ **Task Management** - Create, edit, delete, and complete tasks
- 🏷️ **Categories** - Organize tasks with custom categories
- 📅 **Due Dates** - Track deadlines and overdue tasks
- 🔍 **Search & Filter** - Find tasks quickly with search and multiple filters
- 🎯 **Sorting Options** - Sort by date or title
- 🎨 **Dark/Light Theme** - Toggle between themes for comfortable viewing
- 📊 **Statistics Dashboard** - View task completion rates and insights
- 💾 **Data Export/Import** - Backup and restore tasks in JSON format
- 🖱️ **Drag & Drop** - Reorder tasks with intuitive drag-and-drop
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 💾 **Local Storage** - All data persists locally in your browser

## Tech Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **State Management:** React Hooks & Context API

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd task-manager
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
