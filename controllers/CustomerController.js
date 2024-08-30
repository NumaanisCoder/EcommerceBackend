const { welcomeEmail } = require("../MailSender/WelcomeEmail");
const Customer = require("../Models/Customer");
const { asyncErrorHandler, ErrorHandler } = require("../utils/ErrorHandler");
const bcrypt = require("bcrypt");

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

    // Respond with success and the new customer's data
    res.status(201).json({ success: true, user: newCustomer });
});
