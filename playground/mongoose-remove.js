/* jshint esversion: 6 */
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const{Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//removes files--all
// Todo.remove({}).then((result) => {
//     console.log(result);
// });


//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '59d52a49cbe73bbac6eadae2'}).then((todo) => {

});

Todo.findByIdAndRemove('59d52a49cbe73bbac6eadae2').then((todo) => {
    console.log(todo);
});
