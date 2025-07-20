import { dirname } from "path";
import { fileURLToPath } from "url";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import nextPlugin from "eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // IGNORE PATTERNS
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "public/**",
      "coverage/**",
      "*.config.js",
    ],
  },

  // BASE CONFIGURATION
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },

  //  CORE RULES
  js.configs.recommended,

  // NEXT.JS CONFIG
  ...compat.extends("next/core-web-vitals"),
  {
    plugins: { next: nextPlugin },
    rules: {
      "next/no-html-link-for-pages": "off",
    },
  },

  //  REACT CONFIG
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-vars": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // TAILWIND CSS
  {
    plugins: { tailwindcss: tailwindcssPlugin },
    rules: {
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",
    },
  },

  // IMPORT RULES
  {
    plugins: { import: importPlugin },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
    },
  },

  //  CUSTOM RULES
  {
    rules: {
      "no-inner-declarations": "error",
      "no-unsafe-optional-chaining": "error",
      curly: ["error", "multi-line"],
      eqeqeq: ["error", "smart"],
      "no-console":
        process.env.NODE_ENV === "production"
          ? ["error", { allow: ["warn", "error"] }]
          : "off",
    },
  },

  // PRETTIER
  prettierConfig,
];
