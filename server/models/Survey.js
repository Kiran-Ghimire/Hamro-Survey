const mongoose= require('mongoose');
const { Schema }= mongoose;
const RecipientSchema= require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema], //obeys what is in recipient schema
    yes: {type: Number, default:0 },
    no: {type: Number, default:0 },
    _user: { type:Schema.Types.ObjectId, ref: 'User' },//which user which survey
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);