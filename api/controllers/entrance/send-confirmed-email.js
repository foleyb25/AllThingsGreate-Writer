module.exports = {


    friendlyName: 'Send account verification email',
  
  
    description: 'Send an account verification link to the writer with the specified email address.',
  
  
    inputs: {
  
    },
  
  
    exits: {
  
      success: {
        description: 'The email address might have matched a writer in the database.  (If so, a recovery email was sent.)',
        viewTemplatePath: 'emails/email-confirmed-email-sent'
      },
  
    },
  
  
    fn: async function (inputs) {
  
      // Find the record for this user.
      // (Even if no such user exists, pretend it worked to discourage sniffing.)
      var writerRecord = await Writer.findOne({ emailAddress: this.req.me.emailAddress });
      if (!writerRecord) {
        return;
      }//•
  
      // Come up with a pseudorandom, probabilistically-unique token for use
      // in our password recovery email.
      var token = await sails.helpers.strings.random('url-friendly');
  
      // Store the token on the user record
      // (This allows us to look up the writer when the link from the email is clicked.)
      await Writer.updateOne({ id: writerRecord.id })
      .set({
        emailProofToken: token,
        emailProofTokenExpiresAt: Date.now() + sails.config.custom.passwordResetTokenTTL,
      });
  
      // Send recovery email
      await sails.helpers.sendTemplateEmail.with({
        to: this.req.me.emailAddress,
        subject: 'confirm email instructions',
        template: 'email-verify-account',
        templateData: {
          fullName: writerRecord.fullName,
          token: token
        }
      });
  
    }
  
  
  };
  