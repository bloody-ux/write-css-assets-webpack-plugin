"use strict";

const { ConcatSource } = require("webpack-sources");

class WriteCssAssetsWebpackPlugin {
	constructor() {
		
	}

	apply(compiler) {
		compiler.hooks.compilation.tap("WriteCssAssetsWebpackPlugin", compilation => {
			compilation.hooks.optimizeChunkAssets.tap("WriteCssAssetsWebpackPlugin", chunks => {
				console.log(compilation);
				console.log(chunks);
		});
	}
}

module.exports = WriteCssAssetsWebpackPlugin;