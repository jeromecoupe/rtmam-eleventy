module.exports = function (eleventyConfig) {
  // créer une collection "blogposts" qui utilise un glob
  eleventyConfig.addCollection("blogposts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("./src/content/blogposts/**/*.md");
  });

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
