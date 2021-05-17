const baseConfig = require('../base');
const cssReg = /\.(css|less)$/;
const rules = baseConfig.module.rules;
rules.forEach((rule) => {
  if (rule.test.toString() === cssReg.toString()) {
    rule.use.splice(-1, 0, { loader: 'postcss-loader' });
  }
});
module.exports = baseConfig;
