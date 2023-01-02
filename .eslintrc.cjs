/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    // "@vue/eslint-config-prettier",
  ],
  overrides: [
    {
      files: ["cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"],
    },
    {
      files: ["*.vue", "src/**.js"],
      rules: {
        // indent: true,
        // tabWidth: 2,
        // singleQuote: true,
        // semi: false,
        // trailingComma: "all",
        indent: ["error", 2],
        semi: ["error", "never"],
        quotes: ["error", "double"],
      },
    },
  ],
  env: {
    node: true,
  },
};
