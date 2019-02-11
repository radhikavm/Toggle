'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService')();

module.exports.createRoles = function createRoles (req, res, next) {
  var body = req.swagger.params['body'].value;

  if(req.body.length > 0) {
    let err =[];
    req.body.forEach((tst) =>{
       if(typeof tst.parent === 'undefined') err.push (1); 
    });

    if(err.indexOf(1)!== -1) {
      utils.writeJson(res, {id: 0, description: "Error with the input"}, 400 );
    } else {

      let reso = req.body.map ((data) => {
        return Default.createRoles(data);
      });
      let response = {success: 1, description: "Roles added to the list!"};
      utils.writeJson(res, response);
            //({success: 1, description: "user added to the list!"});
    }
  }
};

module.exports.createUsers = function createUsers (req, res, next) {
  var body = req.swagger.params['body'].value;
  if(req.body.length > 0) {
    let err =[];
    req.body.forEach((tst) =>{
       if(typeof tst.role === 'undefined') err.push (1); 
    });

    if(err.indexOf(1)!== -1) {
      utils.writeJson(res, {id: 0, description: "Error with the input"}, 400 );
    } else {
      let reso = req.body.map ((data) => {
        return Default.createUsers(data);
      });
      let response = {success: 1, description: "Users added to the list!"};
      utils.writeJson(res, response);
            //({success: 1, description: "user added to the list!"});
    } 
  }
};

module.exports.getAll = function getAll (req, res, next) {
  let usrs = Default.getAll();
  let response = {users: usrs};  
  utils.writeJson(res, response);
};

module.exports.getAllRoles = function getAllRoles (req, res, next) {
  let ro = Default.getAllRoles();
  let response = {roles:ro};
  utils.writeJson(res, response);
};

module.exports.getSubordinates = function getSubordinates (req, res, next) {
  var role = req.swagger.params['id'].value;
        let roles = Default.getAllRoles();
        let roleIds = [];
        let child = Default.getNestedChildren(roles, role);
        child.forEach (data => {
                 roleIds.push(data.id); 
        });
  let children = Default.findByRole(roleIds);
  utils.writeJson(res, {users: children});
};