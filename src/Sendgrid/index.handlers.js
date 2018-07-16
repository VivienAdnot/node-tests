const fs = require('fs');
const sendgridMailer = require('@sendgrid/mail');

sendgridMailer.setApiKey('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');

exports.sendValidEmail = (req, res, next) => {

    const messageOptions = {
        to: 'vivien.adnot@gmail.com',
        from: 'vivienadnot@amplement.com',
        subject: 'Test email sent from Sendgrid API',
        text: 'email content',
        html: '<strong>html: email content 2</strong>',
        custom_args: {
            _user: '7633297b-b9fa-41a6-b70f-a446dc10ae8a'
        }
    };

    sendgridMailer.send(messageOptions);

    next();

};

exports.webhook = (req, res, next) => {

    fs.appendFile(
        'webhook.txt',
        `${JSON.stringify(req.body)}\n`,
        (err) => {

            if (err) throw err;

        }
    );

    next();

};
