module.exports = function (eleventyConfig) {
  // add watch target
  eleventyConfig.addWatchTarget("./src/assets/scss/");

  // override default config
  return {
    dir: {
      input: "./src",
      output: "./dist",
    },
  };
};
