/* jshint esversion: 6 */
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI ||  'mongodb://localhost:27017/TodoApp');
//mongoose.connect("mongodb://<Hector>:<12345>@ds161304.mlab.com:61304/safe-sierra-79150");
//here we export the module!
let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://<Hector>:<12345>@ds161304.mlab.com:61304/safe-sierra-79150'
};
mongoose.connect( db.localhost || db.mlab);
module.exports = {mongoose};
