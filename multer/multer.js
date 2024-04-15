const multer = require("multer");

//product pic storage
const productPicStorage = multer.diskStorage({

    //path to store the product
    destination: (req, file, cb) => {
        cb(null, "./images/productImages");
    },

    //filename to give to the product
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }

});

const productPicUpload = multer({ storage: productPicStorage });

//category pic storage
const categoryPicStorage = multer.diskStorage({

    //path to store the category
    destination: (req, file, cb) => {
        cb(null, "./images/categoryImages");
    },

    //filename to give to the category
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }

});

const categoryPicUpload = multer({ storage: categoryPicStorage });

module.exports = { productPicUpload, categoryPicUpload }