const Model = require('./model');

function addUser(user) {
  const myUser = new Model(user);
  return myUser.save();
}

async function getUsers(filterUser) {
  let filter ={};
  if( filterUser !==null){
      filter= { name: filterUser };
  }
  const users = await Model.find(filter);
  return users;
}

async function deleteUser(name){
  const foundUser = await Model.deleteOne({
    name : name
  });
}


module.exports = {
  add: addUser,
  getUsers
};

