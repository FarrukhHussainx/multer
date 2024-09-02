// const express = require("express");
// const mongoose = require("mongoose");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");

// // Initialize Express app
// const app = express();

// // Middleware to parse JSON and handle CORS
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose
//   .connect(
//     "mongodb+srv://farrukhx:farrukh123@cluster0.zotdnvr.mongodb.net/productmulter?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// // Product Schema
// const productSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: Number,
//   imageUrl: String,
// });

// const Product = mongoose.model("Product", productSchema);

// // Set up Multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// // Serve static files from the uploads directory
// app.use("/uploads", express.static("uploads"));

// // Route to create a new product
// app.post("/products", upload.single("image"), async (req, res) => {
//   const { name, description, price } = req.body;
//   const product = new Product({
//     name,
//     description,
//     price,
//     imageUrl: `/uploads/${req.file.filename}`,
//   });

//   try {
//     await product.save();
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ error: "Error saving the product" });
//   }
// });

// // Route to get all products
// app.get("/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching products" });
//   }
// });

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );
///////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
//////////////////////////////////////
///////////////////////////////////////////
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// Initialize Express app
const app = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://farrukhx:farrukh123@cluster0.zotdnvr.mongodb.net/productmulter?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrls: [String], // Array to store multiple image URLs
});

const Product = mongoose.model("Product", productSchema);

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));

// Route to create a new product with multiple images
app.post("/products", upload.array("images", 5), async (req, res) => {
  const { name, description, price } = req.body;

  // Map over the files and create an array of URLs
  const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

  const product = new Product({
    name,
    description,
    price,
    imageUrls, // Store array of image URLs
  });

  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error saving the product" });
  }
});

// Route to get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
