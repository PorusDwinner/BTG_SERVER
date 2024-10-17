class Mailer_Config {
    constructor(service, user, pass) {
        this.service = service;
        this.auth = { user, pass }
    }
};

class Message_Modal {
    constructor(from, to, subject, html, attachments) {
        this.from = from,
        this.to = to,
        this.subject = subject,
        this.html = html,
        this.attachments = attachments
    }
};

module.exports = { Mailer_Config, Message_Modal };