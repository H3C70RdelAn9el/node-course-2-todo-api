/* jshint esversion: 6 */
// const  MongoClient = require ('mongodb').MongoClient;
const  {MongoClient, ObjectID} = require ('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MondoDB server');
    }
    console.log('Connected to MondoDB server');

    // db.collection('Todos').find({
    //     _id: new ObjectID('59bb22671e14a979f0fb8ebb')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch Todos', err);
    // });
    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch Todos', err);
    // });

    db.collection('Users').find({name: 'Hector'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    });

    // db.close();
});
