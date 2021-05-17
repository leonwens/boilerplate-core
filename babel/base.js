module.exports = {
  presets: [
    ['@babel/env', {
      "useBuiltIns": "usage",
      "corejs": { "version": "3.6", "proposals": true },
      "targets": {
        "chrome": 49
      }
    }],
    '@babel/react', '@babel/typescript'],
  plugins: []
};
