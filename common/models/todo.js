"use strict";

module.exports = function(Todo) {
  Todo.remoteMethod("returnMyTodos", {
    accepts: { arg: "options", type: "object", http: "optionsFromRequest" },
    http: { path: "/owner/", verb: "get" },
    returns: { arg: "todos", type: "array" }
  });
  Todo.remoteMethod("createTodo", {
    accepts: [
      { arg: "options", type: "object", http: "optionsFromRequest" },
      { arg: "title", type: "string", required: true }
    ],
    http: { path: "/create/", verb: "post" },
    returns: { arg: "todo", type: "object" }
  });
  Todo.createTodo = ({ accessToken }, title, callback) =>
    Todo.create({ title, userId: accessToken.userId }, (err, data) =>
      callback(null, data)
    );
  Todo.returnMyTodos = ({ accessToken }, callback) =>
    Todo.find(
      {
        where: { userId: accessToken.userId },
        include: { relation: "checkboxes" }
      },
      (err, data) => callback(null, data)
    );
};
