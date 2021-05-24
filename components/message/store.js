const Model = require('./model');

function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
}

async function deleteMessage(id){
  const foundMessage = await Model.deleteOne({
    _id : id
  });
}

async function getMessages(filterChat) {

  return new Promise((resolve, reject) =>{
    let filter ={};
    if( filterChat !==null){
      filter= { chat: filterChat };
    }
    Model.find(filter)
    .populate('user')
    .exec((error, populated) =>{
      if(error){
        reject(error);
        return false;
      }
        resolve(populated);
      });
  });
  
}

async function updateMessage(id, messages) {
    const foundMessage = await Model.findOne ({
        _id : id
    });

    foundMessage.message = messages;
    const newMessage = await foundMessage.save();
    return newMessage;
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateMessage : updateMessage,
  deleteMessage: deleteMessage
  //get
  // update
  // delete
};

