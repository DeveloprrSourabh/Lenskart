const Product = require("../models/productModel");
const slugify = require("slugify");
const fs = require("fs");
// Create product
exports.createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, quantity, shipping, category } =
      req.fields;
    const { photo } = req.files;
    // Check Existing product
    const existsProduct = await Product.findOne({ name });
    if (existsProduct) {
      return res
        .status(400)
        .send({ success: false, message: "Product Already Eixsts" });
    }
    // Check Validation
    if (!name) {
      return res.status(400).send({ message: "Name Is Required" });
    }
    if (!photo || (photo && photo.size > 1000000)) {
      return res
        .status(400)
        .send({ message: "Photo Is Required And Should Be Less Then 1 MB" });
    }
    if (category === "65450882d722235a28fsssss") {
      return res.status(400).send({ message: "Category Is Required" });
    }

    if (!description) {
      return res.status(400).send({ message: "Description Is Required" });
    }
    if (!price) {
      return res.status(400).send({ message: "Price Is Required" });
    }
    if (!quantity) {
      return res.status(400).send({ message: "Quantity Is Required" });
    }

    let product = await new Product({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
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
    const { name, quantity, price, description, category, shipping } =
      req.fields;
    const { photo } = req.files;
    // Check Existing product
    // const existsProduct = await Product.findOne({ name });
    // if (existsProduct) {
    //   return res
    //     .status(400)
    //     .send({ success: false, message: "Product Already Eixsts" });
    // }
    // Check validation
    if (!name) {
      return res.status(400).send({ message: "Name is Required" });
    }
    if (category === "65450882d722235a28fsssss") {
      return res.status(400).send({ message: "Category Is Required" });
    }
    if (!quantity) {
      return res.status(400).send({ message: "Quantity is Required" });
    }
    if (!price) {
      return res.status(400).send({ message: "Price is Required" });
    }
    if (!description) {
      return res.status(400).send({ message: "Price is Required" });
    }

    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).send({
        success: false,
        message: "Product Not Found",
      });
    }
    if (!product.category) {
      product = await Product.findByIdAndUpdate(
        product._id,
        {
          ...req.fields,
          slug: slugify(name),
        },
        { $push: { category: category } },
        { new: true }
      );
      if (photo) {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
      }
      product.save();
    } else {
      product = await Product.findByIdAndUpdate(
        product._id,
        {
          ...req.fields,
          slug: slugify(name),
        },
        { new: true }
      );
      if (photo) {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
      }
      product.save();
    }

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
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      "category"
    );
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

// Get Product Photo

exports.getProductPhotoController = async (req, res) => {
  try {
    let product = await Product.findOne({ slug: req.params.slug }).select(
      "photo"
    );
    if (!product) {
      return res.status(400).send({
        success: false,
        message: "Product Not Found",
      });
    }
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Getting Product Photo",
      error,
    });
  }
};

// Product Filter

exports.productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(args).populate("category");
    return res.status(200).send({
      success: true,
      message: "getting product by filter",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: true,
      message: "Error While Filtering Product",
      error,
    });
  }
};

// Product Search
exports.productSearchController = async (req, res) => {
  try {
    const { keyword } = req.params;

    const result = await Product.find({
      $or: [
        {
          name: { $regex: keyword, $options: "i" },
          description: { $regex: keyword, $options: "i" },
        },
      ],
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while Searching Products",
      error,
    });
  }
};
