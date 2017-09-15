/* jshint esversion: 6 */
// const  MongoClient = require ('mongodb').MongoClient;
const  {MongoClient, ObjectID} = require ('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MondoDB server');
    }
    console.log('Connected to MondoDB server');

    // delete many
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    // delete one
        // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
        //     console.log(result);
        // });
    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({name: 'Hector'}).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete by id
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID( "59bb25246effec7a266073fb")
    }).then((results) => {
        console.log(JSON.stringify(results, undefined, 2));
    });

    // db.close();
});
