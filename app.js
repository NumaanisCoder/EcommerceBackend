const express = require("express");
const connectDB = require("./config/db");
const customerRoute = require("./routes/CustomerRoute");
const sellerRoute = require("./routes/SellerRoute");
const categoryRoute = require("./routes/CategoryRoute");
const bodyparser = require("body-parser");
const PORT = process.env.PORT || 3000;

const app = express();
require("dotenv").config(); // Automatically looks for .env in the root directory

connectDB();


//JSON PARSER
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));;

app.get("/",(req,res)=>{
  res.json({
    message: "Server is on"
  })
})

app.use("/api/customer",customerRoute);
app.use("/api/seller",sellerRoute)
app.use("/api/category", categoryRoute);


app.use((err,req,res,next)=>{
  const {status, message} = err;
  res.status(status).send({
      success: false,
      status: status,
      message: message
  })
  console.log(err);
})


app.listen(PORT, () => {
  console.log(`Server is live on PORT: ${PORT}`);
});
