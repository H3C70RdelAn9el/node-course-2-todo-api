/* jshint esversion: 6 */
// const  MongoClient = require ('mongodb').MongoClient;
const  {MongoClient, ObjectID} = require ('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MondoDB server');
    }
    console.log('Connected to MondoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

//insert new doc into the Users (name, age, location) using insert

// db.collection('Users').insertOne({
//     name: 'Hector',
//     age: 45,
//     location: 'Glendale'
// }, (err, result) => {
//     if (err) {
//         return console.log('Unable to insert todo', err);
//     }
//
//     console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
// });


    db.close();
});
