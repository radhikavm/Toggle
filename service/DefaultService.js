'use strict';

module.exports = function() {
    return {
        userList : [],
        roleList: [],
        /*
         * Save the user inside the "db".
         */
        createUsers(user) {
            //user.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.userList.push(user);
            return 1;            
        },
        /*
         * Retrieve a user with a given id or return all the users if the id is undefined.
         */
        getAll(id) {
            if(id) {
                return this.userList.find(element => {
                        return element.id === id;
                    });    
            }else {
                return this.userList;
            }
        },
        /*
         * Retrieve a user with a given heirarcy 
         */
        findByRole(ids) {
            if(ids.length >0 ) {
                return this.userList.filter(element => {
                        return ids.indexOf(element.role)!== -1;
                    });    
            }else {
                return [];
            }
        },
        /*
         * Save the role
         */
        createRoles(role) {
            //user.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.roleList.push(role);
            return 1;            
        },
        /*
         * Retrieve a role with a given id or return all the roles if the id is undefined.
         */
        getAllRoles(id) {
            if(id) {
                return this.roleList.find(element => {
                  return element.id === id;
                });    
            }else {
                return this.roleList;
            }
        },
        /*
         * get children recurrsive function 
        */
        getNestedChildren(roles, parent) {
            var out = [];
            for(var i in roles) {
                if(roles[i].parent == parent) {
                  out.push(roles[i]);
                    var children = this.getNestedChildren(roles, roles[i].id);
                    if(children.length) {
                        children.forEach((w) => {
                          out.push(w);
                        });
                    }
                }
            }
            return out;
        }    
    }
}; 