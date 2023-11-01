const Product = require("../models/productModel");
const slugify = require("slugify");
// Create product
exports.createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, quantity, shipping, category } =
      req.body;

    // Check Existing product
    const existsProduct = await Product.findOne({ name });
    if (existsProduct) {
      return res
        .status(400)
        .send({ success: false, message: "Product Already Eixsts" });
    }
    // Check Validation
    if (!name) {
      return res.status(400).send({ Error: "Name Is Required" });
    }

    if (!description) {
      return res.status(400).send({ Error: "Description Is Required" });
    }
    if (!price) {
      return res.status(400).send({ Error: "Price Is Required" });
    }
    if (!quantity) {
      return res.status(400).send({ Error: "Quantity Is Required" });
    }

    const product = await new Product({
      name,
      description,
      price,
      quantity,
      category,
      slug: slugify(name),
    }).save();
    return res.status(201).send({
      success: true,
      message: "Prodduct Created Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Creating Product",
      error,
    });
  }
};

// Get All Products
exports.getAllProductController = async (req, res) => {
  try {
    const products = await Product.find({}).populate("category");
    return res.status(200).send({
      success: true,
      message: "Getting All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Getting All Products",
      error,
    });
  }
};

// Update Product
exports.updateProductController = async (req, res) => {
  try {
    const { name, quantity, price, description, category, shipping } = req.body;
    // Check Existing product
    const existsProduct = await Product.findOne({ name });
    if (existsProduct) {
      return res
        .status(400)
        .send({ success: false, message: "Product Already Eixsts" });
    }
    // Check validation
    if (!name) {
      return res.status(400).send({ Error: "Name is Required" });
    }
    if (!quantity) {
      return res.status(400).send({ Error: "Quantity is Required" });
    }
    if (!price) {
      return res.status(400).send({ Error: "Price is Required" });
    }
    if (!description) {
      return res.status(400).send({ Error: "Price is Required" });
    }

    let product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(400).send({
        success: false,
        message: "Product Not Found",
      });
    }
    product = await Product.findByIdAndUpdate(
      product._id,
      {
        ...req.body,
        slug: slugify(name),
      },
      { new: true }
    ).populate("category");
    return res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      messsage: "Error While Updating Product",
      error,
    });
  }
};

// Delete Product
exports.deleteProductController = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    // Check Product
    if (!product) {
      return res.status(400).send({
        success: false,
        message: "Product Not Found",
      });
    }
    product = await Product.findByIdAndDelete(product._id);
    return res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Deleting product",
      error,
    });
  }
};

// Get Single Product
exports.getSingleProductController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(400).send({
        success: false,
        message: "Product Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Getting Single Product",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Getting Single Product",
      error,
    });
  }
};
