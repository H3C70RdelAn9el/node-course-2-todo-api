/* jshint esversion: 6 */
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const{Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
// var id = '59ce77a53810837872bf4bf5'; //id to use for quering

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

//querieng all
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

// user.findById;
//print user to screen, and use the catch error
//user.findById
//print no user. handle errors.

// var id = '59c3688334aa8d43274def811';
//
// User.findById(id).then((user) => {
//     if(!user) {
//         return console.log('User not found');
//     }
//     console.log('User by Id', user);
// }).catch((e) => console.log(e));


User.findById('59c3688334aa8d43274def81').then((user) => {
    if (!user) {
        return console.log('Unable to find User');
    }
    console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
    console.log(e);
});
