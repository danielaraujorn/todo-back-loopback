"use strict";

module.exports = function(Checkbox) {
  Checkbox.remoteMethod("check", {
    accepts: [
      { arg: "id", type: "string", required: true },
      { arg: "checked", type: "boolean", required: true }
    ],
    http: { path: "/check/", verb: "put" },
    returns: { arg: "checkbox", type: "object" }
  });
  Checkbox.check = (id, checked, callback) => {
    Checkbox.findById(id, (err, item) =>
      item.updateAttribute("checked", checked, (err, updated) =>
        callback(null, updated)
      )
    );
  };
};
