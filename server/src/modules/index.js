const { makeExecutableSchemaFromModules } = require('../utils/modules.js');

const auth = require('./auth');

module.exports = makeExecutableSchemaFromModules({
  modules: [auth],
});
