"use strict";

module.exports = function(Todo) {
  Todo.remoteMethod("returnMyTodos", {
    accepts: { arg: "options", type: "object", http: "optionsFromRequest" },
    http: { path: "/owner/", verb: "get" },
    returns: { arg: "todos", type: "array" }
  });
  Todo.returnMyTodos = ({ accessToken }, callback) =>
    Todo.find(
      {
        where: { userId: accessToken.userId },
        include: { relation: "checkboxes" }
      },
      (err, data) => callback(null, data)
    );
};
