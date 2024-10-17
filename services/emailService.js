const mailer = require('nodemailer');

const SendEmail = async (mailerConfig, message) => {
    const transporter = mailer.createTransport(mailerConfig);
    transporter.SendEmail(message)
        .then(info => {
            console.log("SendEmail response info => ",info);
            return true;
        })
        .catch(err => {
            console.log("SendEmail response error => ",err);
            return false;
        });
};

module.exports = SendEmail;