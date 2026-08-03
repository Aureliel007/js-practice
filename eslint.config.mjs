import globals from "globals";

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
        ...globals.jest,
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single']
    }
  }
];