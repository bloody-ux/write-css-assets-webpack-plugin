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

class WriteCssAssetsWebpackPlugin {
	apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      const manifest = compilation.assets['manifest.js'];

      if (manifest) {
        const stats = compilation.getStats().toJson();
        const cssHash = createCssHash(stats);
        const hashString = `window.__CSS_CHUNKS__= ${JSON.stringify(cssHash)};`;
        compilation.assets['manifest.js'] = new ConcatSource(hashString, '\n', manifest);
      }
      
      callback();
    });
	}
}

module.exports = WriteCssAssetsWebpackPlugin;