var production = ((process.env.NODE_ENV || '').trim().toLowerCase() === 'production')

// https://github.com/ksmithut/metalsmith-uglify
module.exports = {
  // put dependencies before other js files
  order: "js/**/*.js",
  // concat and compress
  concat: "js/main.min.js",
  // remove original unminified files
  removeOriginal: true,
  // create a map file
  sourceMap: !production
};
