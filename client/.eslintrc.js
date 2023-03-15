/* eslint-disable quote-props */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-unused-vars": "off",
    "default-param-last": "off",
    "import/prefer-default-export": "off",
    "quotes": "off",
  },
};
