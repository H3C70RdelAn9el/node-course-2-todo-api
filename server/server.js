/* jshint esversion: 6 */
require('./config/config');


const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) =>{
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos /1234324id
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    // validate id using isValid
        //404 - send back empty send
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Todo not found');
    }
    //here we query the database:
    //findById
        //success
            //if todo- send back
            // if no todo -- send back 404 w/empty body
        //error
            // 400 - send empty body back
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        //success
        res.send({todo});   //returns response send todo
    }).catch((e) => {
        res.status(400).send();
    });

});

app.delete('/todos/:id', (req, res) => {
    //get the id
    var id = req.params.id;
    //validate the id -> not vaild? return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Todo not found');
    }
    //remove todo by id
        //success
            //if no doc, send 404
            // if doc, send doc back with 200
        //err
            //400 w/empty body
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });

});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    //checking the completed value from patch.  setting to it a time stamp
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    //query to update db
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(404).send();
    });
});

// POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
//    console.log('Started on port 3000.');
    console.log(`Started up at port ${port}`);
});

module.exports = {app};
