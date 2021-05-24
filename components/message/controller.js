const store = require('./store');
const socket = require('../../socket').socket;

function addMessage(chat, user, message, file) {

    return new Promise((resolve, reject) =>{
        if(!user || !message){
            console.error('[messageController] No hay usuario o mensaje');
            return reject('Los datos son incorrectos');
        }

        let fileUrl ='';
        if (file){
            //No se puede obtener el valor real de la imagen, por ende se debe especificar la extension de esta.
            fileUrl = 'http://localhost:3000/app/files/' + file.filename;
        }

        const fullMessage = {
            chat: chat,
            user : user,
            message : message,
            date : new Date(),
            file: fileUrl,
        };
        store.add(fullMessage);

        socket.io.emit('message', fullMessage);

        resolve(fullMessage);
        
    });

    
}

function getMessages(filterUser){
    return new Promise ((resolve, reject) => {
        resolve(store.list(filterUser));
    })
}

function deleteMessage(id){
    return new Promise(async (resolve, reject) => {
        if(!id){
            console.error('[messageController] No hay id');
            reject('Los datos son incorrectos');
            return false;
        }

        const res = await store.deleteMessage(id);
        resolve(res);

    })
}

 function updateMessage(id, messages){
    return new Promise (async(resolve,reject) => {
        if(!id || !messages){
            console.error('[messageController] No hay id o mensaje');
            reject ('Los datos son incorrecots.');
            return false;

        }
            const res = await store.updateMessage(id, messages);
            resolve(res);
        
    })
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
};