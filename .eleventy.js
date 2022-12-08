const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // créer une collection "blogposts" qui utilise un glob
  eleventyConfig.addCollection("blogposts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("./src/content/blogposts/**/*.md")
      .reverse();
  });

  // filter: date Display (for humans)
  eleventyConfig.addFilter("displayDate", (date, locale = "en") => {
    let jsDate = new Date(date);
    return DateTime.fromJSDate(jsDate)
      .setLocale(locale)
      .toLocaleString(DateTime.DATE_FULL);
  });

  // filter: date ISO (for machines)
  eleventyConfig.addFilter("ISODate", (date) => {
    let jsDate = new Date(date);
    return DateTime.fromJSDate(jsDate).toISO();
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
