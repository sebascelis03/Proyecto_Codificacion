import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // TypeScript + Prettier rules for all TS/TSX files
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
    },
  },

  // ─── Domain isolation rule ───────────────────────────────────────────────────
  // The domain layer MUST NOT import from React, Next.js, or any third-party lib.
  // Only relative imports (within domain) are allowed.
  {
    files: ["src/domain/**/*.ts", "src/domain/**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            // React
            {
              group: ["react", "react/*", "react-dom", "react-dom/*"],
              message:
                "Domain layer must not import from React. Keep domain pure — move React usage to components or hooks.",
            },
            // Next.js
            {
              group: ["next", "next/*"],
              message:
                "Domain layer must not import from Next.js. Keep domain pure — move Next.js usage to app/ or infrastructure/.",
            },
            // Zustand
            {
              group: ["zustand", "zustand/*"],
              message:
                "Domain layer must not import from Zustand. Keep domain pure — use stores in hooks or components.",
            },
            // TanStack Query
            {
              group: ["@tanstack/*"],
              message:
                "Domain layer must not import from TanStack Query. Keep domain pure.",
            },
            // Zod (validation belongs at infrastructure boundary)
            {
              group: ["zod"],
              message:
                "Domain layer must not import from Zod. Validation schemas belong in infrastructure/adapters.",
            },
            // idb / IndexedDB
            {
              group: ["idb", "idb/*"],
              message:
                "Domain layer must not import from idb. IndexedDB access belongs in infrastructure/adapters.",
            },
            // Radix UI
            {
              group: ["@radix-ui/*"],
              message:
                "Domain layer must not import from Radix UI. UI primitives belong in components/.",
            },
            // Recharts
            {
              group: ["recharts", "recharts/*"],
              message:
                "Domain layer must not import from Recharts. Chart rendering belongs in components/.",
            },
            // React Hook Form
            {
              group: ["react-hook-form", "@hookform/*"],
              message:
                "Domain layer must not import from React Hook Form. Form handling belongs in components/.",
            },
            // DOMPurify
            {
              group: ["dompurify"],
              message:
                "Domain layer must not import from DOMPurify. DOM sanitization belongs in components/.",
            },
            // fast-check (test utility — should not be in domain source)
            {
              group: ["fast-check"],
              message:
                "Domain layer must not import from fast-check. Use it only in test files.",
            },
          ],
        },
      ],
    },
  },

  // Prettier config (disables conflicting formatting rules)
  prettierConfig,

  // Ignore patterns
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "coverage/**",
    "playwright-report/**",
  ]),
]);

export default eslintConfig;
