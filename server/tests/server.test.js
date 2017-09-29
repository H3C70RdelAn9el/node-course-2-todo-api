/* jshint esversion: 6*/
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//making an array of dummy todos
const todos = [{
    text: 'First test todo'
}, {
    text: 'Second test todo'
}];
//testing the code making sure it's empty
beforeEach((done) => {
    Todo.remove({}).then(() => {  //removes, then returns
        return Todo.insertMany(todos); //inserting all todos back
    }).then(() => done()); //async. must specify the done
});


describe('POST /todos', () => {
    it('should create a new todo', (done) => { //async test, must specify when done
        var text = 'Test todo text';
        //supertest
        request(app)
        .post('/todos')
        .send({text})
        .expect(200) //expecting the body to come back
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });
    //creating a test to test for bad data
    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2 );
                done();
            }).catch((e) => done(e));
        });
    });

    describe('GET /todos', () => {
        it('should get all todos', (done) => {
            request (app)
                .get('/todos')
                .expect(200)
                .expect((res) => {
                    expect(res.body.todos.length).toBe(2);
                })
                .end(done);
        });
    });

});
