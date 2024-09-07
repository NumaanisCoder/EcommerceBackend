const { welcomeEmail } = require("../MailSender/WelcomeEmail");

const { asyncErrorHandler, ErrorHandler } = require("../utils/ErrorHandler");
const bcrypt = require("bcrypt");
const { getToken, verifyToken } = require("../utils/TokenHandler");
const { sendResendEmail } = require("../MailSender/ResetEmail");
const Seller = require('../models/Seller');



module.exports.Registration = asyncErrorHandler(async (req, res, next) => {
    const { name, email, phone, password,address, warehouseAddress, gst } = req.body;
    

    const ifEmailAlreadyExist = await Seller.findOne({email:email});


    if(!name || !email || !password || !gst || !address || !warehouseAddress || !phone){
        return next(new ErrorHandler(404,"Incomplete Details"));
        
    }
    if(ifEmailAlreadyExist){
        return next(new ErrorHandler(400, "Seller Already Registered"));
    }
    
    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create a new Seller with the hashed password
    const newSeller = new Seller({
        name,
        email,
        phone,
        password: hashedPassword,
        address,
        warehouseAddress,
        gst
    });

    // Save the new Seller to the database
    await newSeller.save();
    await welcomeEmail(email, "SHOP");
    const token = getToken(newSeller._id, '7d');

    // Respond with success and the new Seller's data
    res.status(201).json({ success: true, user: newSeller, token: token });
});


module.exports.Login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await Seller.findOne({ email });
    
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
    const token = getToken(user._id,'7d');
    res.status(200).json({ success: true, token });
});


module.exports.getResetEmail = asyncErrorHandler(async (req,res,next)=>{
const {email} = req.body;
const seller = await Seller.findOne({email});

if(!user){
    return next(new ErrorHandler(404, "Email is not Registered"));
}
const id = seller.id;
const token = getToken(id, '1h');


await sendResendEmail(email, token);

res.json({success: true, message: "Email is send Sucessfully"});

})


module.exports.getSellerDetail = asyncErrorHandler(async (req,res,next) =>{

    const {token} = req.body;
    const {decoded, expired, valid} = verifyToken(token);
    
    if(expired || !valid){
        return next(new ErrorHandler(400, "Token is invalid or expired"))
    }
    const {id} = decoded;
    const seller = await Seller.findById(id);
    console.log(token, seller)

    res.json({
        success: true,
        sellerDetail: seller
    })


})

