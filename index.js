const express = require("express");
const connectDB = require("./db/dbConnect");
const cors = require("cors");
const session = require("express-session");
const Session = require("./api/session");
const Logout = require("./api/logout");
const { SignUpApi } = require("./api/registerApi");
const { LoginApi } = require("./api/LoginApi");
const { ContactUs } = require("./api/user/contactUs");
const { GetProducts } = require("./api/user/getProducts");
const { GetOneProduct } = require("./api/user/getOneProduct");
const { AddEnquiry } = require("./api/user/addEnquiry");
const { ViewCategories } = require("./api/user/viewCategories");
const { GetProductsByCategory } = require("./api/user/getProductByCategory");
const { GetContactDetail } = require("./api/user/getContactDetails");
const { AddProduct } = require("./api/admin/addProducts");
const { AddCategories } = require("./api/admin/addCategories");
const { DeleteCategory } = require("./api/admin/deleteCategories");
const { DeleteProduct } = require("./api/admin/deleteProduct");
const { EditCategory } = require("./api/admin/editCategory");
const { EditContactDetail } = require("./api/admin/editContactDetail");
const { EditProduct } = require("./api/admin/editProduct");
const { GetContactUs } = require("./api/admin/getContactUs");
const { GetCounts } = require("./api/admin/getCounts");
const { GetEquiries } = require("./api/admin/getEnquiries");
const { productPicUpload, categoryPicUpload } = require("./multer/multer");
const { AddBanner } = require("./api/admin/addBanner");
const { UpdateBanner } = require("./api/admin/editBanner");
const { DeleteBanner } = require("./api/admin/deleteBanner");
const { GetBanner } = require("./api/user/viewBanner");
require('dotenv').config();

//initialize app
const app = express();

//initialize PORT No
const PORTS = 8001;
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
// Configure express-session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      sameSite: "none",
      httpOnly: true,
      domain:'localhost:3001',
      
      // domain: '.nimesh.engineer',
      maxAge: 1000 * 60 * 60 * 24 //oneDay
    }
  })
);

app.use("/images/productImage", express.static("images/productImages"));
app.use("/images/categoryImage", express.static("images/categoryImages"));

//!Common APIs
app.post("/api/session", Session);
app.post("/api/logout", Logout);
app.post("/api/signup", SignUpApi);
app.post("/login", LoginApi);

//!Admin APIs

app.post(
  "/admin/addProducts",
  productPicUpload.array("productImgs", 4),
  AddProduct
);
app.post(
  "/admin/editProducts",
  productPicUpload.array("productImgs", 4),
  EditProduct
);
app.post("/admin/deleteProducts", DeleteProduct);
app.post("/admin/getEnquiries", GetEquiries);
app.post("/admin/getContactUs", GetContactUs);
app.post("/admin/getCounts", GetCounts);
app.post(
  "/admin/addCategories",
  categoryPicUpload.single("categoryImg"),
  AddCategories
);
app.post(
  "/admin/editCategories",
  categoryPicUpload.single("categoryImg"),
  EditCategory
);
app.post("/admin/deleteCategories", DeleteCategory);
app.post("/admin/editContact", EditContactDetail);
app.post("/admin/addBanner", AddBanner);
app.post("/admin/editBanner", UpdateBanner);
app.post("/admin/deleteBanner", DeleteBanner);

//!User Apis
app.post("/api/contactus", ContactUs);
app.post("/api/getProducts", GetProducts);
app.post("/api/getOneProduct", GetOneProduct);
app.post("/api/addEnquiry", AddEnquiry);
app.post("/api/viewCategories", ViewCategories);
app.post("/api/getProductByCategory", GetProductsByCategory);
app.post("/api/getContactDetails", GetContactDetail);
app.post("/api/getBanner", GetBanner);
//callback to connect MongoDB
connectDB();

//Activate Server
app.listen(process.env.PORT || PORTS, () => {
  console.log("Server Started on port: ", PORTS);
});
