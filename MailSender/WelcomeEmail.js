const nodemailer = require("nodemailer");



const welcomeEmail = async function(email, StoreName){
    const mailTransporter = nodemailer.createTransport(
      {
        service: "gmail",
        auth: {
          user: process.env.EMAIL_TRANSPORT,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    
     
    );
    const details = {
      from: "ancorporationindiay@gmail.com",
      to:`${email}`,
      subject: "Welcome Greetings",
      html: `
      <body style="background-color: black;">
      <div style="text-align: center;">
      <br>
      <h1 style="color: red;"> ${StoreName} </h1> 
       
      <h2 style="background-color: aliceblue;">Welcome</h2>
      <p style="color: aliceblue;">
            Welcome to ${StoreName}
     <br>
          
      <br>
      </p>
      <br>
      </div>
      </body>`
    };
    await mailTransporter.sendMail(details);
  };

module.exports.welcomeEmail = welcomeEmail;