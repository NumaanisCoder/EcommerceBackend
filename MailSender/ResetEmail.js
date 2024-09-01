const nodemailer = require("nodemailer");



const sendResendEmail = async function(email, token){
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
      subject: "Reset Password",
      html: `
      <body style="background-color: black;">
      <div style="text-align: center;">
      <br>
      <h1 style="color: red;"> Reset Email</h1> 
       
      <h2 style="background-color: aliceblue;">Welcome</h2>
      <p style="color: aliceblue;">
            Welcome to Store
            
     <br>
          Click on <a href="https://www.example.vercel.app/account/resetpassword/${token}" > Reset Password </a>
      <br>
      </p>
      <br>
      </div>
      </body>`
    };
    await mailTransporter.sendMail(details);
  };

module.exports.sendResendEmail = sendResendEmail;