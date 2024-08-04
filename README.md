# Weather App
A simple and robust weather app.

## Technologies:
 - React
 - TypeScript (TS)
 - Tailwind CSS
 - ESLint
 - API: WeatherApi.com

## To Run:
 - Run `npm install`
 - Create a `.env` file in the root directory
    - Add `REACT_APP_WEATHER_API_KEY=<YOUR_KEY_HERE>`


### Environment Setup:
- ``` npx create-react-app weather --template typescript ```
- ``` cd weather ```
- ``` npm init @eslint/config ```
    - ```
        √ How would you like to use ESLint? · problems
        √ What type of modules does your project use? · esm
        √ Which framework does your project use? · react
        √ The React plugin doesn't officially support ESLint v9 yet. What would you like to do? · 8.x
        √ Does your project use TypeScript? · typescript
        √ Where does your code run? · browser
        The config that you've selected requires the following dependencies:

        eslint@8.x, globals, @eslint/js, typescript-eslint, eslint-plugin-react
        √ Would you like to install them now? · No / Yes
        √ Which package manager do you want to use? · npm

        eslint.config.mjs:
        import globals from 'globals';
        import pluginJs from '@eslint/js';
        import tseslint from '@typescript-eslint/eslint-plugin';
        import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
        import tsParser from '@typescript-eslint/parser';

        export default [
        {
            files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
            languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                jsx: true,
                },
            },
            globals: globals.browser,
            },
            plugins: {
            '@typescript-eslint': tseslint,
            'react': pluginReactConfig,
            },
            rules: {
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            },
        },
        ];
      ```

-  ``` npm install -D tailwindcss postcss autoprefixer ```
-  ``` npx tailwindcss init -p ```
    - ```
      tailwind.config.js:
      /** @type {import('tailwindcss').Config} */
        module.exports = {
        content: [
            "./src/**/*.{js,jsx,ts,tsx}",
        ],
        theme: {
            extend: {},
        },
        plugins: [],
        }

      src/index.css:
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
     ```
-  ``` npm install react-router-dom ```
-  ``` npm install chart.js react-chartjs-2 ```
