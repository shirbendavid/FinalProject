var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "images.preferences@gmail.com",
      pass: "imagesISE",
    },
    tls:{
      rejectUnauthorized:false
    },
    connectionTimeout: 5 * 60 * 1000, // 5 min
  });
  
  exports.sendMail = async function(mailOptions){
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };
