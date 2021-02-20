const _ = require('lodash');
const { Path } = require('path-parser');
const { URL }= require('url');
const mongoose= require('mongoose');
const requireLogin= require('../middlewares/requireLogin');
const requireCredits= require('../middlewares/requireCredits');
const Mailer= require('../services/Mailer');
const surveyTemplate= require('../services/emailtemplates/surveyTemplate');

const Survey= mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => { //getting the value from database
        const surveys= await Survey.find({ _user: req.user.id })
            .select({ recipients: false });

        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        
        res.send('Thanks for voting!');
    }); 

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice'); //extracting survey Id and choice by using path-parser

        _.chain(req.body)
            .map( ({email, url}) => { //req.body is the array that console out when clicking yes or no, event contains user Email and url
                const match= p.test(new URL(url).pathname);
                if (match){             //if match found then return 
                    return {email, surveyId: match.surveyId, choice: match.choice};
                }
            })
            .compact() //no undefined elements
            .uniqBy( 'email', 'surveyId') //no duplicate emails or survey id
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne(
                    {
                    _id: surveyId,  
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    },
                },
                 {
                   $inc: { [choice]: 1 },
                   $set: { 'recipients.$.responded': true },
                   lastResponded: new Date(),
                }
                ).exec();
            })

            .value();
            

        

        res.send({}); 
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } =req.body;

        const survey = new Survey({ //instance of survey
            title,
            subject,
            body,
            recipients: recipients.split(',').map((email) => ({ email })),  //list of email addresses splitted into and array and return a array of objects
            _user: req.user.id,
            dateSent: Date.now() 
        });

// Great place to send an email
        const mailer= new Mailer(survey, surveyTemplate(survey));

        try{
            await mailer.send();
            await survey.save();
            req.user.credits -=1; //minus credit
            const user= await req.user.save();
    
            res.send(user);
        } catch (err){
            res.status(422).send(err);
        }
        
    });
};