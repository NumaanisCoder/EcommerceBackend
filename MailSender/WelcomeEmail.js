const nodemailer = require("nodemailer");



const welcomeEmail = async function(email, StoreName, verificationToken){
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
     <body style="background-color: #f2f2f2; font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <div style="text-align: center; padding: 40px 20px;">
        <h1 style="color: #333; font-size: 32px;">Hello, ${StoreName}!</h1> 
        <div style="display: inline-block; background-color: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #444; font-size: 24px; margin: 0;">Welcome to our Seller Community!</h2>
        </div>
        <p style="color: #666; font-size: 16px; margin-top: 20px;">
            We're excited to have you on board, <strong>${StoreName}</strong>! <br> 
            Let's get started by verifying your email to activate your seller account.
        </p>
        <p style="color: #444; font-size: 16px;">
            Please click the link below to verify your email and complete your seller registration:
        </p>
        <a href="${process.env.SERVER_URL}/api/seller/verifymail/${verificationToken}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; margin-top: 20px;">
            Verify Your Seller Account
        </a>
        <p style="color: #444; font-size: 16px; margin-top: 20px;">
            If you have any questions or need assistance, feel free to reach out. We're here to support you!
        </p>
    </div>
</body>

`
    };
    await mailTransporter.sendMail(details);
  };

module.exports.welcomeEmail = welcomeEmail;