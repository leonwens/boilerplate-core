module.exports = {
  rules: {
    'prettier/prettier': 'error',
    'import/named': 'off',
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['draft'] }
    ],
    'no-underscore-dangle': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off'
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['error']
      }
    },
    {
      files: ['test/**/*.spec.js', 'test/**/*.spec.jsx'],
      rules: {
        'func-names': 'off',
        'no-unused-expressions': 'off'
      }
    }
  ],
  globals: {
    ENV: 'readonly'
  }
};
