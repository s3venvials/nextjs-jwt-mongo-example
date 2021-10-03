const sendSMS = (phoneNumber, message) => {
    const res = { success: true };
    const messagebird = require("messagebird")(process.env.NEXT_PUBLIC_MESSAGE_BIRD);
  
    const params = {
      originator: "TestMessage",
      recipients: [phoneNumber],
      body: message,
    };
  
    messagebird.messages.create(params, function (err, response) {
      if (err) {
        res.success = false;
        return err;
      }
      console.log(response);
    });
  
    return res;
  };
  
  module.exports = { sendSMS };