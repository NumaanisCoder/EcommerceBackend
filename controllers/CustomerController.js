const { welcomeEmail } = require("../MailSender/WelcomeEmail");
const Customer = require("../models/Customer");
const { asyncErrorHandler, ErrorHandler } = require("../utils/ErrorHandler");
const bcrypt = require("bcrypt");
const { getToken, verifyToken } = require("../utils/TokenHandler");
const { sendResendEmail } = require("../MailSender/ResetEmail");

module.exports.Registration = asyncErrorHandler(async (req, res, next) => {
    const { name, email, phone, password, gender } = req.body;
    

    const ifEmailAlreadyExist = await Customer.findOne({email:email});


    if(!name || !email || !password || !gender || !phone){
        return next(new ErrorHandler(404,"Incomplete Details"));
        
    }
    if(ifEmailAlreadyExist){
        return next(new ErrorHandler(400, "User Already Registered"));
    }
    
    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create a new Customer with the hashed password
    const newCustomer = new Customer({
        name,
        email,
        phone,
        password: hashedPassword,
        gender
    });

    // Save the new customer to the database
    await newCustomer.save();
    await welcomeEmail(email, "AMAAN ANSARI PAAN DUKAAN");
    const token = getToken(newCustomer._id, '7d');

    // Respond with success and the new customer's data
    res.status(201).json({ success: true, user: newCustomer, token: token });
});


module.exports.Login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await Customer.findOne({ email });
    
    // If user not found
    if (!user) {
        return next(new ErrorHandler(404, "Email is not registered"));
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
    if (!isPasswordCorrect) {
        return next(new ErrorHandler(401, "Password is Incorrect"));
    }

    // Generate token if login is successful
    const token = getToken(user._id,'1m');
    res.status(200).json({ success: true, token });
});


module.exports.getResetEmail = asyncErrorHandler(async (req,res,next)=>{
const {email} = req.body;
const user = await Customer.findOne({email});

if(!user){
    return next(new ErrorHandler(404, "Email is not Registered"));
}
const id = user.id;
const token = getToken(id, '1h');


await sendResendEmail(email, token);

res.json({success: true, message: "Email is send Sucessfully"});

})


module.exports.getCustomerDetail = asyncErrorHandler(async (req,res,next) =>{

    const {token} = req.body;
    const {decoded, expired, valid} = verifyToken(token);
    
    if(expired || !valid){
        return next(new ErrorHandler(400, "Token is invalid or expired"))
    }
    const {id} = decoded;
    const customer = await Customer.findById(id);
    console.log(token, customer)

    res.json({
        success: true,
        customerDetail: customer
    })


})

