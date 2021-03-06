const sendgrid= require('sendgrid');
const helper= sendgrid.mail;
const keys= require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) { //whenever it is instantiated i.e by using new
       super();

       this.sgApi= sendgrid(keys.sendGridKey);
       this.from_email = new helper.Email('kiran.ghimiray098@gmail.com');
       this.subject = subject;
       this.body= new helper.Content('text/html', content);
       this.recipients = this.formatAddresses(recipients);

       this.addContent(this.body);
       this.addClickTracking();
       this.addRecipients();

    }

    formatAddresses(recipients){ //array of objects bata email euta euta gari leko
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking(){ //copy paste from documentation
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking=  new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients(){
        const personalize= new helper.Personalization();
        this.recipients.forEach(recipient => { //each recipient getting personalized
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send(){
        const request= await this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response= this.sgApi.API(request);
        return response;
    }
}

module.exports= Mailer;