module.exports = {
  extends: [
    'plugin:shopify/typescript-react',
    'plugin:shopify/typescript-prettier',
    'plugin:shopify/polaris',
    'plugin:shopify/jest',
  ],
  rules: {
    'no-process-env': 'off',
    'consistent-return': 'off',
    'react/jsx-no-bind': 'off',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
  },
  overrides: [
    {
      files: ['*.test.*'],
      rules: {
        'shopify/jsx-no-hardcoded-content': 'off',
      },
    },
  ],
};
