const { makeExecutableSchemaFromModules } = require('../utils/modules.js');

const auth = require('./auth');
const category = require('./category');
const recipe = require('./recipe');
//const ingredient = require('./ingredient'); Not used
const list = require('./list');
const review = require('./review');
const tag = require('./tag');
//const tool = require('./tool');

module.exports = makeExecutableSchemaFromModules({
  modules: [auth, list, review, tag, recipe, category],
});
