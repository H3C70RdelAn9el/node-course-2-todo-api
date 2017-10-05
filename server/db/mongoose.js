/* jshint esversion: 6 */
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
//here we export the module!

module.exports = {mongoose};
