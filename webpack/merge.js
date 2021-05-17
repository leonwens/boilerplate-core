const merge = require('webpack-merge');

function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

module.exports = function (source, target) {
  if (!isPromise(source) && !isPromise(target)) {
    return merge(source, target);
  }

  if (isPromise(source) && !isPromise(target)) {
    return new Promise((resolve) => {
      source.then((config) => {
        resolve(merge(config, target));
      });
    });
  }

  if (!isPromise(source) && isPromise(target)) {
    return new Promise((resolve) => {
      target.then((config) => {
        resolve(merge(source, config));
      });
    });
  }

  if (isPromise(source) && isPromise(target)) {
    return Promise.all([source, target]).then(([sourceConfig, targetConfig]) =>
      merge(sourceConfig, targetConfig)
    );
  }
};
