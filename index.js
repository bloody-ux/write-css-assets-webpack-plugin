"use strict";

const { ConcatSource } = require("webpack-sources");

function createCssHash({
  assetsByChunkName,
  publicPath
}) {
  return Object.keys(assetsByChunkName).reduce((hash, name) => {
    if (!assetsByChunkName[name] || !assetsByChunkName[name].find) return hash;

    const file = assetsByChunkName[name].find(f => f.endsWith('.css'));
    if (file) hash[name] = `${publicPath}${file}`;
    return hash;
  }, {});
}

const defaultOptions = {
  assetName: 'main.js',
}

class WriteCssAssetsWebpackPlugin {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options);
  }

	apply(compiler) {
    compiler.plugin('compilation', (compilation, callback) => {
      compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
        const asset = compilation.assets[this.options.assetName];

        if (asset) {
          const stats = compilation.getStats().toJson();
          const cssHash = createCssHash(stats);
          const hashString = `window.__CSS_CHUNKS__= ${JSON.stringify(cssHash)};`;
          compilation.assets[this.options.assetName] = new ConcatSource(hashString, '\n', asset);
        }
 
        callback();
      });
    });
  }
}

module.exports = WriteCssAssetsWebpackPlugin;