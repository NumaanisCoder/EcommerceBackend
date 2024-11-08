const express = require("express");
const connectDB = require("./config/db");
const customerRoute = require("./routes/CustomerRoute");
const sellerRoute = require("./routes/SellerRoute");
const categoryRoute = require("./routes/CategoryRoute");
const productRoute = require("./routes/ProductRoute");
const bodyparser = require("body-parser");
const PORT = process.env.PORT || 3333;
const cors = require('cors');


const app = express();
require("dotenv").config(); // Automatically looks for .env in the root directory

connectDB();

app.use(cors());

//JSON PARSER
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));;

app.get("/",(req,res)=>{
  res.json({
    message: `Server is live on PORT: ${PORT}`
  })
})

app.use("/api/customer",customerRoute);
app.use("/api/seller",sellerRoute)
app.use("/api/category", categoryRoute);
app.use('/api/product',productRoute);


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
