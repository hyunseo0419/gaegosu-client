module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ["plugin:typescript-eslint/recommended", "react-app", 'plugin:prettier/recommended',],
    plugins: ["@typescript-eslint", "react"],
    
    rules: {}
};

/*
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
};

/*
eslint-config-airbnb-typescript

module.exports = {
  extends: ["airbnb-typescript"],
}
*/
*/