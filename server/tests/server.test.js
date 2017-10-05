/* jshint esversion: 6*/
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const{User} = require('./../models/user');


//making an array of dummy todos
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
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

    describe('GET /todos/:id', () => {
        it('should return todo doc', (done) => {
            request(app)
                .get(`/todos/${todos[0]._id.toHexString()}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo.text).toBe(todos[0].text);
                })
                .end(done);
        });
    });
    //
    it('should return a 404 if todo not found', (done) => {
        // make sure you get a 404 back
        var hexId = new ObjectID().toHexString(); //make a varibale to store later
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
            });

    it('should return a 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });
  // it('should return 404 if todo not found', (done) => {
  //
  // });
  it('should return 404 if todo not found', (done) => {
      var hexId = new ObjectID().toHexString();

      request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
  });
        // it('should return 404 if  Object id is invalid' ,(done) => {
        //
        // });
    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete('/todos/123abc')
            .expect(404)
            .end(done);
    });
    });

});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        //grab id of first item
        var hexId = todos[0]._id.toHexString();
        //update text, = to wathber,
        var text = 'This should be the new text';
        // set completetd true
        request(app)
            .patch(`/todos/${hexId}`) //used the patch method
            .send({                         //sending the following data
                completed: true,
                text
            })
        // 200
            .expect(200)
        // text is changed, compled is true, completeAt is a number, toBeA
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
        });
    it('should clear completedAt when todo is not completed', (done) => {
        // grab 2nd todo id
        var hexId = todos[1]._id.toHexString();
        //update text, = to wathber,
        var text = 'This should be the new text to the 2nd';
        // set completetd false
        request(app)
            .patch(`/todos/${hexId}`) //used the patch method
            .send({                         //sending the following data
                completed: false,
                text
            })
        // 200
            .expect(200)
        // text is changed, completed false, completed is null .toNotExist
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
        });
});
