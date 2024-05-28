import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
 { 
  rules: {
    'comma-dangle': ['error', 'never'], // Disallow trailing commas
    'eol-last': ['error', 'never'], // Disallow newline at end of file
    "@typescript-eslint/no-explicit-any": "off",
    "react/jsx-uses-react": "error",   
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "^React$" }]
 
  }
 }
];