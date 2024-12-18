import transporter from "#server/configs/nodemailer-config";
import teamplate from "#server/helpers/teamplate";
import ENV_CONFIG from "#server/configs/env-config";

export const mail_service = {
  sendMailWelcome: ({ to }) => {
    const message = teamplate.emailWelcome();
    var mailOptions = {
      from: ENV_CONFIG.EMAIL.EMAIL_USER,
      to: to,
      subject: message.subject,
      html: message.html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },

  sendMailForgotPassword: ({ to, data }) => {
    const message = teamplate.emailForgotPassword(data);

    var mailOptions = {
      from: ENV_CONFIG.EMAIL.EMAIL_USER,
      to: to,
      subject: message.subject,
      html: message.html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};
