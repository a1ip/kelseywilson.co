var metalsmith   = require("metalsmith");
var assets       = require("metalsmith-assets");
var collections  = require("metalsmith-collections");
var copy         = require("metalsmith-static");
var datamarkdown = require("metalsmith-data-markdown");
var inplace      = require("metalsmith-in-place");
var layouts      = require("metalsmith-layouts");
var markdown     = require("metalsmith-markdown");
var permalinks   = require("metalsmith-permalinks");
var prefix       = require("metalsmith-autoprefixer");
var sass         = require("metalsmith-sass");
var uglify       = require("metalsmith-uglify");
var watch        = require("metalsmith-watch");

//========================
//  Log and config files
//========================

var defaults = require("./defaults");
var step     = require("./build").step;
var serve   = require("./build").serve;

var config = {
  assets:      require("./assets"),
  collections: require("./collections"),
  copy:        require("./copy"),
  helpers:     require("./helpers"),
  layouts:     require("./layouts"),
  markdown:    require("./markdown"),
  permalinks:  require("./permalinks"),
  sass:        require("./sass"),
  uglify:      require("./uglify"),
  watch:       require("./watch")
};

var production = ((process.env.NODE_ENV || '').trim().toLowerCase() === 'production')

//=======================================
//  Build pipeline - order does matter!
//=======================================

var ms = metalsmith(__dirname)
  .clean(production)
  .metadata(defaults,                     step("Metadata Defined"))
  .source("../" + defaults.contentDir,    step("Getting content"))
  .destination("../" + defaults.buildDir, step("Creating build directory"))
  .use(markdown(config.markdown),         step("Markdown Files to HTML"))
  .use(collections(config.collections),   step("Collections Defined"))
  .use(permalinks(config.permalinks),     step("Permalinks Created"))
  .use(layouts(config.layouts),           step("Layouts Applied"))
  .use(inplace(config.layouts),           step("Templating Rendered"))
  .use(datamarkdown(config.markdown),     step("Markdown Content to HTML"))
  .use(assets(config.assets),             step("Assets Folder Copied"))
  .use(copy(config.copy),                 step("Repo Folder Copied"))
  .use(sass(config.sass),                 step("SCSS Processed"))
  .use(prefix(),                          step("CSS Prefixed"))
  .use(uglify(config.uglify),             step("JS Uglified"));

(production) ? ms.build(function (err) { if (err) throw err }) : ms.use(watch(config.watch)).build(serve)
