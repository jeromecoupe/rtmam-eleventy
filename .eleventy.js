module.exports = function (eleventyConfig) {
  // copy files
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets/img");

  // override default config
  return {
    dir: {
      input: "./src",
      output: "./dist",
    },
    markdownTemplateEngine: "njk",
  };
};
