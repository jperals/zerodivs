const customElements = new Set(["pinch-zoom"]);

module.exports = {
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options => {
        options.compilerOptions = {
          ...options.compilerOptions,
          isCustomElement: tag => customElements.has(tag)
        };
        return options;
      });
  }
};
