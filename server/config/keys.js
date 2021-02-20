//keys.js - figure out what set of credentials to return

//mongodb+srv://Kuzan:68EmGysBZUUrg5Yt@cluster0.dgvbo.mongodb.net/emaily-prod?retryWrites=true&w=majority

if (process.env.NODE_ENV === 'production'){
    //we are in production - return the prod set of keys
    module.exports = require('./prod');
} else{
    //we are in development - return the dev keys!!!
    module.exports = require('./dev');
}